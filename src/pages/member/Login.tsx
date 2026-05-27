import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 카카오 로그인 버튼 이미지 import
import kakaoBtn from "../../assets/kakaologin.jpg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // 카카오 로그인 토큰 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // URL에서 token 값 가져오기
    const token = params.get("token");

    if (token) {
      // 로컬 스토리지 저장
      localStorage.setItem("token", token);
      localStorage.setItem("userName", "송근호");

      alert("카카오 로그인 성공! ✨");

      // URL 깔끔하게 정리
      window.history.replaceState({}, null, window.location.pathname);

      // 메인 페이지 이동
      navigate("/");

      // 새로고침
      window.location.reload();
    }
  }, [navigate]);

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
        alert("로그인 실패");
        return;
      }

      const data = await response.json();

      // 로그인 정보 저장
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name || "송근호");

      console.log(data);

      alert("로그인 성공");

      // 메인 페이지 이동
      navigate("/");

      // 로그인 상태 즉시 반영
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패");
    }
  };

  // 카카오 로그인 설정
  const REST_API_KEY = "c20fa1e751278dc7d481f42f175401b2";

  // 프론트 주소로 수정 추천
  const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

  const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code`;

  // 카카오 로그인 이동
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <h2>로그인</h2>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />

      <br />
      <br />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />

      <br />
      <br />

      <button onClick={login}>로그인</button>

      <div>
        <br />

        {/* 카카오 로그인 버튼 */}
        <button type="button" onClick={handleKakaoLogin}>
          <img
            src={kakaoBtn}
            alt="카카오 로그인"
            style={{ width: "200px" }}
          />
        </button>

        <br />
        <br />

        {/* 회원가입 */}
        <button onClick={() => navigate("/join")}>
          회원 가입
        </button>
      </div>
    </div>
  );
}

export default Login;