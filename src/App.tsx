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
      <Header />

      {/* 헤더 높이만큼 아래로 밀기 */}
      <div
        style={{
          paddingTop: "70px",
          minHeight: "100vh",
        }}
      >
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