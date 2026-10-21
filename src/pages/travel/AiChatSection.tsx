import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
    sender: "ai" | "user";
    text: string;
}

function AiChatSection() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Message[]>([
        {
            sender: "ai",
            text: "요즘 많이 지치셨나요? 마음속 이야기를 편하게 들려주시면 딱 맞는 힐링 여행지와 일정을 함께 찾아드릴게요. 🌊",
        },
    ]);

    // AI 메시지 전송
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessage((prev) => [...prev, { sender: "user", text: userMessage }]);
        setInput("");
        setLoading(true);

        try {
            // 1. URL 포트 및 슬래시 수정 (8000번, /generate)
            const response = await fetch("http://localhost:8000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: userMessage }),
            });

            if (!response.ok) throw new Error(`FastAPI 서버 오류: ${response.status}`);
            
            // 2. .json() 함수 호출 형태로 수정
            const data = await response.json();

            setMessage((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: data.analysis_result || "AI가 응답을 생성하지 못했어요. 다시 시도해주세요.",
                },
            ]);
        } catch (error) {
            console.error("FastAPI 통신 에러:", error);
            setMessage((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "서버와 연결하지 못했어요.\nFastAPI 서버가 실행 중인지 확인해주세요!",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: "30px", background: "#ffffff", borderRadius: "20px", border: "1px solid #eaeaea", overflow: "hidden", display: "flex", flexDirection: "column", height: "550px" }}>
            
            {/* 채팅창 헤더 */}
            <div style={{ background: "#1d4ed8", color: "white", padding: "16px 20px", fontWeight: "bold", fontSize: "16px" }}>
                무작정 AI 감성 가이드와 대화 중
            </div>

            {/* 메시지 목록 */}
            <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", background: "#f8f9fa" }}>
                {message.map((msg, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                        <div style={{
                            maxWidth: "75%",
                            padding: "14px 18px",
                            borderRadius: "16px",
                            fontSize: "14px",
                            lineHeight: "1.5", // 오타 수정 (1-5 -> 1.5)
                            whiteSpace: "pre-line",
                            background: msg.sender === "user" ? "#2563eb" : "#ffffff", // 오타 수정 (#fffff -> #ffffff)
                            color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                            border: msg.sender === "ai" ? "1px solid #e5e7ed" : "none"
                        }}>
                            {msg.text}

                            {/* 일정 저장 버튼 */}
                            {msg.sender === "ai" && idx > 0 && (
                                <div style={{ marginTop: "12px" }}>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/travel/TravelSave", { state: { tripId: "trip_2026_01" } })}
                                        style={{ padding: "8px 14px", backgroundColor: "#4F46E5", color: "#ffffff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}
                                    >
                                        이 일정을 TravelSave로 저장하기
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={{ color: "#888", fontSize: "14px", padding: "10px" }}>
                        고민을 깊이 읽고 답변을 정리하는 중이에요... 
                    </div>
                )}
            </div>

            {/* 메시지 입력 폼 (이 부분이 빠져있어서 추가함!) */}
            <form onSubmit={handleSendMessage} style={{ padding: "16px", background: "#ffffff", borderTop: "1px solid #eaeaea", display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="예: 요즘 너무 지쳐서 조용한 곳에서 힐링하고 싶어..."
                    style={{ flex: 1, border: "1px solid #d1d5db", borderRadius: "10px", padding: "12px 16px", outline: "none", fontSize: "14px" }}
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