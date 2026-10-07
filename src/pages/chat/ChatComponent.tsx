import React, { useState } from 'react';

interface Message {
    sender: string;
    text: string;
} 

function ChatComponent() {
  const [isAgentMode, setIsAgentMode] = useState(false); // 상담사 연결 여부
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: '안녕하세요 무작정 AI 여행 상담입니다 ✈️ 어떤 여행을 계획 중이신가요?' }
  ]); // 초기 메시지 설정
  const [inputValue, setInputValue] = useState(''); // 입력창 상태

  // 상담사 연결하기
  const handleConnectAgent = () => {
    setIsAgentMode(true);
    setMessages((prev) => [
      ...prev, 
      { sender: 'System', text: '상담사가 연결되었습니다. [담당: 하수정 상담사]' }
    ]);
  };

  // 상담 종료 및 AI 복귀
  const handleEndConsultation = () => {
    setIsAgentMode(false);
    setMessages((prev) => [
      ...prev, 
      { sender: 'System', text: '상담이 종료되었습니다. AI 상담으로 복귀합니다.' }
    ]);
  };

  // 메시지 전송 핸들러
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 사용자 메시지 추가
    const newMessages = [...messages, { sender: '사용자', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    // (참고) 나중에 여기에 AI 응답이나 웹소켓 전송 로직을 붙이면 됩니다!
  };

  return (
    <div className="chat-container" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      {/* 1. 상담사 연결 상태 표시 */}
      <div className="status-bar" style={{ marginBottom: '10px', fontWeight: 'bold', color: isAgentMode ? '#2b8a3e' : '#495057' }}>
        Status: {isAgentMode ? '[1:1 상담중 - Agent 하수정]' : '[AI 상담]'}
      </div>

      {/* 2. 상담창 본체 (메시지 렌더링 영역) */}
      <div className='chat-box' style={{ height: '350px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '8px 0' }}>
            <span style={{ color: msg.sender === '사용자' ? '#1971c2' : msg.sender === 'System' ? '#e03131' : '#2b8a3e', marginRight: '8px' }}>
              <strong>[{msg.sender}]</strong>
            </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 메시지 입력 폼 */}
      <form onSubmit={handleSendMessage} style={{ display: 'flex', marginTop: '10px', gap: '8px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isAgentMode ? "상담사에게 보낼 메시지를 입력하세요..." : "AI에게 물어볼 내용을 입력하세요..."}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>전송</button>
      </form>

      {/* 3. 제어 버튼 영역 */}
      <div className='control-panel' style={{ marginTop: '10px' }}>
        {!isAgentMode ? (
          <button onClick={handleConnectAgent} style={{ padding: '8px 16px', backgroundColor: '#40c057', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            상담사 연결 하기
          </button>
        ) : (
          <button onClick={handleEndConsultation} style={{ padding: '8px 16px', backgroundColor: '#fa5252', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            종료 및 AI 상담 연결
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatComponent;