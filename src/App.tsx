import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/travel/Main";
import Join from "./pages/member/Join";
import Login from "./pages/member/Login";
import Search from "./pages/travel/Search";
import TravelDetail from "./pages/travel/TravelDetail";
import AdminMain from "./pages/admin/AdminMain";
import Mypage from "./pages/member/MyPage";

// 1. Footer 임포트 추가! (경로가 src/components/Footer.tsx 라면)
import Footer from "./components/Footer"; 

function App() {
  return (
    <BrowserRouter>
      {/* Routes 바깥에 Footer를 두면 
          메인, 로그인, 회원가입 어디를 가든 지도가 항상 밑에 따라다녀! 
      */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/mypage" element={<Mypage/>} />
      </Routes>

      {/* 2. 여기에 Footer 추가! */}
      <Footer/>

    </BrowserRouter>
  );
}

export default App;