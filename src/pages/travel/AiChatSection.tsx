
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ItineraryMap from "./ItineraryMap";
import RecommendForm from "../../components/RecommendForm";
// 1. 부모 컴포넌트에서 전달받는 Props
interface AiChatSectionProps {
    latitude: number | null;
    longitude: number | null;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

// 2. 장소 하나의 정보 타입
interface ItineraryItem {
    time?: string;
    place?: string;
    description?: string;
    category?: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    recommendation_reason?: string | null;
}

// 3. 하루의 일정 타입
interface ItineraryDay {
    day: number;
    courses: ItineraryItem[];
}
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


// 4. 추천 API 응답 타입
interface RecommendationResponse {
    title?: string;
    summary?: string;
    itinerary?: ItineraryDay[];
}


// 5. 채팅 메시지 타입
interface Message {
    sender: "user" | "ai";
    text: string;
    recommendation?: RecommendationResponse;
}

// 6. AI 채팅 컴포넌트
function AiChatSection({
    latitude,
    longitude,
    selectedTags,
    setSelectedTags
}: AiChatSectionProps) {
    const navigate = useNavigate();
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    // 처음 채팅 화면에 표시할 AI 인사말
    const [message, setMessage] = useState<Message[]>([
        {
            sender: "ai",
            text: "요즘 많이 지치셨나요? 마음속 이야기를 편하게 들려주시면 딱 맞는 힐링 여행지와 일정을 함께 찾아드릴게요. 🌊"
        }
    ]);

    // 7. 메시지나 로딩 상태가 바뀌면 채팅창 아래로 이동
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [message, loading]);

    // 9. 질문에서 실제 사용자 요청 추출
    const extractQuery = (text: string): string => {
        const match = text.match(/사용자 요청:\s*([\s\S]*?)(?:\n|$)/);
        return match ? match[1].trim() : text.trim();
    };

