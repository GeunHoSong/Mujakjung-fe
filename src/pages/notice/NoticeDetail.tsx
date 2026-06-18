import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Notice {
    title: string;
    content:string;
}

function NoticeDetail() {
    const { id } = useParams();
    const [notice, setNotice] = useState<Notice | null>(null);

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

    // 로딩 처리 (useEffect 밖으로 뺌)
    if (!notice) return <div>로딩중 .....</div>;

    return (
        <div>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
        </div>
    );
}

export default NoticeDetail;