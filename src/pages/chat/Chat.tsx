import { useState } from "react";

function Chat (){
  const [message, setMessage] = useState("");
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [messages, setMessages] = useState([
    "안녕하세요 무작정 AI 여행 상담입니다",
    "어떤 여행을 계획 중 이신가요?"
  ]);

  // 메시지 전송 및 백엔드 연동 로직
  const sendMessage = async () => {
    if (!message.trim()) return; // 1. 괄호 추가

    const userMsg = message;

    setMessages((prev) => [...prev, `🙋 ${userMsg}`]);
    setMessage("");

    // 상담사 모드 일때와 AI 모드 일때 분기 처리 
    if (isAgentMode) {
      // 1:1 상담사 모드 
      setTimeout(() => {
        setMessages((prev) => [...prev, "상담사: 문의 내용을 확인 하고 있습니다"]);
      }, 500);
    } else {
      // AI 모드: 스프링 부트 백엔드(/api/chat)로 POST 요청
      try {
        const response = await fetch("http://localhost:8080/api/chat", {
          method: "POST", // method 지정 추가
          headers: {
            "Content-Type": "application/json", // 2. 올바른 헤더명으로 수정
          },
          body: JSON.stringify({ content: userMsg }),
        });
        
        if (!response.ok) {
          throw new Error("서버 통신 실패");
        }
        
        const data = await response.json();

        // 백엔드 응답(analysisResult)을 화면에 추가
        setMessages((prev) => [...prev, `🤖 ${data.analysisResult}`]);
      } catch (error) {
        console.log("통신 에러", error);
        setMessages((prev) => [...prev, "시스템: 스프링 부트 서버와 연결 하지 못했습니다"]);
      }
    }
  }; // 3. sendMessage 함수 여기서 깔끔하게 닫기

  // 4. 함수명 오탈자 수정 (toggleAgentModle ➔ toggleAgentMode)
  const toggleAgentMode = () => {
    if (!isAgentMode) {
      setIsAgentMode(true);
      setMessages((prev) => [...prev, "시스템: 1:1 상담사 연결로 전환되었습니다."]);
    } else {
      setIsAgentMode(false);
      setMessages((prev) => [...prev, "시스템: AI 여행 상담으로 돌아갑니다."]);
    }
  };  

  return (
    <div style={{ marginTop: "100px", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      
      {/* 상태 표시줄 */}
      <div style={{ fontWeight: 'bold', color: isAgentMode ? 'blue' : 'gray', marginBottom: '10px' }}>
        Status: {isAgentMode ? "[1:1 상담중]" : "[AI 상담중]"}
      </div>

      <h2>✈️ 무작정 AI 여행 상담</h2>

      {/* 채팅창 화면 */}
      <div style={{ 
        marginBottom: "20px", 
        height: "300px", 
        overflowY: "auto", 
        border: "1px solid #ccc", 
        padding: "10px", 
        borderRadius: "8px" 
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}>
            {msg}
          </div>
        ))}
      </div>

      {/* 입력창과 전송 버튼 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input 
          style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // 엔터키로 전송
          placeholder="메시지를 입력하세요"
        />
        <button 
          onClick={sendMessage}
          style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "4px" }}
        >
          전송
        </button>
      </div>

      {/* 상담사 전환 버튼 (5. 올바른 함수명 toggleAgentMode 연결) */}
      <button 
        onClick={toggleAgentMode} 
        style={{ 
          width: "100%", 
          padding: "12px", 
          backgroundColor: isAgentMode ? '#ffcccb' : '#ccffcc', 
          border: "none", 
          borderRadius: "4px", 
          cursor: "pointer", 
          fontWeight: "bold" 
        }}
      >
        {isAgentMode ? "종료 및 AI 전환" : "상담사 연결하기"}
      </button>
    </div>
  );
}

export default Chat;