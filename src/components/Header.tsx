import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Mujakjung.jpg";

function Header() {
  // 페이지 이동 함수
  const navigate = useNavigate();

  // 검색어 상태
  const [keyword, setKeyword] = useState("");

  // 여행 타입 상태
  const [type, setType] = useState("domestic");

  // localStorage 에 저장된 token 확인
  // token 이 있으면 로그인 상태
  const token = localStorage.getItem("token");

  // 검색 버튼 클릭
  const search = () => {
    navigate(`/search?keyword=${keyword}&type=${type}`);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <header>
      {/* 로고 클릭하면 메인 이동 */}
      <Link to="/">
        <img src={logo} alt="Mujakjung 로고" width="80" />
      </Link>

      {/* 사이트 제목 */}
      <h1>AI 여행 사이트</h1>

      {/* 검색어 입력 */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
      />

      {/* 여행 타입 */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="domestic">국내 여행</option>
        <option value="overseas">해외 여행</option>
      </select>

      {/* 검색 버튼 */}
      <button onClick={search}>검색</button>

      {/* 로그인 상태에 따라 버튼 다르게 보여주기 */}
      {token ? (
        <>
          {/* 로그인 상태 */}
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          {/* 로그아웃 상태 */}
          <button onClick={() => navigate("/join")}>회원 가입</button>
          <button onClick={() => navigate("/login")}>로그인</button>
        </>
      )}
    </header>
  );
}

export default Header;