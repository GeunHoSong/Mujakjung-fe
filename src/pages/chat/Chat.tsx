import { useState } from "react";

function Chat() {
  // ==========================================
  // 1. 상태(State) 관리 영역
  // ==========================================
  const [message, setMessage] = useState("");          // 사용자가 입력창에 적고 있는 현재 텍스트
  const [isAgentMode, setIsAgentMode] = useState(false); // 상담사 모드 여부 (false: AI 상담, true: 1:1 상담사)
  const [messages, setMessages] = useState([             // 채팅창에 누적될 대화 기록 리스트
    "안녕하세요 무작정 AI 여행 상담입니다",
    "어떤 여행을 계획 중 이신가요?"
  ]);

  // ==========================================
  // 2. 메시지 전송 및 백엔드 연동 로직
  // ==========================================
  const sendMessage = async () => {
    // 빈 메시지나 공백만 있는 경우 전송 방지
    if (!message.trim()) return; 

    const userMsg = message;

    // ① 사용자가 입력한 메시지를 화면에 먼저 추가하고, 입력창 초기화
    setMessages((prev) => [...prev, `🙋 ${userMsg}`]);
    setMessage("");

    // ② 상담사 모드인지 AI 모드인지 분기 처리
    if (isAgentMode) {
      // [1:1 상담사 모드] - 추후 상담사 백엔드 API와 연동될 자리 (현재는 가짜 딜레이 응답)
      setTimeout(() => {
        setMessages((prev) => [...prev, "상담사: 문의 내용을 확인 하고 있습니다"]);
      }, 500);
    } else {
      // [AI 모드] - 스프링 부트 백엔드(/api/chat)로 POST 요청 전송
      try {
        const response = await fetch("http://localhost:8080/api/chat", {
          method: "POST", // HTTP 메서드 설정
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 데이터 전송 명시
          },
          body: JSON.stringify({ content: userMsg }), // 백엔드 ChatRequestDto의 필드명인 'content'에 매칭
        });
        
        // 서버 응답이 정상적이지 않을 경우 에러 처리
        if (!response.ok) {
          throw new Error("서버 통신 실패");
        }
        
        const data = await response.json();

        // ③ 백엔드의 응답 객체(analysisResult)에서 AI 텍스트를 꺼내 화면에 추가
        setMessages((prev) => [...prev, `🤖 ${data.analysisResult}`]);

      } catch (error) {
        console.log("통신 에러", error);
        setMessages((prev) => [...prev, "시스템: 스프링 부트 서버와 연결 하지 못했습니다"]);
      }
    }
  }; 

  // ==========================================
  // 3. 상담 모드 전환 (AI ↔ 상담사) 로직
  // ==========================================
  const toggleAgentMode = () => {
    if (!isAgentMode) {
      setIsAgentMode(true);
      setMessages((prev) => [...prev, "시스템: 1:1 상담사 연결로 전환되었습니다."]);
    } else {
      setIsAgentMode(false);
      setMessages((prev) => [...prev, "시스템: AI 여행 상담으로 돌아갑니다."]);
    }
  };  

  // ==========================================
  // 4. 컴포넌트 렌더링 (UI 레이아웃)
  // ==========================================
  return (
    <div style={{ marginTop: "100px", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      
      {/* 상태 표시줄: 현재 AI 상담 중인지 상담사 연결 중인지 시각적으로 표시 */}
      <div style={{ fontWeight: 'bold', color: isAgentMode ? 'blue' : 'gray', marginBottom: '10px' }}>
        Status: {isAgentMode ? "[1:1 상담중]" : "[AI 상담중]"}
      </div>

      <h2>무작정 AI 여행 상담</h2>

      {/* 채팅창 본체: 대화 내역이 길어지면 스크롤이 생기도록 구현 */}
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

      {/* 입력창 및 전송 버튼 영역 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input 
          style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // 엔터키를 눌러도 전송되도록 처리
          placeholder="메시지를 입력하세요"
        />
        <button 
          onClick={sendMessage}
          style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "4px" }}
        >
          전송
        </button>
      </div>

      {/* 상담사 전환 버튼: 모드에 따라 배경색과 문구가 동적으로 변경 */}
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