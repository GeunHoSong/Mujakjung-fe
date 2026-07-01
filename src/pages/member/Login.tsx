import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kakaoBtn from "../../assets/kakaologin.jpg";
import NaverBtn from "../../assets/Naverlogin.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 서버 주소 통일 (8081로 설정, 서버 포트에 맞게 수정하세요)
  const SERVER_URL = "http://localhost:8080";

  // 1. 카카오 로그인 성공 후 토큰 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("카카오 토큰 감지됨:", token);
      // 키 이름을 "accessToken"으로 통일!
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

      // 키 이름을 "accessToken"으로 통일!
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

  // 3. 카카오/네이버 로그인 이동
  const kakaoLogin = () => { window.location.href = `${SERVER_URL}/auth/kakao`; };
  const naverLogin = () => { window.location.href = `${SERVER_URL}/auth/naver`; };

  return (
    <div>
      <h2>로그인</h2>
      <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>로그인</button>

      <hr />
      <button type="button" onClick={kakaoLogin}>
        <img src={kakaoBtn} alt="카카오 로그인" style={{ width: "200px", cursor: "pointer" }} />
      </button>
      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={naverLogin} style={{ border: 'none', background: "none" }}>
          <img src={NaverBtn} alt="네이버 로그인" style={{ width: "200px", cursor: "pointer" }} />
        </button>
      </div>
    </div>
  );
}

export default Login;