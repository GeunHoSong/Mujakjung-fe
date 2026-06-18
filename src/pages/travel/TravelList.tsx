import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from 'react';

interface TravelDTO {
  id: number;
  title: string;
  location: string;
  category: string;
}

function TravelList() {
  const [list, setList] = useState<TravelDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/travel/list")
      .then((res) => {
        setList(res.data);
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
        {list.map((item) => (
          <div
            key={item.id}
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