// Header / Footer import
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainBanner from "./MainBanner";

// Main 페이지
function Main() {

  return (

    <div>

      {/* 메인 콘텐츠 */}

      <main>
        <MainBanner/>

        <h2>AI 여행 추천 서비스</h2>
        <p>여행지를 검색해보세요.</p>

      </main>

    </div>

  );

}

export default Main;