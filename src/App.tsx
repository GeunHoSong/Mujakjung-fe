// ⭕ src/App.tsx 는 이 코드가 들어가야 해!
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/travel/Main";
import Join from "./pages/member/Join";
import Login from "./pages/member/Login";
import Search from "./pages/travel/Search";
import TravelDetail from "./pages/travel/TravelDetail";
import AdminMain from "./pages/admin/AdminMain";
import Mypage from "./pages/member/MyPage";
import AdminMainMember from "./pages/admin/AdminMember";

import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminList from "./pages/admin/AdminList";
import AdminUpdate from "./pages/admin/AdminUpdate";
import BoardList from "./pages/board/BoardList";
import NaverCallback from "./pages/member/NaverCallback";
import KakaoCallback from "./pages/member/KakaoCallback";
import BoardSave from "./pages/board/BoardSave";
import Chat from "./pages/chat/Chat";
import NoticeSave from "./pages/notice/NoticeSave";
import BoardDetail from "./pages/board/BoardDetail"; 
import BoardUpdate from "./pages/board/BoardUpdate";
import NoticeList from "./pages/notice/NoticeList";
import NoticeUpdate from "./pages/notice/NoticeUpdate";
import NoticeDetail from "./pages/notice/NoticeDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/*감싸는 박스의 복잡한 스타일을 걷어내고, 순수하게 상단 헤더 높이(70px)만큼만 패딩을 줍니다. */}
      <div style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/travel/:id" element={<TravelDetail />} />
          <Route path="/admin/members" element={<AdminMainMember/>} />
          <Route path="/admin/list" element={<AdminList/>} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/login/oauth2/code/naver" element={<NaverCallback/>}/>
          <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
          <Route path="/board/save" element={<BoardSave/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/notice/save" element={<NoticeSave/>}/>
          <Route path="/board/:id" element={<BoardDetail/>}/>
          <Route path="/board/update/:id" element={<BoardUpdate/>}/>
          <Route path="/notice/list" element={<NoticeList />} />
          <Route path="/notice/:id" element={<NoticeDetail/>}/>
          <Route path="/notice/update/:id" element={<NoticeUpdate/>}/>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;