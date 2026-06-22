import React, { useState } from 'react';
interface Message {
    sender: string;
    text: string;
} 

function ChatComponent() {
  const [isAgentMode, setIsAgentMode] = useState(false); // 상담사 연결 여부
  const [messages, setMessages] = useState<Message[]>([]); // 메시지 리스트

  const handleConnectAgent = () => {
    // 여기에 소켓 연결 로직 추가 예정
    setIsAgentMode(true);
    setMessages([...messages, { sender: 'System', text: '상담사가 연결되었습니다.' }]);
  };
  const handleEndConsultation =()=> {
    setIsAgentMode(false);
    setMessages([...messages , {sender: 'System', text: '상담이 종료가 되었습니다  AI 상담으로 복귀 합니다'}]);
  };
    return (
        <div className="chat-container">
            {/*상담사 연결 상태 표사*/}
            <div className="status-bar">
                Status: {isAgentMode?  '[`1:1 상담중 -Agent 하수정 ]' :'[AI 상담]'}
            </div>
             {/* 2. 상담창 본체 (메시지 렌더링 영역) */}
            <div className='chat-box' style={{height: '300px', border: '1px solid #ddd'}}>
                {messages.map((msg, index)=>
                <div key={index} style={{margin: '5px 0'}} >
                    <strong>{msg.sender}</strong>
                </div>
                )}
            </div>
            {/*3. 버튼 영역  */}
            <div className='control-panel' style={{marginTop: '10px '}}>
                {!isAgentMode ?(
                    <button onClick={handleConnectAgent}>상담사 연결 하기 </button>
                    ):(
                     <button onClick={handleEndConsultation}>종료밎 AI 상담 연결</button>
                )}

            </div>
          
        </div>
    )
}

export default ChatComponent;