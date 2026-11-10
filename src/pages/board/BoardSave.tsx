import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardSave() {
    const [title, setTitle] = useState(''); // 오타 수정: setTitie -> setTitle
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState(''); // 오타 수정: setWiter -> setWriter
    const [file, setFile] = useState<File | null>(null); 
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { // 오타 수정: handleFileChage -> handleFileChange
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
    // 1. 로그인 토큰 가져오기
    const token = localStorage.getItem("accessToken");

    if (!token) {
        alert("로그인 후 글을 작성할 수 있습니다.");
        navigate("/login");
        return;
    }

    // 2. 입력값 확인
    if (!title.trim() || !content.trim()) {
        alert("제목과 내용을 입력해주세요.");
        return;
    }

    // 3. 서버에 전송할 데이터 생성
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("writer", writer);

    if (file) {
        formData.append("file", file);
    }

    try {
        // 4. 게시글 등록 요청
        await axios.post("/api/board/save", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // 5. 등록 성공 시 게시판 목록으로 이동
        alert("글 작성 성공!");
        navigate("/board/list");

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("HTTP 상태:", error.response?.status);
            console.error("서버 응답:", error.response?.data);
        } else {
            console.error("등록 실패:", error);
        }

        alert("등록에 실패했습니다.");
    }
};

    return (
        <div>
            <h2>글 쓰기 작성</h2>
            <input value={writer} onChange={e => setWriter(e.target.value)} placeholder="작성자" /> <br/>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목"/><br/>
            <textarea value={content} rows={10} onChange={e => setContent(e.target.value)} placeholder="내용"></textarea><br/>
            
            {/* 파일 선택 버튼 추가하는 것을 잊지 마! */}
            <input type="file" onChange={handleFileChange} /><br/>
            
            <button onClick={handleSubmit}>글 작성</button>
        </div>
    );
}

export default BoardSave;