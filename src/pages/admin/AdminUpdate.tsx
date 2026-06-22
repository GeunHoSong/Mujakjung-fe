import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
    price: 0
  });
  // [추가] 파일 상태 관리
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/travels/${id}`) // 주소 오타 수정(travels)
        .then(res => setFormData(res.data))
        .catch(err => console.error("데이터 로드 실패:", err));
    }
  }, [id]);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");

    // [핵심 변경] FormData 객체 사용
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("location", formData.location);
    data.append("price", formData.price.toString());
    
    // 파일이 선택되었을 때만 추가
    if (file) {
      data.append("file", file);
    }

    axios.post(`http://localhost:8080/api/admin/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data" // 👈 파일 보낼 때 필수!
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
      
      {/* [추가] 파일 선택창 */}
      <label>이미지 변경:</label>
      <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
      
      <button onClick={handleUpdate}>수정 하기</button>
    </div>
  );
}

export default AdminUpdate;