
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/mujakjung_logo.png";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // 토큰 및 사용자 정보 가져오기
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("userName");

    // 로그아웃
    const logout = () => {
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="site-header">
            {/* 1. 왼쪽: 로고 및 서비스 이름 */}
              {/* 1. 왼쪽: 로고 및 서비스 이름 */}
            <div style={{ display: "flex",alignItems: "center",gap: "10px"}}>
                <Link to="/" style={{ display: "flex" }}>
                    <img src={logo}alt="무작정 로고"width="55"height="55"style={{objectFit: "contain"}}/>
                </Link>
                <Link to="/" style={{ textDecoration: "none",color: "#123D32",fontSize: "26px",fontWeight: "bold",whiteSpace: "nowrap"}}>무작정
                </Link>
            </div>
            
            {/* 3. 오른쪽: 사용자 인증 및 계정 메뉴 */}
            <div style={{display: "flex",alignItems: "center",gap: "10px"}}>
                <button type="button" onClick={()=> navigate("/chat")} style={aiButtonStyle}>
                    무무와 대화하기
                </button>
                <button type="button" onClick={()=> navigate("/board/list")} style={buttonStyle}>
                    커뮤니티
                </button>
                <nav id="header-account-menu"className={`header-account-menu ${menuOpen ? "open" : ""}`}aria-label="사용자 메뉴">
                {token ? (
                    <>
                        {/* 로그인 사용자 이름 */}
                        <span>
                            <strong>{userName || "사용자"}</strong>님
                        </span>

                        {/* 관리자 계정에만 표시 */}
                        {userRole?.toUpperCase() === "ADMIN" && (
                            <button
                                type="button"
                                onClick={() => navigate("/admin")}
                                style={buttonStyle}
                            >
                                관리자
                            </button>
                        )}

                        {/* 마이페이지 */}
                        <button type="button"onClick={() => navigate("/mypage")}style={buttonStyle}>
                            마이페이지
                        </button>

                        {/* 로그아웃 */}
                        <button type="button"onClick={logout}style={buttonStyle}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        {/* 회원가입 */}
                        <button type="button"onClick={() => navigate("/join")}style={buttonStyle}>
                            회원가입
                        </button>

                        {/* 로그인 */}
                        <button type="button"onClick={() => navigate("/login")}style={buttonStyle}>
                            로그인
                        </button>
                    </>
                )}
                </nav> 
                
                {/* 모바일 햄버거 메뉴 버튼 */}
                <button type="button"className="header-toggle"aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
                    aria-expanded={menuOpen}aria-controls="header-account-menu"onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

        </header>
    );
}


// 5. 버튼 공통 스타일
const buttonStyle: React.CSSProperties = {
    padding: "10px 18px",
    border: "1px solid #D5DED7",
    borderRadius: "25px",
    backgroundColor: "#FFFFFF",
    color: "#123D32",
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap"
};
const aiButtonStyle: React.CSSProperties = {
    padding: "12px 22px",
    border: "none",
    borderRadius: "25px",
    backgroundColor: "#123D32",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap"
};
export default Header;
