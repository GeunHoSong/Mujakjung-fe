import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminUpdate() {
  const { id } = useParams(); // URL에서 ID를 가져옴
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
    price: 0
  });

  // 데이터 불러오기
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/travel/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error("데이터 로드 실패:", err));
    }
  }, [id]);

  // 수정 요청 보내기
  const handleUpdate = () => {
    // 1. 로컬스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token"); 

    // 2. ID가 없는지 먼저 체크
    if (!id) {
        alert("상품 ID가 없습니다!");
        return;
    }

    // 3. 헤더에 토큰 실어서 요청
    axios.post(`http://localhost:8080/api/admin/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}` // 👈 핵심! 이 헤더가 있어야 권한 통과함
      }
    })
      .then(() => {
        alert("수정 완료!");
        navigate("/admin/list");
      })
      .catch(err => {
        console.error("상세 에러:", err);
        alert("수정 실패: " + err.message);
      });
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
      <h3>상품 수정</h3>
      <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="제목" />
      <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="내용"></textarea>
      <input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="위치" />
      <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="가격" />
      <button onClick={handleUpdate}>수정 하기</button>
    </div>
  );
}

export default AdminUpdate;