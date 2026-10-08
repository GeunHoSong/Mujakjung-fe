import React, { useState } from "react";

function SupportPage() {
    // 1. FAQ 아코디언 상태 (열린 항목의 인덱스 번호 저장)
    const [openFaqIndex, setOpFanIndex] = useState<number | null>(null);

    // 1.1 문의 상담 폼 상태
    const [inquiry, setInquiry] = useState({ title: "", content: "", email: "" });

    const faqList = [
        { q: "무작정 서비스는 어떤 서비스 인가요", a: "여행 일정 관리를 무작정 편하게 도와 주는 플래폼 입니다 " },
        { q: "회원 탈퇴는 어떻게 하나요?", a: "마이페이지 하단 에서 회원 탈퇴를 진행을 하실 수 있습니다 " },
        { q: "비밀 번호를 잊어 버렸어요", a: "로그인 화면에서 비밀 번호 찾기를 통해 재 설정 하실 수 있습니다  " },
    ];

    const toggleFaq = (index: number) => {
        setOpFanIndex(openFaqIndex === index ? null : index);
    };

    // 1:1 문의 제출 및 스프링 부트 백엔드 연동
    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // 스프링 부트 백엔드로 POST 요청 전송
            const response = await fetch("http://localhost:8080/api/inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inquiry),
            });

            if (response.ok) {
                const resultText = await response.text();
                console.log("서버 응답:", resultText);
                alert("1:1 문의가 성공적으로 접수되었습니다!");
                // 폼 초기화
                setInquiry({ title: "", content: "", email: "" });
            } else {
                alert("문의 접수에 실패했습니다. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.log("통신 에러 발생:", error);
            alert("서버와 연결할 수 없습니다.");
        }
    };

    return (
        <div>
            <h1>고객센터</h1>
            
            {/* FAQ 섹션 */}
            <section style={{ marginTop: "20px" }}>
                <h2>자주 묻는 질문 (FAQ)</h2>
                {faqList.map((item, index) => (
                    <div key={index} style={{ margin: "10px 0", borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
                        <div onClick={() => toggleFaq(index)} style={{ cursor: "pointer", fontWeight: "bold" }}>
                            Q. {item.q}
                        </div>
                        {openFaqIndex === index && (
                            <div style={{ marginTop: "5px", color: "#555" }}>
                                A. {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </section>   

            {/* 1:1 문의 폼 섹션 */}
            <section style={{ marginTop: "40px" }}>
                <h2>1:1 문의 폼 섹션</h2>
                <form onSubmit={handleInquirySubmit}>
                    <div style={{ margin: "10px 0" }}>
                        <label>이메일: </label>
                        <input 
                            type="email" 
                            value={inquiry.email} 
                            onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })} 
                            required 
                        />
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <label>제목:</label>
                        <input 
                            type="text" 
                            value={inquiry.title} 
                            onChange={(e) => setInquiry({ ...inquiry, title: e.target.value })} 
                            required 
                        />
                    </div>
                    <div style={{ margin: "10px 0" }}>
                        <label>내용:</label>
                        <textarea 
                            value={inquiry.content} 
                            onChange={(e) => setInquiry({ ...inquiry, content: e.target.value })} 
                            required
                        ></textarea>
                    </div>
                    {/* 버튼 텍스트 추가 및 제출 이벤트 연결 완료 */}
                    <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>문의하기</button>
                </form>
            </section>
        </div>
    );
}

export default SupportPage;