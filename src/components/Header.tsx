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
  const [isMenuOpne, setIsMenuOpne] = useState(false);

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
      <div style={{display: "flex" , alignContent: "center" , gap: "20px" , position: "relative" }}>
         {/*  [여기 추가] 햄버거 메뉴 버튼 */}
         <button onClick={()=> setIsMenuOpne(!isMenuOpne)} style={{background: "none",  fontSize: "22px" , cursor: "pointer", padding: "5px"}}>
         </button>
         {/* [여기 추가] 햄버거 메뉴 누르면 나오는 카테고리 목록 */}
          {isMenuOpne && (
            <div style={{ position: "absolute", top: "55px", left:"0 " , backgroundColor: "white", border:"1px solid #ccc", borderRadius:"8px", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" , width: "140px", zIndex: "1100", display: "flex" , flexDirection: "column", padding: "10px 0"
            }}>
            <Link to={/domestic} onClick={}>
            </Link>
            </div>
          )}



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
            <button>설정</button>
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