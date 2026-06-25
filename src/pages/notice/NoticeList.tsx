import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../axiosConfig";

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
        <div>
            <h2>목록 화면 입니다</h2>
            <hr />
            <table>
                {/* ... 테이블 내용 ... */}
                <tbody>
                    {notice.map((item) => (
                        <tr key={item.id} onClick={() => navigate(`/notice/${item.id}`)}> {/* 👈 여기도 수정 */}
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.regDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

      {/* 1. 관리자(ROLE_ADMIN)인지 확인 */}
        {/* 2. 조건이 참일 때만 버튼을 렌더링 */}
        {userRole === 'ADMIN' && (
            <button onClick={() => navigate("/notice/save")}>공지 작성</button>
        )}
        </div>
    );
}
export default NoticeList;