import { useState , useEffect} from "react";
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
  const [isLoggedIn , setLoggedIn] = useState(false);
  useEffect(()=>{
    // 백엔드 에서 보낸 ?Login=sucess 신호가 있는 지 확인 
    const params=  new URLSearchParams(window.location.search);
    if(params.get('login') === 'success'){
      // 추가 로그인 성공햇는지 증거를 남기자 
      localStorage.setItem("token", "ture");
       // 주소창을 깔끔하게 "/"로 돌려놓기
      navigate("/", {replace: true});
      // 화면을 새로 고침 하면 token 챙긴걸 반영 하게 됨 
      window.location.reload();
    }
  }, [navigate])

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다.");
    navigate("/main");
    // 상태 초기화 후 이동 
    setLoggedIn(false);
    navigate("/", {replace: true});
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
        <option value="">모두</option>
        <option value="domestic">국내 여행</option>
        <option value="overseas">해외 여행</option>
      </select>

      {/* 검색 버튼 */}
      <button onClick={search}>검색</button>

      {/* 로그인 상태에 따라 버튼 다르게 보여주기 */}
      {token ? (
        <>
        <button onClick={()=> navigate("/admin")} style={{backgroundColor: '#FFD700', fontSize: 'bold'}}>
          관리자 페이지
        </button>
          {/* 로그인 상태 */}
          <button onClick={()=> navigate("mypage")}>마이페이지</button>
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