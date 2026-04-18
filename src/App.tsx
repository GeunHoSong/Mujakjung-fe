import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/travel/Main";
import Join from "./pages/member/Join";
import Login from "./pages/member/Login";
import Search from "./pages/travel/Search";
import TravelDetail from "./pages/travel/TravelDetail";
import AdminMain from "./pages/admin/AdminMain";
import Mypage from "./pages/member/MyPage";

import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      {/* 1. Header를 Routes 바깥 최상단에 배치하세요! 
          그래야 모든 페이지에서 헤더가 고정되어 나타납니다. */}
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/mypage" element={<Mypage/>} />
        <Route path="/travel/:id" element={<TravelDetail/>}/>
      </Routes>

      {/* 2. Footer도 Routes 바깥 하단에 두어 항상 보이게 합니다. */}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;