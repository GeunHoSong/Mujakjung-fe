import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakaoBtn from "../../assets/kakaologin.jpg";
import NaverBtn from "../../assets/Naverlogin.png";
import googleBtn from "../../assets/googleLoignBtn.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 서버 주소 통일
  const SERVER_URL = "http://localhost:8080";

  // 1. 소셜 로그인 성공 후 토큰 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("소셜 로그인 토큰 감지됨:", token);
      localStorage.setItem("accessToken", token); 
      window.location.href = "/";
    }
  }, []);

  // 2. 일반 로그인
  const login = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/member/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("로그인 실패");

      const data = await response.json();
      console.log("로그인 응답:", data);

      localStorage.setItem("accessToken", data.token);

      if (data.name) localStorage.setItem("userName", data.name);
      if (data.role) localStorage.setItem("role", data.role);

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  // 3. 소셜 로그인 이동 함수들
  const kakaoLogin = () => { window.location.href = `${SERVER_URL}/auth/kakao`; };
  const naverLogin = () => { window.location.href = `${SERVER_URL}/oauth2/authorization/naver`; };
  const googleLogin = () => { window.location.href = `${SERVER_URL}/oauth2/authorization/google`; }; // 구글 로그인 함수

  return (
    <div>
      <h2>로그인</h2>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={login}>로그인</button>

      <hr />
      
      {/* 카카오 로그인 */}
      <button type="button" onClick={kakaoLogin} style={{ border: 'none', background: "none", cursor: "pointer" }}>
        <img src={kakaoBtn} alt="카카오 로그인" style={{ width: "200px" }} />
      </button>

      {/* 네이버 로그인 */}
      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={naverLogin} style={{ border: 'none', background: "none", cursor: "pointer" }}>
          <img src={NaverBtn} alt="네이버 로그인" style={{ width: "200px" }} />
        </button>
      </div>

      {/* 구글 로그인 */}
      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={googleLogin} style={{ border: 'none', background: "none", cursor: "pointer" }}>
          <img src={googleBtn} alt="구글 로그인" style={{ width: "200px" }} />
        </button>
      </div>
    </div>
  );
}

export default Login;