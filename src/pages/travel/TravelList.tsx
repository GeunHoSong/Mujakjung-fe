import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. 데이터 구조 정의 (백엔드 TravelDTO와 필드명을 동일하게 맞춤)
interface TravelDTO {
  id: number;
  title: string;
  location: string;
  category: string;
}

function TravelList() {
  // 서버에서 받아온 리스트를 저장할 상태 (초기값은 빈 배열)
  const [list, setList] = useState<TravelDTO[]>([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  // 2. 컴포넌트가 마운트될 때(처음 열릴 때) 백엔드 API 호출
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/travel/list")
      .then((res) => {
        setList(res.data); // 성공하면 리스트 상태 업데이트
      })
      .catch((err) => {
        console.error("리스트 출력 실패:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>무작정 여행지 목록</h2>
      <p>등록된 여행지들을 확인하고 상세 내용을 보려면 클릭하세요.</p>
      <hr />

      <div style={{ display: "grid", gap: "15px" }}>
        {/* 3. map 함수를 이용해 리스트 개수만큼 화면에 반복 출력 */}
        {list.map((item) => (
          <div
            key={item.id} // 리액트가 각 요소를 식별하기 위한 고유 키
            // 클릭 시 상세 페이지로 이동 (중요: 따옴표 대신 백틱(`) 사용!)
            onClick={() => navigate(`/travel/${item.id}`)}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",
              backgroundColor: "#f9f9f9"
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>{item.title}</h3>
            <p style={{ color: "#666", margin: "5px 0" }}>📍 {item.location}</p>
            {/* 카테고리가 'domestic'이면 국내, 아니면 해외로 표시 */}
            <small style={{ color: "#007bff", fontWeight: "bold" }}>
              {item.category === "domestic" ? "국내 여행" : "해외 여행"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelList;