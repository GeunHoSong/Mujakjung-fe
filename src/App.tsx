// ⭕ src/App.tsx 는 이 코드가 들어가야 해!
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

// ⭕ src/App.tsx 의 return 부분 수정하기
function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* 💡 감싸는 박스의 복잡한 스타일을 걷어내고, 순수하게 상단 헤더 높이(70px)만큼만 패딩을 줍니다. */}
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/travel/:id" element={<TravelDetail />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;