import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Notice {
    title: string;
    content: string;
}

function NoticeDetail() {
    const { id } = useParams(); // URL의 ID 값을 가져옵니다.
    const [notice, setNotice] = useState<Notice | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null); // 사용자의 권한 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    useEffect(() => {
        // 1. 로컬 스토리지에서 토큰과 권한(role)을 가져옵니다.
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setUserRole(role);

        // 2. 서버에서 해당 공지사항 상세 데이터를 조회합니다.
        fetch(`/api/notice/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, 
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

    // 수정 페이지로 이동하는 함수
    const handleUpdate = () => {
        navigate(`/notice/update/${id}`);
    };

    // 삭제 처리 함수
    const handleDelete = async () => {
        if (!window.confirm("정말 삭제 하시겠습니까?")) return;

        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`/api/notice/delete/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                alert("삭제 완료");
                navigate("/notice/list");
            } else {
                alert("삭제 실패");
            }
        } catch (err) {
            console.error("삭제 요청 에러:", err);
        }
    };

    // 데이터 로딩 중 화면 표시
    if (!notice) return <div>로딩중 .....</div>;

    return (
        <div>
            <h2>{notice.title}</h2>
            <p>{notice.content}</p>
            
            {/* 3. 조건부 렌더링: 관리자(ROLE_ADMIN)에게만 버튼을 노출합니다. */}
            {userRole === 'ADMIN' && (
                <div style={{ gap: "10px", display: "flex" }}>
                    <button onClick={handleUpdate}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
            )}
            
            <button onClick={() => navigate("/notice/list")}>목록</button>
        </div>
    );
}

export default NoticeDetail;