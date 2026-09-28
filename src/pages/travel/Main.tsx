import React, { useState } from "react";
// Header / Footer import
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainBanner from "./MainBanner";

// Main 페이지
function Main() {
  const [prompt , setPrompt] = useState('');
  const [destination, setDestination] = useState('');
  const [loading , setLoading ] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const handleAiSearch =async (e: React.FormEvent) => {
    e.preventDefault();
    if(!prompt.trim){
      alert("AI 에게 현재 기분이나 여행 목적을 살짝 들려 주세요");
    }
    setLoading (true);

    setTimeout(() => {
      setAiResult({
        emition : "지친 마음 의 휴식과 힐링 필요",
        comforMessage: "요즘 많이 지치셨군요 파도 소리를 들으면서 아무 생각 없이 쉴수 있는 속초 바다를 추천해 드릴 께요 ",
        itinrary: [
          {day: 1, title: "오션뷰 카페에서 멍 때리기 & 바닷가 산책" , desc: "도착 하자마자 조용한 카페에서 따뜻한 차 한잔과 함께 파도 감상 "},
          {day: 2, title: "자연 속에서 힐링 산책로 걷기" , desc: "피톤치트 가득한 숲길을 걸으면서 머릿속에 복잡한 생각 비우기"}
        ]
      });
      setLoading(false)
    }, 1500);
  }
  return (
    <div>
      {/* 💡 1. 누락되었던 헤더 컴포넌트를 맨 위에 배치합니다. */}
      <Header />

      {/* 💡 2. 헤더(height: 70px)가 fixed 스타일이므로, 본문이 가려지지 않도록 패딩을 줍니다. */}
      <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 70px)" }}>
        <MainBanner />
        
        <div style={{maxWidth: "900px" , margin: "40px auto ", padding: "0 20px" }} >
          <div style={{background:"#fffff", padding: "30px",  borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border:"1px solid #eaeaea", }}>
            <h2 style={{fontSize:"24px", color:"#333" , marginBottom: "8px"}}>AI 감성 여행 플래너</h2>
            <p style={{ color:"#666", fontSize:" 14px", marginBottom:"20px"}}>어떤 기분이신가요 ? 혹은 어떤 여행 을 꿈꾸고 시나요 ??</p>
            <form onSubmit={handleAiSearch}>
              {/* 감정 입력 창*/}
              <div style={{ display: "flex", alignItems: "center", background: "#f8f9fa", border: "2px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px" }}>
                <span style={{fontSize: "10px"}}></span>
                <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="예: 요즘 너무 지쳐 서 조용한 곳에서 힐링 하고 싶어 ..." />
                
              </div>
              {/*목적지및 일정 요약 그리드*/}
              <div style={{display: "grid" , gridTemplateColumns: "2fr 1.5fr 1fr" ,gap: "12px", marginBottom:"20px" }}>
                <div style={{}}>

                </div>

              </div>
            </form>
          </div>
      
        </div>
      </main>

      {/* 💡 3. 화면 하단에 푸터를 배치합니다. */}
   
    </div>
  );
}

export default Main;