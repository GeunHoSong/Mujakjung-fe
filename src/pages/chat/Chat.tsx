import { useState } from "react";

function Chat() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<string[]>([
    "안녕하세요 무작정 AI 여행 상담입니다 ✈️",
    "어떤 여행을 계획 중이신가요?"
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, `🙋 ${message}`]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        "🤖 여행지를 추천해 드릴게요. 예산과 여행 기간을 알려주세요."
      ]);
    }, 500);

    setMessage("");
  };

  return (
    <div style={{ marginTop: "100px", padding: "20px" }}>
      <h2>✈️ 무작정 AI 여행 상담</h2>

      <div style={{ marginBottom: "20px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {msg}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />

        <button onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;