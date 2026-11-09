import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../axiosConfig";
import "./noticeList.css";

interface Notice {
    id: number;
    title: string;
    writer: string;
    regDate: string;
}

function NoticeList() {
    const [notice, setNotice] = useState<Notice[]>([]);
    const [userRole, setUserRole] = useState<string | null>(null);
    const navigate = useNavigate(); // 👈 변수명 수정

    useEffect(() => {
        fetchNotice();
        const role = localStorage.getItem("role");
        setUserRole(role);
    }, []);

    const fetchNotice = async () => {
        try {
            const res = await apiClient.get(`/api/notice/list`);
            setNotice(res.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert("세션이 만료되었습니다.");
                navigate("/login"); // 👈 여기도 수정
            }
        }
    };

    return (
        <div className="notice-container">
            <h2 className="notice-title">공지사항</h2>
            <hr />
            <p className="notice-description">
                무작정의 새로운 소식과 중요한 안내를 확인 하세요
            </p>
            <table className="notice-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th className="notice-subject">제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                {/* ... 테이블 내용 ... */}
                <tbody>
                    {notice.map((item) => (
                        <tr key={item.id}onClick={() => navigate(`/notice/${item.id}`)}>
                            <td>{item.id}</td>

                            <td className="notice-subject">
                                {item.title}
                            </td>
                            <td>{item.writer}</td>
                            <td>{item.regDate?.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
               
            </table>

            {userRole === "ADMIN" && (
                <div className="notice-actions">
                    <button className="notice-write-button"onClick={() => navigate("/notice/save")}>
                        공지 작성
                    </button>
                </div>
            )}
        </div>
    )
}
export default NoticeList;