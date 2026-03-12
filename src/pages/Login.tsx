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
      localStorage.setItem("token", data.token); // 로그인 유지
      console.log(data);
      alert("로그인 성공");
      // 메인 페이지로 이동 
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("서버 연결 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일"/><br /><br />

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호"/><br /><br />

      <button onClick={login}>로그인</button>
    </div>
  );
}

export default Login;