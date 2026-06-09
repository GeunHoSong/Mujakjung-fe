import axios from "axios";
import React ,{useState}from "react";


function NoticeSave (){
    // 상태 관리
    const [title , setTitle] = useState<string>("");
    const [writer, setWriter] = useState<string>("");
    const [content, setContent] = useState<string>("");
    // 등록 함수 
    const handleSave = async () => {
    if(!title || !content){
        alert("제목과 내용을 입력을 하세요");
        return;
    }
    const token = localStorage.getItem("token");
    try{
        // 'Bearer ' 뒤에 공백 하나가 꼭 있어야 해!
        await axios.post("http://localhost:8080/api/notice/save", { title, writer, content }, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        alert("공지 사항을 성공적으로 등록을 하였습니다");
        setTitle("");
        setWriter("");
        setContent("");   
    } catch (error) {
        console.error("등록 오류 입니다", error);
        alert("등록 오류 가 발생을 하였습니다");
    }
}

    // 랜더링 
    return (
        <div style={{padding: "20px", maxWidth: "600px", margin:"0 auto "}}>
            <h2>공지 사항 </h2>
            <div style={{display: "flex", flexDirection: "column" , gap: "10px"}}>
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="제목을 입력을 하세요" />
                <input type="text" value={writer} onChange={(e)=> setWriter(e.target.value)} placeholder="작성자" />
                <textarea value={content} onChange={(e)=> setContent(e.target.value)} rows={10} placeholder="내용을 입력 하세요"></textarea>
                <button onClick={handleSave}>공지 등록 하기</button>
            </div>
        </div>
    )


}

export default NoticeSave;

