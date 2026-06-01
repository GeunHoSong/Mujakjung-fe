import { useSearchParams } from "react-router-dom";
import TravelCard from "../../components/TravelCard";
import { useState, useEffect, useMemo } from "react";

/**
 * 1. 백엔드 실제 데이터 필드명에 맞춰 수정
 */
interface TravelData {
  id: number;
  title: string;      // 백엔드: title
  category: string;   // 백엔드: category (type 대신 사용)
  image_path: string; // 백엔드: image_path (image 대신 사용)
  location: string;   // 백엔드: location
  price: string;
}


function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  const type = params.get("type") || "";

  // 2. 상태 관리
  const [places, setPlaces] = useState<TravelData[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  /**
   * 3. 백엔드 API 연동 (useEffect)
   * 토큰 인증 로직을 추가한 버전이야!
   */
  useEffect(() => {
    // 로컬 스토리지에서 신분증(토큰) 꺼내기
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/travels", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // [수정 포인트] 토큰이 있을 때만 헤더에 실어서 보냄
        ...(token && { "Authorization": `Bearer ${token}` })
      }
    })
      .then((response) => {
        // 401 에러(인증 실패) 처리
        if (response.status === 401) {
          throw new Error("인증이 만료되었습니다. 다시 로그인해 주세요.");
        }
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("백엔드 데이터 구조 확인 ", data)
        if (Array.isArray(data)) {
          setPlaces(data);
          setErrorMsg(""); 
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
        setErrorMsg(error.message);
        setPlaces([]); 
      });
  }, []);

  /**
   * 4. 실시간 필터링 계산 (useMemo)
   */
  const filteredPlaces = useMemo(() => {
    if (!Array.isArray(places)) return [];

    return places.filter((place) => {
      const matchKeyword = keyword 
        ? (place.title || "").toLowerCase().includes(keyword.toLowerCase()) 
        : true;
      const matchType = type ? place.category === type : true;
      return matchKeyword && matchType;
    });
  }, [places, keyword, type]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>추천 여행 결과</h1>
      <p style={{ color: "#666" }}>검색어: {keyword} | 타입: {type}</p>
      <hr />

      {/* 에러 발생 시 경고창 */}
      {errorMsg && (
        <div style={{ background: "#fff5f5", color: "#c92a2a", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #ffc9c9" }}>
          <strong>⚠️ 안내:</strong> {errorMsg}
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <TravelCard
              key={place.id}
              travel={{
                id: place.id,
                title: place.title,
                image: place.image_path || "/test.jpg",
                location: place.location,
                price: "가격 미정",
              }}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", width: "100%", marginTop: "50px" }}>
            <p>조건에 맞는 여행지가 없습니다.</p>
            <p style={{ fontSize: "0.8rem", color: "#999" }}>
              (불러온 전체 데이터: {places.length}개)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;