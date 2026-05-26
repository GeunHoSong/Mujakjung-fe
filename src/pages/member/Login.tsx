import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    //  페이지 이동 함수 
    const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/member/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        alert("로그인 실패");
        return;
      }

      const data = await response.json();
      // localStorage.setItem("role", data.role); // 권한 저장
      // localStorage.setItem("token", data.token); // 로그인 유지
      // localStorage.setItem("userName", data.name || '회원');
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || '송근호');
      alert("로그인 성공");
      console.log(data);
      alert("로그인 성공");
      // 메인 페이지로 이동 
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패");
    }
  };
  const REST_API_KEY = "c20fa1e751278dc7d481f42f175401b2";
  const REDIRECT_URI = "http://localhost:8080/auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
   const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <h2>로그인</h2>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일"/><br /><br />

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호"/><br /><br />

      <button onClick={login}>로그인</button>
      <div>

        <button type="button" onClick={handleKakaoLogin}>
          <img src="{kakaoBtn}" alt="카카오 로그인" />
        </button>
        <button onClick={()=> navigate("/join")}>
          회원 가입 
        </button>
      </div>
    </div>
    
  );
}

export default Login;