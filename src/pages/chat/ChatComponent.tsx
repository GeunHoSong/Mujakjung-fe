import React, { useState } from 'react';

// 메시지 데이터의 구조(인터페이스) 정의
interface Message {
    sender: string; // 메시지를 보낸 사람 (사용자, AI, System, 하수정 등)
    text: string;   // 메시지 내용
} 

function ChatComponent() {
  // 1. 상태(State) 관리
  const [isAgentMode, setIsAgentMode] = useState(false); // 현재 1:1 상담사 연결 상태인지 여부 (false: AI 상담, true: 상담사 1:1 상담)
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI', text: '안녕하세요 무작정 AI 여행 상담입니다 ✈️ 어떤 여행을 계획 중이신가요?' }
  ]); // 채팅방에 표시될 전체 메시지 목록 (초기값으로 AI 인사말 세팅)
  const [inputValue, setInputValue] = useState(''); // 사용자가 입력창에 타이핑 중인 텍스트 상태

  // 2. 상담사 연결 버튼 핸들러
  const handleConnectAgent = () => {
    setIsAgentMode(true); // 모드를 1:1 상담 모드로 전환
    setMessages((prev) => [
      ...prev, 
      { sender: 'System', text: '상담사가 연결되었습니다. [담당: 하수정 상담사]' } // 시스템 안내 메시지 추가
    ]);
  };

  // 3. 상담 종료 및 AI 복귀 버튼 핸들러
  const handleEndConsultation = () => {
    setIsAgentMode(false); // 모드를 다시 AI 상담 모드로 전환
    setMessages((prev) => [
      ...prev, 
      { sender: 'System', text: '상담이 종료되었습니다. AI 상담으로 복귀합니다.' } // 시스템 안내 메시지 추가
    ]);
  };

  // 4. 메시지 전송 핸들러 (사용자가 입력창에 텍스트를 입력하고 전송할 때 실행)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    if (!inputValue.trim()) return; // 빈 공백만 입력된 경우 전송 차단

    // 기존 메시지 목록에 사용자 메시지 추가
    const newMessages = [...messages, { sender: '사용자', text: inputValue }];
    setMessages(newMessages);
    setInputValue(''); // 입력창 초기화

    // (참고) 추후 이 부분에 백엔드 API 호출, 웹소켓 전송, 또는 AI/상담사 응답 로직을 연결하면 됩니다!
  };

  return (
    <div className="chat-container" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
      
      {/* 5. 상담 상태 바: 현재 AI 상담 중인지 1:1 상담 중인지 시각적으로 표시 */}
      <div className="status-bar" style={{ marginBottom: '10px', fontWeight: 'bold', color: isAgentMode ? '#2b8a3e' : '#495057' }}>
        Status: {isAgentMode ? '[1:1 상담중 - Agent 하수정]' : '[AI 상담]'}
      </div>

      {/* 6. 채팅창 본체: 대화 내용이 스크롤되면서 렌더링되는 영역 */}
      <div className='chat-box' style={{ height: '350px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ margin: '8px 0' }}>
            {/* 발신자(사용자/시스템/AI/상담사)에 따라 글자 색상을 다르게 표현 */}
            <span style={{ color: msg.sender === '사용자' ? '#1971c2' : msg.sender === 'System' ? '#e03131' : '#2b8a3e', marginRight: '8px' }}>
              <strong>[{msg.sender}]</strong>
            </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 7. 메시지 입력 폼 */}
      <form onSubmit={handleSendMessage} style={{ display: 'flex', marginTop: '10px', gap: '8px' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 입력할 때마다 상태 업데이트
          placeholder={isAgentMode ? "상담사에게 보낼 메시지를 입력하세요..." : "AI에게 물어볼 내용을 입력하세요..."}
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>전송</button>
      </form>

      {/* 8. 제어 패널: AI 상담 모드와 1:1 상담 모드를 전환하는 버튼 영역 */}
      <div className='control-panel' style={{ marginTop: '10px' }}>
        {!isAgentMode ? (
          // AI 모드일 때 보이는 버튼 ('상담사 연결 하기')
          <button onClick={handleConnectAgent} style={{ padding: '8px 16px', backgroundColor: '#40c057', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            상담사 연결 하기
          </button>
        ) : (
          // 상담사 모드일 때 보이는 버튼 ('종료 및 AI 상담 연결')
          <button onClick={handleEndConsultation} style={{ padding: '8px 16px', backgroundColor: '#fa5252', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            종료 및 AI 상담 연결
          </button>
        )}
      </div>
      
    </div>
  );
}

export default ChatComponent;