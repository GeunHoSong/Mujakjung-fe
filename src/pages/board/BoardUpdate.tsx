import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BoardUpdate() {
  const { id } = useParams();
  const navigate = useNavigate(); // 오타 수정: naviagte -> navigate
  const [board, setBoard] = useState({ title: '', content: '' });

  // 수정 화면 진입 시 기존 데이터 불러오기
  useEffect(() => {
    axios.get(`/api/board/${id}`)
      .then((res) => {
        setBoard(res.data);
      })
      .catch((err) => console.error("데이터 로딩 실패:", err));
  }, [id]);

  // 수정 데이터 전송
  const handleUpdate = async () => {
  // 1. 로그인 토큰 가져오기
  const token = localStorage.getItem("accessToken");

  // 2. 로그인 여부 확인
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate("/login");
    return;
  }

  // 3. 제목과 내용 확인
  if (!board.title.trim() || !board.content.trim()) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  try {
    // 4. 수정 요청 + JWT 토큰 전달
    await axios.put(`/api/board/${id}`, board, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 5. 수정 성공
    alert("수정 완료");
    navigate(`/board/${id}`);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP 상태:", error.response?.status);
      console.error("서버 응답:", error.response?.data);
    } else {
      console.error("수정 실패:", error);
    }

    alert("수정 중 오류가 발생했습니다.");
  }
};
  return (
    <div>
      <h2>게시글 수정</h2>
      <div>
        <input type="text"value={board.title} onChange={(e) => setBoard({ ...board, title: e.target.value })} placeholder="제목"/>
      </div>
      <div>
        <textarea value={board.content} onChange={(e) => setBoard({ ...board, content: e.target.value })} placeholder="내용"/>
      </div>
      <button onClick={handleUpdate}>수정 완료</button>
    </div>
  );
}

export default BoardUpdate;