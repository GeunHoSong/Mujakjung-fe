import React, { useState } from "react";
// Header / Footer import
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainBanner from "./MainBanner";

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

// Main 페이지
function Main() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // 1. 상태 변수 이름을 소문자 messages로 통일
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "요즘 많이 지치셨나요? 마음속 이야기를 편하게 들려주시면 딱 맞는 힐링 여행지와 일정을 함께 찾아드릴게요. 🌊" }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    
    // 2. 유저가 보낸 메시지는 sender를 'user'로 지정해야 우측에 정렬됩니다.
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // FastAPI 백엔드로 요청 전송
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: userMessage })
      });
      const data = await response.json();
      
      // 3. 백엔드 응답 필드명 오타 수정 (analysis_result)
      setMessages((prev) => [...prev, { sender: 'ai', text: data.analysis_result }]);

    } catch (error) {
      console.log("통신 에러", error);
      setMessages((prev) => [...prev, { sender: 'ai', text: "서버와 연결하지 못했어요. FastAPI 서버가 켜져 있는지 확인해 주세요!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 💡 헤더 컴포넌트 */}
      <Header />

      {/* 본문 영역 */}
      <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 70px)", background: "#f8f9fa" }}>
        <MainBanner />
        
        <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
          
          {/* AI 비서 토글 버튼 영역 */}
          <div style={{ background: "#ffffff", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #eaeaea", textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "8px" }}>무작정 개인 AI 여행 비서</h2>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>마음이 지칠 때, 언제든 나만의 AI 비서와 대화를 시작해보세요.</p>
            
            <button 
              onClick={() => setIsChatOpen(!isChatOpen)} 
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "white", border: "none", padding: "14px 28px", fontSize: "16px", fontWeight: "bold", borderRadius: "12px", cursor: "pointer", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
            >
              {isChatOpen ? "💬 AI 대화창 닫기" : " AI 비서와 대화 시작하기"}
            </button>
          </div>

          {/* 버튼을 누르면 열리는 인라인 대화형 채팅 창 */}
          {isChatOpen && (
            <div style={{ marginTop: "24px", background: "#ffffff", borderRadius: "20px", border: "1px solid #eaeaea", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", overflow: "hidden", display: "flex", flexDirection: "column", height: "550px" }}>
              
              {/* 채팅창 헤더 */}
              <div style={{ background: "#1d4ed8", color: "white", padding: "16px 20px", fontWeight: "bold", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🤖</span> 무작정 AI 감성 가이드와 대화 중
              </div>

              {/* 대화 말풍선 리스트 영역 */}
              <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px", background: "#f8f9fa" }}>
                {/* 4. 타입스크립트 에러 방지를 위해 msg: Message 명시 */}
                {messages.map((msg: Message, idx: number) => (
                  <div key={idx} style={{ display: "flex", justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      maxWidth: "75%", 
                      padding: "14px 18px", 
                      borderRadius: "16px", 
                      fontSize: "14px", 
                      lineHeight: "1.5",
                      whiteSpace: "pre-line",
                      background: msg.sender === 'user' ? "#2563eb" : "#ffffff",
                      color: msg.sender === 'user' ? "#ffffff" : "#1f2937",
                      border: msg.sender === 'ai' ? "1px solid #e5e7ed" : "none",
                      boxShadow: msg.sender === 'ai' ? "0 2px 5px rgba(0,0,0,0.02)" : "none"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "16px", fontSize: "14px", color: "#888", border: "1px solid #e5e7ed" }}>
                      고민을 깊이 읽고 답변을 정리하는 중이에요... ✍️
                    </div>
                  </div>
                )}
              </div>

              {/* 메시지 입력폼 영역 */}
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
                  style={{ background: "#2563eb", color: "white", border: "none", padding: "0 20px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}
                >
                  보내기
                </button>
              </form>

            </div>
          )}

        </div>
      </main>

      {/* 푸터 컴포넌트 */}
      <Footer />
    </div>
  );
}

export default Main;