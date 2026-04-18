import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg"; 

function Header() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("domestic");

  const token = localStorage.getItem("token"); 
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
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '0 20px', 
      borderBottom: '1px solid #ccc',
      /* [중요] 화면 맨 위에 고정 */
      position: 'fixed', 
      top: 0,
      left: 0,
      width: '100%',
      height: '70px',
      zIndex: 10000, // 배너보다 무조건 위
      boxSizing: 'border-box', 
      backgroundColor: 'white', 
      pointerEvents: 'auto'
    }}>
      {/* 왼쪽: 로고 + 검색바 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/"><img src={logo} alt="로고" width="60" /></Link>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>AI 여행 사이트</h1>
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <input 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            placeholder="검색어 입력" 
            style={{ padding: '5px' }} 
          />
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '5px' }}>
            <option value="domestic">국내</option>
            <option value="overseas">해외</option>
          </select>
          <button onClick={() => navigate(`/search?keyword=${keyword}&type=${type}`)}>검색</button>
        </div>
      </div>

      {/* 오른쪽: 버튼 영역 */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        alignItems: 'center',
        marginLeft: 'auto', // 오른쪽 정렬 필살기
        minWidth: 'max-content' 
      }}>
        {token ? (
          <>
            <span><strong>{userName || '송근호'}</strong>님</span>
            {userRole?.toUpperCase() === "ADMIN" && (
              <button onClick={() => navigate("/admin")} style={{ backgroundColor: '#FFD700' }}>관리자</button>
            )}
            <button onClick={() => navigate("/mypage")}>마이페이지</button>
            <button onClick={logout}>로그아웃</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/join")} style={{ padding: '5px 15px' }}>회원 가입</button>
            <button onClick={() => navigate("/login")} style={{ padding: '5px 15px' }}>로그인</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;