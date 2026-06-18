import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
interface Notice {
    title: string;
    content:string;
}

function NoticeDetail() {
    const { id } = useParams();
    const [notice, setNotice] = useState<Notice | null>(null);
    const naviagte = useNavigate();

useEffect(() => {
    // 1. 저장된 토큰 가져오기
    const token = localStorage.getItem("token");

    // 2. 헤더에 토큰 포함해서 요청
    fetch(`/api/notice/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`, // 이게 핵심!
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.status === 401) throw new Error("로그인 필요");
            return res.json();
        })
        .then((data) => setNotice(data))
        .catch((err) => console.error("데이터 호출 실패:", err));
}, [id]);
const handleDelete = async () => {
    // 1. 사용자에게 한번 더 확인 받기
    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    const token = localStorage.getItem("token");

    try {
        // 2. 백엔드 삭제 API 호출 (id가 포함된 경로!)
        const res = await fetch(`/api/notice/delete/${id}`, {
            method: "DELETE",
            headers: { 
                "Authorization": `Bearer ${token}` // 띄어쓰기 및 철자 확인!
            }
        });

        if (res.ok) {
            alert("삭제 완료");
            naviagte("/notice/list"); // 경로 앞에 /가 있어야 정확히 이동해!
        } else {
            alert("삭제 실패");
        }
    } catch (err) {
        console.error("삭제 요청 에러:", err);
    }
};
    // 로딩 처리 (useEffect 밖으로 뺌)
    if (!notice) return <div>로딩중 .....</div>;

    return (
        <div>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
            
        {/* 수정 버튼: 클릭하면 NoticeUpdate 페이지로 이동 */}
        <button onClick={()=> naviagte(`/notice/update/${id}`)}>수정</button>
        <button onClick={handleDelete} style={{color: "red"}}>삭제</button>
        <button onClick={()=> naviagte("/notice/list")}>목록</button>

        </div>
    );
}

export default NoticeDetail;