import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Main from "./pages/travel/Main";
import Join from "./pages/member/Join";
import Login from "./pages/member/Login";
import Search from "./pages/travel/Search";
import TravelDetail from "./pages/travel/TravelDetail";
import AdminMain from "./pages/admin/AdminMain";
import Mypage from "./pages/mypage/MyPage";
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
import ChatComponent from "./pages/chat/ChatComponent";
import AdminCart from "./pages/admin/AdminCart";
import AdminSelect from "./pages/admin/AdminSelect";
import AdminRemainingSeats from "./pages/admin/AdminRemainingSeats";
import ResrvationLocalStorage from "./pages/reservation/ResrvationLocalStorage";
import ReservationList from "./pages/reservation/ReservationList";
import ReservationOrder from "./pages/reservation/ReservationOrder";
import GoogleCallback from "./pages/member/GoogleCallback";
import SupportPage from "./pages/support/SupportPage";

// 마이페이지 관련 컴포넌트들
import MyPageEditProfile from "./pages/mypage/MyPageEditProFile";
import MyPageBoard from "./pages/mypage/MyPageBoard";
import MyPageTravel from "./pages/mypage/MyPageTravel";
import MyPageBookmark from "./pages/mypage/MyPageBookmark";

// 여행 관련
import TravelSave from "./pages/travel/TravelSave";
import ReservationCreate from "./pages/reservation/ReservationCreate";

interface ItineraryItem {
  place?: string;
  latitude?: number | null;
  longitude?: number | null;
}

interface RecommendationResponse {
  title?: string;
  summary?: string;
  itinerary?: ItineraryItem[];
}

function App() {
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResponse | null>(null);

  return (
    <BrowserRouter>
      <Header />

      <div style={{ paddingTop: "70px" }}>
        <Routes>
          {/* Main 컴포넌트에 props 에러가 나지 않도록 임시로 제거하거나 필요시 Main 쪽 타입을 맞춰주세요 */}
          <Route path="/" element={<Main onRecommendationReceived={setRecommendationResult} />} />         
           <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminMain />} />
          
          {/* 마이페이지 및 하위 경로 */}
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/edit" element={<MyPageEditProfile />} />
          <Route path="/mypage/board" element={<MyPageBoard />} />
          <Route path="/mypage/travel" element={<MyPageTravel />} />
          <Route path="/mypage/bookmark" element={<MyPageBookmark />} />

          <Route path="/travel/:id" element={<TravelDetail />} />
          <Route path="/travel/TravelSave" element={<TravelSave />} />

          <Route path="/admin/members" element={<AdminMainMember />} />
          <Route path="/admin/cart" element={<AdminCart />} />
          <Route path="/admin/list" element={<AdminList />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/login/oauth2/code/naver" element={<NaverCallback />} />
          <Route path="/login/oauth2/code/kakao" element={<KakaoCallback />} />
          <Route path="/board/save" element={<BoardSave />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/notice/save" element={<NoticeSave />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/board/update/:id" element={<BoardUpdate />} />
          <Route path="/notice/list" element={<NoticeList />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/notice/update/:id" element={<NoticeUpdate />} />
          <Route path="/chat/ChatComponent" element={<ChatComponent />} />
          
          {/* 예약 관련 경로들 */}
          <Route path="/reservation/ReservationCreate" element={<ReservationCreate />} />
          <Route path="/reservation/ReservationList" element={<ReservationList />} />         
          <Route path="/reservation/ReservationOrder" element={<ReservationOrder />} />
          <Route path="/reservation/ReservationLocalStorage" element={<ResrvationLocalStorage />} />
          
          <Route path="/admin/AdminSelect" element={<AdminSelect />} />
          <Route path="/admin/AdminRemainingSeats" element={<AdminRemainingSeats />} />
          <Route path="/login/oauth2/code/google" element={<GoogleCallback />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;