    // 10. 질문에 포함된 선호 태그 추출
    const extractTags = (text: string): string[] => {
        const match = text.match(/선호 태그:\s*(.*)/);

        if (!match || match[1].includes("특별한 태그 없음")) {
            return [];
        }

        return match[1]
            .split(/[#,]/)
            .map((tag) => tag.trim())
            .filter(Boolean);
    };

    // 11. AI 대화와 여행 장소 추천 요청
    const handleSendToAI = async (userQuery: string) => {
    if (loading) return;

    if (latitude == null || longitude == null) {
        alert("현재 위치를 확인할 수 없어요. 위치 권한을 확인해 주세요.");
        return;
    }

    const tags = selectedTags;

    if (!userQuery.trim()) return;

    // 여행 일수 추출
    const durationMatch = userQuery.match(
        /(\d+)\s*박\s*(\d+)\s*일|(\d+)\s*일/
    );

    const duration = durationMatch
        ? Number(durationMatch[2] || durationMatch[3])
        : 1;

    // 일반 AI 답변에 위치와 선호 태그 전달
    const enhancedMessage =
        `[현재 위치 정보: 위도 ${latitude}, 경도 ${longitude}]\n` +
        `선호 태그: ${tags.length ? tags.join(", ") : "특별한 태그 없음"}\n` +
        `사용자 요청: ${userQuery}`;

    // 아래쪽 기존 코드부터는 그대로 유지
        try {
            // 일반 AI 대화와 장소 추천 API 동시 요청
            const [chatResponse, recommendResponse] = await Promise.all([
                fetch("http://localhost:8001/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        content: enhancedMessage
                    })
                }),

                fetch("http://localhost:8001/api/ai/recommend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        latitude,
                        longitude,
                        tags,
                        query: userQuery,
                        duration
                    })
                })
            ]);

            // 12. 일반 AI 답변 처리
            let aiText =
                "질문에 맞는 답변을 준비했어요. 추천 장소를 확인해 보세요. 🌿";

            if (chatResponse.ok) {
                const chatData = await chatResponse.json();
                aiText = chatData.analysis_result || aiText;
            } else {
                console.error(
                    "AI 대화 API 오류:",
                    chatResponse.status,
                    await chatResponse.text()
                );
            }

            // 13. 장소 추천 결과 처리
            let recommendation: RecommendationResponse | undefined;

            if (recommendResponse.ok) {
                const recommendationData: RecommendationResponse =
                    await recommendResponse.json();

                recommendation = recommendationData;

                console.log("AI 여행 추천 성공:", recommendation);
            } else {
                const errorText = await recommendResponse.text();

                console.error(
                    "장소 추천 API 오류:",
                    recommendResponse.status,
                    errorText
                );

                aiText +=
                    "\n\n여행 일정 생성에 실패했어요. 잠시 후 다시 시도해 주세요.";
            }

            // 14. AI 답변과 추천 결과를 하나의 메시지로 저장
            setMessage((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: aiText,
                    recommendation
                }
            ]);

        } catch (error) {
            console.error("AI 통신 오류:", error);

            setMessage((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "서버와 연결하지 못했어요. FastAPI 서버가 실행 중인지 확인해 주세요."
                }
            ]);

        } finally {
            setLoading(false);
        }
    };

    // 15. 입력창에서 사용자가 직접 질문을 전송
    const handleSendMessage = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!input.trim() || loading) return;

        const userQuery = input.trim();
        setInput("");

        void handleSendToAI(userQuery);
    };

    // 16. AI 추천 일정 콘솔 확인
    console.log(
        "AI 추천 일정:",
        message.map((msg) => msg.recommendation?.itinerary)
    );

    return (
        
        <div style={{marginTop: "30px",background: "#ffffff",borderRadius: "20px",border: "1px solid #eaeaea",overflow: "hidden",display: "flex",flexDirection: "column",height: "650px"}}>
            <RecommendForm latitude={latitude} longitude={longitude} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
            {/* 17. 채팅창 헤더 */}
            <div
                style={{
                    background: "#1d4ed8",
                    color: "white",
                    padding: "16px 20px",
                    fontWeight: "bold",
                    fontSize: "16px"
                }}
            >
                무작정 AI 감성 가이드와 대화 중
            </div>

            {/* 18. 채팅 메시지 목록 */}
            <div
                style={{
                    flex: 1,
                    padding: "20px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    background: "#f8f9fa"
                }}
            >
                {message.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            justifyContent:
                                msg.sender === "user"
                                    ? "flex-end"
                                    : "flex-start"
                        }}
                    >
                        <div
                            style={{
                                width: "fit-content",
                                maxWidth: "90%",
                                padding: "14px 18px",
                                borderRadius: "16px",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                whiteSpace: "pre-line",
                                background:
                                    msg.sender === "user"
                                        ? "#2563eb"
                                        : "#ffffff",
                                color:
                                    msg.sender === "user"
                                        ? "#ffffff"
                                        : "#1f2937",
                                border:
                                    msg.sender === "ai"
                                        ? "1px solid #e5e7eb"
                                        : "none"
                            }}
                        >
                            {/* AI 답변 또는 사용자 질문 */}
                            <div>{msg.text}</div>

                            {/* 19. AI 추천 결과 영역 */}
                            {msg.sender === "ai" && msg.recommendation && (
                                <div style={{ marginTop: "16px" }}>
                                    <h3
                                        style={{
                                            margin: "0 0 8px",
                                            fontSize: "17px",
                                            color: "#166534"
                                        }}
                                    >
                                        {msg.recommendation.title ||
                                            "맞춤 추천 장소"}
                                    </h3>

                                    {/* 전체 추천 일정 설명 */}
                                    {msg.recommendation.summary && (
                                        <p
                                            style={{
                                                margin: "0 0 12px",
                                                color: "#4b5563"
                                            }}
                                        >
                                            {msg.recommendation.summary}
                                        </p>
                                    )}

                                    {/* 20. 지도 표시 */}
                                    {msg.recommendation?.itinerary &&
                                        msg.recommendation.itinerary.length > 0 && (
                                            <ItineraryMap
                                                itinerary={
                                                    msg.recommendation.itinerary
                                                }
                                            />
                                        )}

                                    {/* 21. 날짜별 일정과 장소 카드 출력 */}
                                    {msg.recommendation.itinerary?.map(
                                        (dayItem) => (
                                            <div
                                                key={dayItem.day}
                                                style={{ marginTop: "16px" }}
                                            >
                                                <h4
                                                    style={{
                                                        margin: "0 0 10px",
                                                        color: "#1f2937"
                                                    }}
                                                >
                                                    {dayItem.day}일 차
                                                </h4>

                                                {dayItem.courses.map(
                                                    (item, itemIndex) => (
                                                        <div
                                                            key={`${item.place || "place"}-${itemIndex}`}
                                                            style={{
                                                                marginTop: "12px",
                                                                padding: "14px",
                                                                borderRadius: "12px",
                                                                border: "1px solid #e5e7eb",
                                                                background: "#ffffff"
                                                            }}
                                                        >
                                                            <h4
                                                                style={{
                                                                    margin: "0 0 8px",
                                                                    fontSize: "15px",
                                                                    color: "#111827"
                                                                }}
                                                            >
                                                                {itemIndex + 1}.{" "}
                                                                {item.place ||
                                                                    "장소명 없음"}
                                                            </h4>

                                                            {item.category && (
                                                                <p style={{ margin: "5px 0" }}>
                                                                    🏷️ {item.category}
                                                                </p>
                                                            )}

                                                            {item.time && (
                                                                <p style={{ margin: "5px 0" }}>
                                                                    🕒 {item.time}
                                                                </p>
                                                            )}

                                                            {item.address && (
                                                                <p
                                                                    style={{
                                                                        margin: "5px 0",
                                                                        color: "#4b5563"
                                                                    }}
                                                                >
                                                                    📍 {item.address}
                                                                </p>
                                                            )}

                                                            {item.description && (
                                                                <p
                                                                    style={{
                                                                        margin: "8px 0",
                                                                        lineHeight: "1.6"
                                                                    }}
                                                                >
                                                                    {item.description}
                                                                </p>
                                                            )}

                                                            {item.recommendation_reason && (
                                                                <p
                                                                    style={{
                                                                        margin: "8px 0 0",
                                                                        color: "#166534"
                                                                    }}
                                                                >
                                                                    💡 추천 이유:{" "}
                                                                    {item.recommendation_reason}
                                                                </p>
                                                            )}

                                                            {item.latitude != null &&
                                                                item.longitude != null && (
                                                                    <p
                                                                        style={{
                                                                            margin: "8px 0 0",
                                                                            color: "#6b7280",
                                                                            fontSize: "12px"
                                                                        }}
                                                                    >
                                                                        위치 좌표 확인 완료
                                                                    </p>
                                                                )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )
                                    )}

                                    {/* 추천 일정이 없을 때 안내 */}
                                    {(!msg.recommendation.itinerary ||
                                        msg.recommendation.itinerary.length === 0) && (
                                        <p style={{ color: "#6b7280" }}>
                                            추천 장소가 없어요. 검색 결과와 서버 응답을 확인해 주세요.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* 22. 실제 일정이 있을 때만 저장 버튼 표시 */}
                            {msg.sender === "ai" &&
                                msg.recommendation?.itinerary &&
                                msg.recommendation.itinerary.length > 0 &&
                                msg.recommendation.itinerary.some(
                                    (day) => day.courses.length > 0
                                ) && (
                                    <div style={{ marginTop: "12px" }}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate("/travel/TravelSave", {
                                                    state: {
                                                        travelData: msg.recommendation
                                                    }
                                                })
                                            }
                                            style={{
                                                padding: "8px 14px",
                                                backgroundColor: "#4F46E5",
                                                color: "#ffffff",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "bold",
                                                cursor: "pointer"
                                            }}
                                        >
                                            이 일정을 TravelSave로 저장하기
                                        </button>
                                    </div>
                                )}
                        </div>
                    </div>
                ))}

                {/* 23. AI 응답을 기다리는 동안 로딩 표시 */}
                {loading && (
                    <div
                        style={{
                            color: "#888",
                            fontSize: "14px",
                            padding: "10px"
                        }}
                    >
                        마음에 맞는 장소를 찾고 답변을 정리하는 중이에요...
                    </div>
                )}

                <div ref={messageEndRef} />
            </div>

            {/* 24. 사용자 메시지 입력 폼 */}
            <form
                onSubmit={handleSendMessage}
                style={{
                    padding: "16px",
                    background: "#ffffff",
                    borderTop: "1px solid #eaeaea",
                    display: "flex",
                    gap: "10px"
                }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="예: 요즘 너무 지쳐서 조용한 곳에서 힐링하고 싶어..."
                    style={{
                        flex: 1,
                        minWidth: 0,
                        border: "1px solid #d1d5db",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        outline: "none",
                        fontSize: "14px"
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: loading ? "#93c5fd" : "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "0 20px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "생성 중..." : "보내기"}
                </button>
            </form>
        </div>
    );
}

export default AiChatSection;
