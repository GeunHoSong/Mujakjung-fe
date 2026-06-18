import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function NoticeUpdate() {
    const {id} = useParams();
    const naviagte = useNavigate();

    //  수정 데이터 를 담은 상태 
    const [title, setTitle] = useState("");
    const [content , setContent] = useState("");

 useEffect(()=> {
    const token = localStorage.getItem("token");
    fetch(`/api/notice/${id}`, {
        // 여기 오타 수정!
        headers: { "Authorization": `Bearer ${token}` } 
    })
    .then((res)=> res.json())
    .then((data)=> {
        setTitle(data.title);
        setContent(data.content);
    })
    .catch((err) => console.error("데이터 불러오기", err));
}, [id]);

    // 수정 버튼 클릭시 실행되는 함수 
const handleUpdate = async ()=> {
    const token = localStorage.getItem("token");
    
    // 주소를 /api/notice/update/${id} 로 변경!
    const res = await fetch(`/api/notice/update/${id}`, {
        method: "PUT", 
        headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json" // 'C'는 대문자가 좋아!
        },
        body: JSON.stringify({title, content})
    });
    
    if(res.ok) {
        alert("수정 성공");
        naviagte(`/notice/${id}`);
    } else {
        alert("수정 실패");
    }
}
    return (
        <div style={{padding: "20px"}}>
            <h2>공지사항 수정 화면 입니다</h2>
                <input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="제목" />
                <textarea value={content} onChange={(e)=> setContent(e.target.value)} placeholder="내용"></textarea>
                <button onClick={handleUpdate}>수정</button>
                <button onClick={()=> naviagte(-1)}>취소</button>
        </div>
    )
}

// 💡 아래 문장이 반드시 있어야 합니다!
export default NoticeUpdate; 