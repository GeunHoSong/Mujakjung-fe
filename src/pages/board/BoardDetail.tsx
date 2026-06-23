import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../axiosConfig";
import CommentSave from "../../comment/CommentSave";


function BoardDatail(){
    const {id}= useParams();
    const navigate= useNavigate();

    const [board , setBoard] = useState<any>(null);

    //게시글 상세 페이지
    useEffect(()=> {
        fetchBoard();

    }, []);
    const handleDelete = async () => {
        if(window.confirm("정말 삭제 하시겠습니까")){
            try{
                //컨트롤러의 @DeleteMapping 경로와 정확히 일치해야 합니다!
                await apiClient.delete(`/api/board/delete/${id}`);
                alert("삭제 완료");
                navigate("/board/list");
            }catch (error){
                console.error("삭제 실패" , error);
                alert("삭제중 오류 가 발생 되었습니다");
            }

        }
    }
    const fetchBoard = async () => {
        try {
            // 주소를 컨트롤러 @RequestMapping과 일치시킴
            const res = await apiClient.get(`/api/notice/${id}`); 
            setBoard(res.data);
        } catch (error) {
            console.log("게시글 조회 실패", error);
        }
        }
        if(!board){
            return <div>로딩중 .......</div>
        }

    return (
        <div style={{margin: "100px auto ", width: "800px"}}>
            <h2>게시판 상세</h2>
            <hr />
            <p><strong>번호</strong>{board.id}</p>
            <p><strong>제목</strong>{board.title}</p>
            <p><strong>작성자</strong>{board.writer}</p>
            <p><strong>내용</strong></p>
            <div style={{border: "1px solid #ddd", padding:"12px", minHeight:"200px"}} >
                {/* 대문자 Content를 소문자 content로 변경 */}
                {board.content} 
            </div>
            <br/>
            <button onClick={()=> navigate("/board/list")}>목록</button>
            <button onClick={()=> navigate(`/board/update/${id}`)}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <br/>
            <h3>댓글</h3>
            <CommentSave boardId={id!} /> 
        </div>
    )

}

export default BoardDatail;