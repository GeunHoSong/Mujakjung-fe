import axios from "axios";
import React, { useState} from "react";


function AdminUpdate ({travel, onComplete}: any){
    const [formData , setFomData] = useState(travel);

    const handleUpdate=()=> {
        // 백엔드 @PostMapping("/{id}") 와 연결 
        axios.get("http://8080/api/admin/${travel/id}", formData).then(()=> {
            alert("수정 완료");
            onComplete();// 수정 후 다시 리스트로 돌아가개 됨 
        })
        .catch((err)=> alert("수정 실패" +err));
    }

    return (
        <div style={{display:"flex", flexDirection:"column", gap:"10px", width: "300px", }}>
            <h3>상품 수정: {travel.title}</h3>
            <input value={formData.title} onChange={(e)=> setFomData({...formData, title: e.target.value})} placeholder="제목" />
            <textarea value={formData.context} onChange={(e)=> setFomData({...formData , context: e.target.value})} placeholder="내용"></textarea>
            <input value={formData.location} onChange={(e)=> setFomData({...formData, location: e.target.value})} placeholder="위치" />
            <input type="number" value={formData.price} onChange={(e)=> setFomData({...formData, print: Number(e.target.value)})} placeholder="가격" />
            <button onClick={handleUpdate}>수정 하기 </button>


        </div>
    )
}

export default AdminUpdate;