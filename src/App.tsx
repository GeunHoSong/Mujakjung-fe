
// react-router-dom에서 필요한 기능들을 import
// BrowserRouter : 전체 앱에서 라우팅 기능을 활성화
// Routes : 여러 Route를 묶어주는 컨테이너
// Route : URL 경로에 따라 어떤 컴포넌트를 보여줄지 설정
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 각 페이지 컴포넌트 import
// Main : 메인 페이지
// Join : 회원가입 페이지
// Login : 로그인 페이지
import Main from "./pages/Main";
import Join from "./pages/Join";
import Login from "./pages/Login";

function App() {
  return (

    // BrowserRouter
    // React 앱에서 URL을 기반으로 페이지를 이동할 수 있게 해주는 라우터
    // 보통 App 전체를 감싸서 사용
    <BrowserRouter>

      {/* Routes
          여러 Route들을 감싸는 컨테이너
          내부에서 URL 경로에 맞는 Route 하나만 렌더링됨
      */}
      <Routes>

        {/* 
          Route
          path : URL 주소
          element : 해당 주소로 들어왔을 때 보여줄 컴포넌트
        */}

        {/* "/" -> 사이트 첫 화면 (메인 페이지) */}
        <Route path="/" element={<Main />} />

        {/* "/join" -> 회원가입 페이지 */}
        <Route path="/join" element={<Join />} />

        {/* "/login" -> 로그인 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/seach" element={<search/>}/>

      </Routes>

    </BrowserRouter>
  );
}

// 다른 파일에서 사용할 수 있도록 App 컴포넌트 export
export default App;