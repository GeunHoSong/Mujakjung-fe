import React from "react";
// Header / Footer import
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainBanner from "./MainBanner";

// Main 페이지
function Main() {
  return (
    <div>
      {/* 💡 1. 누락되었던 헤더 컴포넌트를 맨 위에 배치합니다. */}
      <Header />

      {/* 💡 2. 헤더(height: 70px)가 fixed 스타일이므로, 본문이 가려지지 않도록 패딩을 줍니다. */}
      <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 70px)" }}>
        <MainBanner />
        
        <div style={{ padding: "20px" }}>
          <h2>AI 여행 추천 서비스</h2>
          <p>여행지를 검색해보세요.</p>
        </div>
      </main>

      {/* 💡 3. 화면 하단에 푸터를 배치합니다. */}
      <Footer />
    </div>
  );
}

export default Main;