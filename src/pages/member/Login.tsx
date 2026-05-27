import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakaoBtn from "../../assets/kakaologin.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 1. 카카오 로그인 설정
  const REST_API_KEY = "c20fa1e751278dc7d481f42f175401b2";
  const REDIRECT_URI = "http://localhost:8080/auth/kakao/callback";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // 2. 카카오 로그인 후 토큰 처리 (페이지 진입 시 URL 확인)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      alert("카카오 로그인 성공! ✨");
      navigate("/");
      window.location.reload();
    }
  }, [navigate]);

  // 3. 일반 로그인 로직
  const login = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("로그인 실패");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      alert("로그인 성공");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <br /><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <br /><br />
      <button onClick={login}>로그인</button>

      <div>
        <br />
        <button type="button" onClick={handleKakaoLogin}>
          <img src={kakaoBtn} alt="카카오 로그인" style={{ width: "200px" }} />
        </button>
        <br /><br />
        <button onClick={() => navigate("/join")}>회원 가입</button>
      </div>
    </div>
  );
}

export default Login;