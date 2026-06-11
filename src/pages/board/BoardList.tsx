import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardList() {
    const navigate = useNavigate();
    // 게시판 목록 데이터를 담을 배열 상태 (초기값은 빈 배열)
    const [boardList, setBoardList] = useState([]);

    // 페이지가 처음 로드될 때 한 번만 실행됨
    useEffect(() => {
        fetchBoardList();
    }, []);

    // 서버로부터 게시판 글 목록을 가져오는 함수
    const fetchBoardList = async () => {
        try {
            // Spring Boot 서버의 게시판 목록 API 호출
            const res = await axios.get("http://localhost:8080/api/board/list");
            // 가져온 데이터(res.data)를 상태에 저장하여 화면에 반영
            setBoardList(res.data);
        } catch (err) {
            console.log("게시판 목록 불러오는데 실패했습니다", err);
        }
    };

    const deleteBoard = async (id: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
        }

        try {
            await axios.delete(`http://localhost:8080/api/board/delete/${id}`);
            alert("삭제되었습니다.");

            // 삭제 후 목록 다시 불러오기
            fetchBoardList();
        } catch (err) {
            console.log("삭제 실패", err);
        }
};

    return (
        <div style={{ marginTop: "100px", padding: "20px", maxWidth: "800px", margin: "100px auto" }}>
            <h2>자유 게시판</h2>
            
            {/* 상단 글쓰기 버튼: 클릭 시 /board/save 경로로 이동 */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button 
                    onClick={() => navigate("/board/save")} 
                    style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    글 쓰기
                </button>
            </div>

            {/* 게시판 목록 테이블 */}
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #333" }}>
                        <th style={{padding:"10px"}}>관리</th>
                        <th style={{ padding: "10px" }}>번호</th>
                        <th style={{ padding: "10px" }}>제목</th>
                        <th style={{ padding: "10px" }}>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {/* boardList가 비어있지 않으면 목록을 출력하고, 비어있으면 메시지 출력 */}
                    {boardList.length > 0 ? (
                        boardList.map((board: any) => (
                            <tr key={board.id} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "10px" }}>{board.id}</td>
                                {/* 제목 클릭 시 상세 페이지(/board/id)로 이동 */}
                                <td 
                                    onClick={() => navigate(`/board/${board.id}`)} 
                                    style={{ padding: "10px", cursor: "pointer", color: "#007bff" }}
                                >
                                    {board.title}
                                </td>
                                <td style={{ padding: "10px" }}>{board.author}</td>
                                <td style={{padding: "10px"}}>
                                    <button onClick={()=>navigate(`/board/update/${board.id}`)}>수정</button>
                                </td>
                                <td style={{padding:"10px"}}>
                                     <button onClick={()=> deleteBoard(board.id )}>삭제</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ padding: "20px" }}>작성된 글이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BoardList;