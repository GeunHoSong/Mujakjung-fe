import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg";

function Header() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("domestic");

  // 토큰 및 사용자 정보 가져오기
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const logout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/");
    window.location.reload();
  };

  return (
    <header style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", height: "70px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 20px", borderBottom: "1px solid #ccc", backgroundColor: "white",
      zIndex: 1000, boxSizing: "border-box", overflow: "hidden" 
    }}>
      {/* 왼쪽: 로고 및 메뉴 */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/">
          <img src={logo} alt="로고" width="50" style={{ borderRadius: "50%" }} />
        </Link>
        <h1 style={{ margin: 0, fontSize: "1.2rem", whiteSpace: "nowrap" }}>AI 여행</h1>
        
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link to="/chat" style={{ textDecoration: "none", color: "#333" }}>상담</Link>
          <Link to="/notice/list" style={{ textDecoration: "none", color: "#333" }}>공지</Link>
          <Link to="/board/list" style={{ textDecoration: "none", color: "#333" }}>게시판</Link>
        </nav>

        {/* 검색창 */}
        <div style={{ display: "flex", gap: "5px" }}>
          <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색" style={{ padding: "5px" }} />
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: "5px" }}>
            <option value="all">모두</option>
            <option value="domestic">국내</option>
            <option value="overseas">해외</option>
          </select>
          <button onClick={() => navigate(`/search?keyword=${keyword}&type=${type}`)}>검색</button>
        </div>
      </div>

      {/* 오른쪽: 인증 버튼 */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {token ? (
          <>
            <span><strong>{userName || "사용자"}</strong>님</span>
            {userRole?.toUpperCase() === "ADMIN" && (
              <button onClick={() => navigate("/admin")} style={{ backgroundColor: "#FFD700" }}>관리자</button>
            )}
            <button onClick={() => navigate("/mypage")}>마이페이지</button>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/join")}>회원가입</button>
            <button onClick={() => navigate("/login")}>로그인</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;