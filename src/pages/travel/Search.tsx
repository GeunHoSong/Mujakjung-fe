import { useSearchParams } from "react-router-dom";
import TravelCard from "../../components/TravelCard";
import { useState, useEffect, useMemo } from "react";

/**
 * 1. 백엔드 데이터 타입 정의
 * 인터페이스를 만들어두면 오타로 인한 에러를 컴파일 단계에서 잡을 수 있어.
 */
interface TravelData {
  id: number;
  name: string;   // 백엔드 필드명: name
  image: string;
  price: string;
  type: string;
}

function Search() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  const type = params.get("type") || "";

  // 2. 상태 관리: 데이터와 에러 메시지 보관
  const [places, setPlaces] = useState<TravelData[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  /**
   * 3. 백엔드 API 연동 (useEffect)
   * 여기서 401 에러가 나면 catch문으로 넘어가서 화면 뻗음을 방지해.
   */
  useEffect(() => {
    fetch("http://localhost:8080/api/travels")
      .then((response) => {
        // 시큐리티에 걸리면 여기서 401이 뜸!
        if (response.status === 401) {
          throw new Error("보안 설정(Security)으로 인해 접근이 거부되었습니다.");
        }
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaces(data);
          setErrorMsg(""); // 성공 시 에러 초기화
        }
      })
      .catch((error) => {
        console.error("에러 발생:", error);
        setErrorMsg(error.message);
        setPlaces([]); // 에러 시 빈 배열로 초기화 (중요!)
      });
  }, []);

  /**
   * 4. 실시간 필터링 계산 (useMemo)
   * 의존성 배열에 places를 넣어서 데이터가 오면 자동으로 계산돼. 새로고침 필요 없음!
   */
  const filteredPlaces = useMemo(() => {
    if (!Array.isArray(places)) return []; // 방어 코드

    return places.filter((place) => {
      // 키워드 대소문자 구분 없이 검색 (안전하게 처리)
      const matchKeyword = keyword 
        ? (place.name || "").toLowerCase().includes(keyword.toLowerCase()) 
        : true;
      const matchType = type ? place.type === type : true;
      return matchKeyword && matchType;
    });
  }, [places, keyword, type]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>추천 여행 결과</h1>
      <p style={{ color: "#666" }}>검색어: {keyword} | 타입: {type}</p>
      <hr />

      {/* 시큐리티 에러가 났을 때 보여줄 경고창 */}
      {errorMsg && (
        <div style={{ background: "#fff5f5", color: "#c92a2a", padding: "15px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #ffc9c9" }}>
          <strong>⚠️ 접근 오류:</strong> {errorMsg} <br />
          <small>Spring Boot의 SecurityConfig에서 permitAll() 설정을 확인해 보세요.</small>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {/* 결과 렌더링 (삼항 연산자 구조) */}
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <TravelCard
              key={place.id}
              travel={{
                id: place.id,
                title: place.name,       // 백엔드 name -> 프론트 title 매핑
                image: place.image || "/test.jpg",
                price: place.price || "가격 미정",
                location: place.name,    // 백엔드 name -> 프론트 location 매핑
              }}
            />
          ))
        ) : (
          /* 결과가 없을 때 */
          <div style={{ textAlign: "center", width: "100%", marginTop: "50px" }}>
            <p>조건에 맞는 여행지가 없습니다.</p>
            <p style={{ fontSize: "0.8rem", color: "#999" }}>
              (가져온 데이터 개수: {places.length}개)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;