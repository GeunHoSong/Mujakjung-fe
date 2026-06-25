import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../axiosConfig";
import CommentSave from "../../comment/CommentSave";
import CommentList from "../../comment/CommentList";

function BoardDatail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState<any>(null);
    const [comments, setComments] = useState([]); // 1. 댓글 상태 추가

    useEffect(() => {
        fetchBoard();
        fetchComments(); // 2. 페이지 로드 시 댓글도 불러오기
    }, [id]);

    // 댓글 목록 조회 함수
    const fetchComments = async () => {
        try {
            const res = await apiClient.get(`/api/comment/${id}`); // 백엔드 조회 API
            setComments(res.data);
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };

    const fetchBoard = async () => {
        try {
            const res = await apiClient.get(`/api/notice/${id}`);
            setBoard(res.data);
        } catch (error) {
            console.log("게시글 조회 실패", error);
        }
    };

    if (!board) return <div>로딩중 .......</div>;

    return (
        <div style={{ margin: "100px auto ", width: "800px" }}>
            {/* 게시글 출력부 생략 ... */}

            <h3>댓글</h3>
            {/* 3. 여기에서 데이터를 넘겨줍니다 */}
            <CommentSave boardId={id!} /> 
            <CommentList 
                boardId={id!} 
                comments={comments}      // 데이터 전달
                onUpdate={fetchComments} // 자식이 호출할 함수 전달
            /> 
        </div>
    );
}