import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TravelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. 관리자 권한 확인 (ROLE_ADMIN으로 비교)
  const role = localStorage.getItem("role");
 const isAdmin = role === "ADMIN"; 

  console.log("현재 로컬 스토리지 role 값:", role);
  console.log("관리자 여부(isAdmin):", isAdmin);

const handleDelete = () => {
    if (window.confirm("정말 삭제 하시겠습니까??")) {
        // 토큰 가져오기 (localStorage에 저장되어 있다고 가정)
        const token = localStorage.getItem("token"); 

        axios.delete(`http://localhost:8080/api/admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // 여기에 토큰을 넣어줘야 해!
            }
        })
        .then(() => {
            alert("삭제 완료");
            navigate("/travel/list");
        })
        .catch((err) => {
            console.error("삭제 실패", err);
            // 401 에러가 뜨면 토큰이 만료되었거나 없을 확률이 높아
            alert("삭제 권한이 없거나 로그인이 만료되었습니다.");
        });
    }
};

  useEffect(() => {
  const fetchDetail = async () => {
  const token = localStorage.getItem("token"); // 토큰 가져오기
  try {
    const response = await axios.get(`http://localhost:8080/api/travel/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // 여기에 토큰 실어서 보내기!
      }
    });
    setTravel(response.data);
  } catch (error) {
    console.error("데이터 가져오는 중 에러:", error);
  } finally {
    setLoading(false);
  }
};
    fetchDetail();
  }, [id]);

  if (loading) return <div>힐링 정보를 불러오는 중...</div>;
  if (!travel) return <div>정보가 없습니다.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>뒤로가기</button>

      <header>
        <h1>{travel.title}</h1>
        <p style={{ color: '#666' }}>📍 {travel.location}</p>
      </header>

      <div style={{ marginTop: '30px' }}>
        <img 
          src={travel.imageUrl || "https://via.placeholder.com/800x400"} 
          alt={travel.title} 
          style={{ width: '100%', borderRadius: '15px' }} 
        />
      </div>

      <div style={{ marginTop: '20px', lineHeight: '1.6' }}>
        {travel.description}
      </div>

      <footer style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h3>쉼 포인트</h3>
        <p>{travel.healingPoint}</p>

        {/* 3. 관리자일 때만 수정/삭제 버튼 표시 */}
        {isAdmin && (
          <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
            <button onClick={() => navigate(`/admin/update/${id}`)}>수정</button>
            <button 
              onClick={handleDelete} 
              style={{ backgroundColor: "#ff4d4f", color: "white", padding: "8px 16px", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              삭제
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default TravelDetail;