import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../axiosConfig";
import CommentSave from "../../comment/CommentSave";
import CommentList from "../../comment/CommentList";

function BoardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [board, setBoard] = useState<any>(null);
    const [comments, setComments] = useState([]); // 댓글 목록 상태

    useEffect(() => {
        fetchBoard();
        fetchComments();
    }, [id]);

    // 1. 게시글 상세 조회
    const fetchBoard = async () => {
        try {
            const res = await apiClient.get(`/api/notice/${id}`);
            setBoard(res.data);
        } catch (error) {
            console.error("게시글 조회 실패", error);
        }
    };

    // 2. 댓글 목록 조회
    const fetchComments = async () => {
        try {
            const res = await apiClient.get(`/api/comment/${id}`);
            setComments(res.data);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };

    // 3. 게시글 삭제
    const handleDelete = async () => {
        if (window.confirm("정말 삭제 하시겠습니까?")) {
            try {
                await apiClient.delete(`/api/board/delete/${id}`);
                alert("삭제 완료");
                navigate("/board/list");
            } catch (error) {
                console.error("삭제 실패", error);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    if (!board) return <div>로딩중 .......</div>;

    return (
        <div style={{ margin: "100px auto", width: "800px" }}>
            <h2>게시판 상세</h2>
            <hr />
            <p><strong>번호: </strong>{board.id}</p>
            <p><strong>제목: </strong>{board.title}</p>
            <p><strong>작성자: </strong>{board.writer}</p>
            <p><strong>내용: </strong></p>
            <div style={{ border: "1px solid #ddd", padding: "12px", minHeight: "200px" }}>
                {board.content}
            </div>
            
            <br />
            <button onClick={() => navigate("/board/list")}>목록</button>
            <button onClick={() => navigate(`/board/update/${id}`)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            
            <br /><br />
            <h3>댓글</h3>
            
            {/* 자식 컴포넌트에 데이터 및 함수 전달 */}
            <CommentSave 
                boardId={id!} 
                onSave={fetchComments} 
            /> 
            
            <CommentList 
                boardId={id!} 
                comments={comments} 
                onUpdate={fetchComments} 
            /> 
        </div>
    );
}

// 잊지 마세요! 파일 맨 아래에 꼭 있어야 합니다.
export default BoardDetail;