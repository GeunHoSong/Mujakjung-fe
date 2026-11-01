
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface ScheduleItem {
    time: string;
    place: string;
    description: string;
    category: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    recommendation_reason?: string | null;
}

interface DaySchedule {
    day: number;
    courses: ScheduleItem[];
}

interface RecommendResponse {
    title: string;
    summary: string;
    itinerary: DaySchedule[];
}

function TravelSave() {
    const navigate = useNavigate();
    const location = useLocation();

    // AI 추천 화면에서 전달받은 실제 여행 데이터
    const receiveData = location.state as {
        travelData?: RecommendResponse;
    } | null;

    const [travelData, setTravelData] =
        useState<RecommendResponse | null>(
            receiveData?.travelData || null
        );

    const [loading, setLoading] = useState(false);

    // 여행 일정 저장
    const handleSaveSchedule = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!travelData) {
            alert("저장할 여행 일정이 없습니다.");
            return;
        }

        const payload = {
            title: travelData.title
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

            alert("여행 제목 저장 성공!");
            navigate("/mypage/travel");

        } catch (error) {
            console.error("여행 일정 저장 실패:", error);
            alert("저장에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            padding: "40px",
            maxWidth: "700px",
            margin: "0 auto",
            fontFamily: "sans-serif"
        }}>

            <h2>여행 일정 저장</h2>

            {!travelData ? (
                <p>전달받은 AI 여행 일정이 없습니다.</p>
            ) : (
                <>
                    <h3>{travelData.title}</h3>
                    <p>{travelData.summary}</p>

                    {travelData.itinerary.map((day) => (
                        <div key={day.day} style={{ marginBottom: "25px" }}>

                            <h3>{day.day}일 차</h3>

                            {day.courses.map((course, index) => (
                                <div
                                    key={`${day.day}-${index}`}
                                    style={{
                                        padding: "16px",
                                        marginBottom: "12px",
                                        background: "#f8fafc",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <strong>
                                        {course.time} - {course.place}
                                    </strong>

                                    <p>{course.category}</p>
                                    <p>{course.description}</p>
                                    <p>{course.address}</p>
                                    <p>
                                        추천 이유: {course.recommendation_reason}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}

            <form onSubmit={handleSaveSchedule}>
                <button
                    type="submit"
                    disabled={loading || !travelData}
                    style={{
                        padding: "14px",
                        backgroundColor: "#4F46E5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    {loading ? "저장 중..." : "여행 일정 저장"}
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/mypage")}
                    style={{ padding: "14px", marginLeft: "10px" }}
                >
                    취소
                </button>
            </form>
        </div>
    );
}

export default TravelSave;
