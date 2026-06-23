import { cache, useEffect, useState } from "react";
import apiClient from "../axiosConfig";

interface  Comment {
    id: number;
    writer: string;
    content: string;
}

function CommentList ({boardId}: {boardId: string | number}){
    const [comment , setComment] = useState<Comment[]>([]);

    const fetchComment = async ()=> {
        try {
            // 백엔드 api  주소는 실제 컨트롤러 매핑 주소와 일치 해야 한다 
            const res = await apiClient.get(`/api/comment/{boardId}`);
            setComment(res.data);
        }catch( error) {
            console.error("댓글 불러오기 실패 했습니다", error);
        }
    }
    useEffect (()=> {
        fetchComment();
    }, [boardId])

    return  (
        <div>
           <h4>댓글 목록</h4>
           {comment.length == 0  ?  (
            <p>작성 하신 댓글이 없습니다</p>
           ):( 
            comment.map((comment)=> (
                <div key={comment.id} style={{borderBottom: "1px solid #ddd", padding: "10px 0"}}>
                    <p><strong>{comment.writer}</strong>: {comment.content}</p>
                </div>
            ))
           )}
        </div>
    )
}

export default CommentList