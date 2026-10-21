import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RecommendForm from "../../components/RecommendForm"; // 1. 맞춤 추천 폼
import MainBanner from "./MainBanner";
import AiChatSection from "./AiChatSection"; // 2. 분리한 AI 채팅 섹션

function Main() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <Header />

      <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 70px)", background: "#f8f9fa" }}>
        <MainBanner />

        <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
          
          {/* 📍 1. 메인 상단: 위치 & 기분 맞춤 추천 폼 */}
          <RecommendForm />

          {/* 🤖 2. 메인 하단: AI 비서 채팅 토글 영역 */}
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "white",
                border: "none",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
              }}
            >
              {isChatOpen ? "💬 AI 대화창 닫기" : "🤖 AI 비서와 심층 대화하기"}
            </button>

            {/* 버튼 누르면 분리해둔 AiChatSection 컴포넌트 등장! */}
            {isChatOpen && <AiChatSection />}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Main;