import { useState } from "react";
import axios from "axios"; // 1. axios import 추가

interface CommentSaveProps {
    boardId: string | number;
    onSave: ()=> void;
}

function CommentSave({ boardId, onSave }: CommentSaveProps) {
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (!comment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        setIsLoading(true);

        try {
            // 2. 백엔드로 데이터 전송
            // 백엔드 컨트롤러가 @RequestBody로 받으므로 객체 형태로 전송
            await axios.post('/api/comment', {
                board: { id: boardId }, // Entity 관계 매핑에 맞춰 board 객체 전달
                content: comment
            });

            alert("댓글이 저장되었습니다.");
            setComment(""); // 입력창 초기화
            window.location.reload(); // 3. 화면 새로고침하여 댓글 목록 다시 불러오기
        } catch (error) {
            console.error("저장 실패:", error);
            alert("댓글 저장에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>로딩중 ...</div>;
    
    return (
        <div>
            <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                placeholder="댓글을 작성하세요"
            />
            <button onClick={handleSave}>저장</button>
        </div>
    );
}

export default CommentSave;