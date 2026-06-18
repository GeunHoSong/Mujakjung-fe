import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakaoBtn from "../../assets/kakaologin.jpg";
import NaverBtn from "../../assets/Naverlogin.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 카카오 로그인 성공 후 토큰 처리
// 카카오 로그인 성공 후 토큰 처리
  useEffect(() => {
    // 1. URLSearchParams를 함수 내부에서 즉시 생성
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("토큰 감지됨:", token);
      
      // 2. 토큰을 localStorage에 즉시 저장
      localStorage.setItem("token", token);
      
      // 3. 서버에서 정보가 필요하다면 여기서 호출 (선택 사항)
      // fetchUserInfo(token); 

      // 4. 아주 짧은 지연 후 메인으로 이동 (URL 정리)
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
  }, []); // [] 빈 배열로 설정해야 컴포넌트 마운트 시 딱 한 번만 실행됨

  // 일반 로그인
  const login = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/member/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();

      console.log("로그인 응답:", data);

      // 저장
      localStorage.setItem("token", data.token);

      if (data.name) {
        localStorage.setItem("userName", data.name);
      }

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      alert("로그인 성공!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // 카카오 로그인 이동
  const kakaoLogin = () => {
    window.location.href = "http://localhost:8080/auth/kakao";
  };
  // 네이버 로그인 
  const naverLogin = ()=> {
    window.location.href="http://localhost:8080/auth/naver";
  }

  return (
    <div>
      <h2>로그인</h2>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>로그인</button>

      <hr />
      {/*카카오 로그인 */}
      <button type="button" onClick={kakaoLogin}>
        <img src={kakaoBtn}alt="카카오 로그인"style={{ width: "200px", cursor: "pointer" }}/>
      </button>
       {/*카카오 로그인 */}
       <div style={{marginTop: "10px"}}>
        <button type="button" onClick={naverLogin} style={{border:'none', background: "none"}}>
          <img src={NaverBtn} alt="네이버 로그인" style={{width: "200px", cursor: "pointer"}} />
        </button>

       </div>
    </div>
  );
}

export default Login;