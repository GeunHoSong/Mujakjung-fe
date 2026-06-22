import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TravelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 로컬 스토리지에서 정보 가져오기
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8080/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("삭제 완료");
      navigate("/travel/list");
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  // [수정 포인트] 인증 에러(401) 공통 처리 함수
  const handleAuthError = (err: any) => {
    if (err.response?.status === 401) {
      alert("로그인이 만료되었습니다. 다시 로그인해 주세요.");
      localStorage.clear();
      navigate("/login");
    } else {
      console.error("요청 실패:", err);
      alert("작업 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://localhost:8080/api/travels/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTravel(response.data);
      } catch (error: any) {
        handleAuthError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]); // navigate 추가

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
          // 서버에서 오는 전체 URL 경로일 확률이 높으니 확인해봐
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