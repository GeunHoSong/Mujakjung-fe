import { useState } from "react";

function Chat() {
  // 1. 상태 관리
  const [message, setMessage] = useState(""); // 현재 입력 중인 메시지
  const [isAgentMode, setIsAgentMode] = useState(false); // 상담사 연결 여부 (true: 상담사, false: AI)
  const [messages, setMessages] = useState<string[]>([
    "안녕하세요 무작정 AI 여행 상담입니다 ✈️",
    "어떤 여행을 계획 중이신가요?"
  ]); // 채팅창에 보여질 메시지 리스트

  // 2. 메시지 전송 로직
  const sendMessage = () => {
    if (!message.trim()) return; // 빈 메시지 방지

    // 사용자의 메시지를 리스트에 추가
    setMessages((prev) => [...prev, `🙋 ${message}`]);

    // AI 모드일 때만 자동 응답 실행
    if (!isAgentMode) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          "🤖 여행지를 추천해 드릴게요. 예산과 여행 기간을 알려주세요."
        ]);
      }, 500);
    }
    setMessage(""); // 입력창 초기화
  };

  // 3. 상담 모드 토글 (연결/종료) 로직
  const toggleAgentMode = () => {
    if (!isAgentMode) {
      // 상담사 연결 시
      setIsAgentMode(true);
      setMessages((prev) => [...prev, "시스템: 상담사가 연결되었습니다."]);
    } else {
      // 상담 종료 및 AI 복귀 시
      setIsAgentMode(false);
      setMessages((prev) => [...prev, "시스템: AI 상담으로 돌아갑니다."]);
    }
  };

  return (
    <div style={{ marginTop: "100px", padding: "20px" }}>
      {/* 4. 상태 표시줄: 현재 연결 상태를 시각적으로 보여줌 */}
      <div style={{ fontWeight: 'bold', color: isAgentMode ? 'blue' : 'gray', marginBottom: '10px' }}>
        Status: {isAgentMode ? "[1:1 상담중 - 하수정]" : "[AI 상담중]"}
      </div>

      <h2>✈️ 무작정 AI 여행 상담</h2>

      {/* 5. 채팅창 본체 */}
      <div style={{ marginBottom: "20px", height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {msg}
          </div>
        ))}
      </div>

      {/* 6. 입력창 및 전송 버튼 */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage}>전송</button>
      </div>

      {/* 7. 상담사 전환 버튼: 상태에 따라 색상과 텍스트 변경 */}
      <button 
        onClick={toggleAgentMode} 
        style={{ backgroundColor: isAgentMode ? '#ffcccb' : '#ccffcc' }}
      >
        {isAgentMode ? "종료 및 AI 전환" : "상담사 연결하기"}
      </button>
    </div>
  );
}

export default Chat;