import { useState } from "react";
import apiClient from "../axiosConfig";

function CommentList({ boardId, comments, onUpdate }: any) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");

    // 1. 수정 완료 처리
    
    const handleUpdate = async (id: number) => {
        if (!editContent.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
         }

        try {
            await apiClient.put(
                `/api/comment/update/${id}`,
                { content: editContent }
            );

            alert("댓글이 수정되었습니다.");
            setEditingId(null);
            onUpdate();

        } catch (error) {
            console.error("댓글 수정 실패", error);
            alert("댓글 수정에 실패했습니다.");
        }
    };


    // 2. 삭제 처리
    const handleDelete = async (id: number) => {
     if (!window.confirm("정말 삭제하시겠습니까?")) {
        return;
        }

        try {
            await apiClient.delete(`/api/comment/delete/${id}`);

            alert("댓글이 삭제되었습니다.");
            onUpdate();

        } catch (error) {
            console.error("댓글 삭제 실패", error);
            alert("댓글 삭제에 실패했습니다.");
        }
    };

    return (
        <div>
            {comments.map((comment: any) => (
                <div key={comment.id} style={{ marginBottom: "10px", borderBottom: "1px solid #eee" }}>
                    {editingId === comment.id ? (
                        // 수정 중일 때
                        <div>
                            <input 
                                value={editContent} 
                                onChange={(e) => setEditContent(e.target.value)} 
                            />
                            <button onClick={() => handleUpdate(comment.id)}>완료</button>
                            <button onClick={() => setEditingId(null)}>취소</button>
                        </div>
                    ) : (
                        // 평소 상태 (댓글 내용 + 수정/삭제 버튼)
                        <div>
                            <p><strong>{comment.writer}</strong>: {comment.content}</p>
                            <button onClick={() => {
                                setEditingId(comment.id);
                                setEditContent(comment.content);
                            }}>수정</button>
                            <button onClick={() => handleDelete(comment.id)}>삭제</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default CommentList;