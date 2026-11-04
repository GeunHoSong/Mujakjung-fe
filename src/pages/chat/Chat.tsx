import { useState } from "react";
import "./Chat.css";

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
  const toggleAgentMode = async () => {
  if (!isAgentMode) {
    try {
      // 1. Spring Boot에 상담방 생성 요청
      const response = await fetch("http://localhost:8080/api/chat/room", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });

      // 2. 서버 응답이 실패하면 오류 발생
      if (!response.ok) {
        throw new Error("상담방 생성 실패");
      }

      // 3. 서버 응답 받기
      const result = await response.text();
      console.log(result);

      // 4. 상담사 연결 대기 상태로 변경
      setIsAgentMode(true);

      // 5. 시스템 메시지 추가
      setMessages((prev) => [
        ...prev,
        "시스템: 상담방이 생성되었습니다. 상담사 연결을 기다리고 있습니다."
      ]);

    } catch (error) {
      console.error("상담방 생성 오류:", error);
      alert("상담방 생성에 실패했습니다.");
    }

  } else {
    // AI 상담 모드로 복귀
    setIsAgentMode(false);

    setMessages((prev) => [
      ...prev,
      "시스템: AI 여행 상담으로 돌아갑니다."
    ]);
  }
};

  // ==========================================
  // 4. 컴포넌트 렌더링 (UI 레이아웃)
  // ==========================================
  return (
    <div className="chat-container">
      <div className="chat-card">
        {/* 상태 표시줄: 현재 AI 상담 중인지 상담사 연결 중인지 시각적으로 표시 */}
       <div className={`chat-status ${isAgentMode ? "agent" : "ai"}`}>Status: {isAgentMode ? "[상담사 연결 대기 중]" : "[AI 상담중]"}</div>

        <h2>무작정 AI 여행 상담</h2>

        {/* 채팅창 본체: 대화 내역이 길어지면 스크롤이 생기도록 구현 */}
        <div className="chat-message-box">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
             {msg}
            </div>
         ))}
        </div>

        {/* 입력창 및 전송 버튼 영역 */}
        <div className="chat-input-row">
          <input className="chat-input" value={message} onChange={(e) => setMessage(e.target.value)}onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // 엔터키를 눌러도 전송되도록 처리
          placeholder="메시지를 입력하세요"/>
          <button  className="chat-send-button" onClick={sendMessage}>전송</button>
        </div>

        {/* 상담사 전환 버튼: 모드에 따라 배경색과 문구가 동적으로 변경 */}
        {/* 상담사 전환 버튼 */}
        <button onClick={toggleAgentMode}className={`chat-agent-button ${isAgentMode ? "agent" : "ai"}`}>
          {isAgentMode ? "종료 및 AI 전환" : "상담사 연결하기"}
        </button>
      </div>
    </div>
  );
}

export default Chat;