
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg";

function Header() {
    const navigate = useNavigate();

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
        <header
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #D6C5DC",
        backgroundColor:" #E6D9EA",
        zIndex: 1000,
        boxSizing: "border-box"
    }}
>

            {/* 1. 왼쪽: 로고 및 서비스 이름 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                }}
            >
                <Link to="/" style={{ display: "flex" }}>
                    <img
                        src={logo}
                        alt="무작정 로고"
                        width="45"
                        height="45"
                        style={{
                            borderRadius: "50%",
                            objectFit: "cover"
                        }}
                    />
                </Link>

                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "#183b46",
                        fontSize: "22px",
                        fontWeight: "bold",
                        whiteSpace: "nowrap"
                    }}
                >
                    무작정
                </Link>
            </div>


            {/* 2. 가운데: 주요 메뉴 */}
            <nav
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px"
                }}
            >
                <Link to="/chat" style={navStyle}>
                    AI 여행 상담
                </Link>

                <Link to="/notice/list" style={navStyle}>
                    공지사항
                </Link>

                <Link to="/board/list" style={navStyle}>
                    게시판
                </Link>
            </nav>


            {/* 3. 오른쪽: 사용자 인증 및 계정 메뉴 */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}
            >
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
                        <button
                            type="button"
                            onClick={() => navigate("/mypage")}
                            style={buttonStyle}
                        >
                            마이페이지
                        </button>

                        {/* 로그아웃 */}
                        <button
                            type="button"
                            onClick={logout}
                            style={buttonStyle}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        {/* 회원가입 */}
                        <button
                            type="button"
                            onClick={() => navigate("/join")}
                            style={buttonStyle}
                        >
                            회원가입
                        </button>

                        {/* 로그인 */}
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            style={buttonStyle}
                        >
                            로그인
                        </button>
                    </>
                )}
            </div>

        </header>
    );
}


// 4. 상단 메뉴 공통 스타일
const navStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "#333333",
    fontSize: "15px",
    fontWeight: 600,
    whiteSpace: "nowrap"
};


// 5. 버튼 공통 스타일
const buttonStyle: React.CSSProperties = {
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#333333",
    cursor: "pointer",
    whiteSpace: "nowrap"
};

export default Header;
