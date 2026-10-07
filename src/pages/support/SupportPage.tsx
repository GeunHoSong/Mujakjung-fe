import React, {useState}from "react";


function SupportPage(){
    
     // 1. FAQ 아코디언 상태 (열린 항목의 인덱스 번호 저장)
     const [openFaqIndex, setOpFanIndex] = useState<number | null>(null);

    // 1.1 문의 상담 폼 상태
    const [inquiry , setInquiry ] = useState({title: "", content:"", email: ""});

    const faqList =[
        {q: "무작정 서비스는 어떤 서비스 인가요", a: "여행 일정 관리를 무작정 편하게 도와 주는 플래폼 입니다 "},
        {q: "회원 탈퇴는 어떻게 하나요?", a: "마이페이지 하단 에서 회원 탈퇴를 진행을 하실 수 있습니다 "},
        {q: "비밀 번호를 잊어 버렸어요", a: "로그인 화면에서 비밀 번호 찾기를 통해 재 설정 하실 수 있습니다  "},

    ];

    const toggleFaq =(index: number) =>{
        setOpFanIndex(openFaqIndex === index ? null : index);

        }
    const handleInquirySubmit= (e: React.FormEvent) => {
        e.preventDefault();
        console.log("문의 제출 데이터:" , inquiry);
        alert("1:1 문의가 접수가 되었습니다");
        setInquiry({title: "" , content:" ", email: ""});
    }

    return (
        <div>
            <h1>고객센터</h1>
            {/*  FAQ 섹션 */}
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
      {/*1:1 문의 폼 섹션*/}
      <section style={{marginTop: "40px"}}>
        <h2>1:1 문의 폼 섹션</h2>
        <form onSubmit={handleInquirySubmit}>
            <div style={{margin: "10px 0" }}>
                <label>이메일: </label>
                <input type="email" value={inquiry.email} onChange={(e)=> setInquiry({...inquiry, email: e.target.value})} required />
            </div>
            <div style={{margin: "10px 0"}}>
                <label>제목:</label>
                <input type="text" value={inquiry.title} onChange={(e)=> setInquiry({...inquiry, title:e.target.value})} required />
            </div>
            <div style={{margin:"10px 0"}}>
                <label>내용  :</label>
                <textarea value={inquiry.content} onChange={(e)=> setInquiry({...inquiry, content:e.target.value})} required></textarea>

            </div>
        </form>

      </section>

        </div>
    )

}
export default SupportPage;