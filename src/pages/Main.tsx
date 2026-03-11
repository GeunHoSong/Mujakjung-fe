import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Main() {
  // 페이지 이동을 위한 navigate 
  const navigate = useNavigate();
  // 검색어 상태 저장 
  const [keyword, setKeyWord] = useState("");
  // 여행지 타입 상태 저장 (국내 / 해외)
  const [type, setType] = useState("");
  // 검색 버튼 클릭 함 수 
  const search =() =>{
    // 검색 결과 페이지로 이동 
    // query parameter 전달 
    navigate(`/search?keyword={keyword}&type=${type}`);

  };
  return (
    <div>
      <h1>AI 여행 사이트 </h1>
      {/** 여행지 검색 입력  */}
      <input type="text" value={keyword} onChange={(e)=> setKeyWord(e.target.value)} placeholder="검색어를 입력을 하세요" /><br/><br/>
      {/**국내 / 해외 선택  */}

      <button onClick={() => navigate("/join")}>회원가입</button>
      <button onClick={() => navigate("/login")}>로그인</button>
    </div>
  );
}

export default Main;