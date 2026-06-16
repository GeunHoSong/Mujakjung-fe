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
    const navigate = useNavigate(); // 오타 수정: naviagte -> navigate

    useEffect(() => {
        fetchNotice();
    }, []);

    const fetchNotice = async () => {
        try {
            const res = await apiClient.get(`/api/notice/list`);
            setNotice(res.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                navigate("/login");
            } else {
                console.error("공지사항 불러오기 실패", error);
            }
        }
    }; // 💡 여기서 닫아줘야 해!

    return (
        <div>
            <h2>목록 화면 입니다</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {notice.map((item) => ( // 매개변수 이름 겹침 방지: notice -> item
                        <tr key={item.id} style={{ borderBottom: "1px solid #ddd", cursor: "pointer" }} onClick={() => navigate(`/notice/${item.id}`)}>
                            <td style={{ padding: "10px", textAlign: "center" }}>{item.id}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>{item.title}</td>
                            <td style={{ padding: "10px", textAlign: "center" }}>{item.regDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/notice/save")}>공지 작성</button>
        </div>
    );
}

export default NoticeList;