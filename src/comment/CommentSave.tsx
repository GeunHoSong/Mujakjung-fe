import { useState } from "react";

interface CommentSaveProps {
    boardId: string | number;
}

function CommentSave({boardId}: CommentSaveProps){
    const [comment , setComment] = useState("");
    const [isLoading , setIsLoading] = useState(false);

    const handleSave = async() => {
        setIsLoading(true);

        const commentData ={
            boardId: boardId,
            content: comment,

        }

        console.log("저장 한 댓글" , commentData);
        setTimeout(()=> setIsLoading(false) , 100);
    };

    if(isLoading) return <div>로딩중  .,....</div>
    return (
        <div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="댓글을 작성을 하세요"></textarea>
            <button onClick={handleSave}>저장</button>
        </div>
    )
}

export default CommentSave;