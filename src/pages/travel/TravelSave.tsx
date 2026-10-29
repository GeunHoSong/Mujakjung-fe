import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface PlaceItem {
    name: string;
    latitude: number;
    longitude: number;
    order_index: number;
    memo: string;
}

function TravelSave() {
    const navigate = useNavigate();
    const location = useLocation();

    // AI 추천 화면 등에서 넘겨준 state 데이터 받기
    const receiveData = location.state as {
        tripId?: string;
        visitDate?: string;
        places?: PlaceItem[];
    } | null;

    const [tripId, setTripId] = useState(receiveData?.tripId || "trip_2026_01");
    const [visitDate, setVisitDate] = useState(receiveData?.visitDate || "2026-10-12");
    const [places, setPlaces] = useState<PlaceItem[]>(
        receiveData?.places || [
            { name: "경복궁", latitude: 37.5796, longitude: 126.9770, order_index: 1, memo: "메인 관람 코스 및 산책" },
            { name: "광장시장", latitude: 37.5700, longitude: 126.9990, order_index: 2, memo: "점심 식사 및 간식 투어" }
        ]
    );
    const [loading, setLoading] = useState(false);

    // FastAPI 서버로 오늘 일정 전송 함수 
    const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        title: `${visitDate} 여행`
    };

    try {
        setLoading(true);

        const response = await axios.post(
            "http://localhost:8080/api/mypage/travel-plans",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }
        );

        console.log("여행 일정 저장 응답:", response.data);
        alert("여행 제목 저장 요청이 성공했어!");
        navigate("/mypage/travel");
    } catch (error) {
        console.error("여행 일정 저장 실패:", error);
        alert("저장에 실패했어. 로그인 상태와 Spring Boot 서버를 확인해 줘.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h2>여행 일정 저장</h2>
            <p style={{ color: "#666", marginBottom: "30px" }}>
                AI 추천 동선이나 내가 구성한 오늘의 일정을 확인 하고 서버에 안전하게 저장 하세요
            </p>
            <form onSubmit={handleSaveSchedule} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                    <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>방문 날짜</label>
                    <input 
                        type="date" 
                        value={visitDate} 
                        onChange={(e) => setVisitDate(e.target.value)} 
                        style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #ccc" }}
                    />
                </div>

                {/* 장소 목록 표시 섹션 */}
                <div>
                    <h3 style={{ marginBottom: "12px", fontSize: "18px" }}>저장될 장소 목록 ({places.length}개소)</h3>
                    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                        {places.map((place, index) => (
                            <li key={index} style={{ padding: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginBottom: "4px" }}>
                                    <span>{place.order_index}. {place.name}</span>
                                    <span style={{ fontSize: "12px", color: "#64748b" }}>위도: {place.latitude}, 경도: {place.longitude}</span>
                                </div>
                                <div style={{ fontSize: "14px", color: "#475569" }}>메모: {place.memo}</div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 버튼 영역 */}
                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        style={{ 
                            flex: 2, 
                            padding: "14px", 
                            backgroundColor: loading ? "#cbd5e1" : "#4F46E5",
                            color: "#fff", 
                            border: "none",
                            borderRadius: "8px", 
                            fontSize: "16px", 
                            fontWeight: "bold", 
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "저장 중...." : "TravelSave 서버에 저장 하기"}
                    </button>
                    <button type="button" onClick={() => navigate("/mypage")} style={{ flex: 1, padding: "14px", color: "#334155", 
                            border: "1px solid #e2e8f0", 
                            borderRadius: "8px", 
                            fontSize: "16px", 
                            fontWeight: "bold", 
                            cursor: "pointer",
                            backgroundColor: "#f8fafc"
                        }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TravelSave;