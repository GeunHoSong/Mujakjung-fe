// Header.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg";

function Header() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("domestic");

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
    <header style={{ position: "fixed",top: 0,left: 0,width: "100%",height: "70px",display: "flex",justifyContent: "space-between",alignItems: "center",padding: "0 20px",
      borderBottom: "1px solid #ccc",  backgroundColor: "white",zIndex: 10000,boxSizing: "border-box",overflow: "hidden",}}>
      {/* 왼쪽 영역 */}
      <div style={{ display: "flex",alignItems: "center",gap: "20px",}}>
        {/* 로고 */}
        <Link to="/">
        <img src={logo} alt="로고" width="60" style={{borderRadius: "50%",}}/>
        </Link>

        {/* 제목 */}
        <h1 style={{margin: 0,fontSize: "1.5rem",whiteSpace: "nowrap",}}>
          AI 여행 사이트
        </h1>
        {/* 👈 여기서부터 추가한 메뉴 */}
        <div style={{display:"flex", gap:"10px", marginLeft: "10px", whiteSpace: "nowrap"}}>
          <Link to="/chat" style={{textDecoration: "none", color: "#333", fontWeight: "bold"}}>AI 여행 상담 </Link>
          <Link to="/notice/list" style={{textDecoration: "none", color: "#333", fontWeight: "bold"}}>공지 사항</Link>
          <Link to="/board/list" style={{textDecoration: "none", color: "#333", fontWeight: "bold"}}>게시판</Link>
        </div>


        {/* 검색 */}
        <div
          style={{
            display: "flex",
            gap: "5px",
          }}
        >
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색어 입력"
            style={{
              padding: "7px",
              width: "220px",
            }}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              padding: "7px",
            }}
          >
            <option value="domestic">국내</option>
            <option value="overseas">해외</option>
          </select>

          <button
            onClick={() =>
              navigate(`/search?keyword=${keyword}&type=${type}`)
            }
          >
            검색
          </button>
        </div>
      </div>

      {/* 오른쪽 버튼 영역 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          minWidth: "max-content",
        }}
      >
        {token ? (
          <>
            <span>
              <strong>{userName || "송근호"}</strong>님
            </span>

            {userRole?.toUpperCase() === "ADMIN" && (
              <button
                onClick={() => navigate("/admin")}
                style={{
                  backgroundColor: "#FFD700",
                }}
              >
                관리자
              </button>
            )}

            <button onClick={() => navigate("/mypage")}>
              마이페이지
            </button>

            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/join")}
              style={{
                padding: "5px 15px",
              }}
            >
              회원 가입
            </button>

            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "5px 15px",
              }}
            >
              로그인
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;