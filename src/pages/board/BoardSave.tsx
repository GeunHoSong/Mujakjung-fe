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

    const handleSubmit = async () => { // 오타 수정: handleSumit -> handleSubmit
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('writer', writer);
        if (file) {
            formData.append('file', file);
        }

        try {
            // 쉼표(,)가 빠져있던 것 추가
            await axios.post('/api/board', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert('글 작성 성공!');
            navigate('/board'); // 목록으로 이동
        } catch (error) {
            console.error('등록 실패:', error);
            alert('등록에 실패했습니다.');
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