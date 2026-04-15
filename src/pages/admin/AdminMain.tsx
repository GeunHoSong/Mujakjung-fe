import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * 관리자 메인 페이지 컴포넌트
 * 주요 기능: 여행지 등록(상태 관리, Axios 통신), 고객 계정 관리 탭 전환
 */
function AdminMain() {
  const navigate = useNavigate();

  // --- [상태 관리: UI] ---
  const [activeTab, setActiveTeb] = useState("travel"); // 현재 활성화된 탭 (travel / members)

  // --- [상태 관리: 여행지 등록 데이터] ---
  const [category, setCategory] = useState("domestic"); // 여행 분류 (국내/해외)
  const [title, setTitle] = useState("");              // 여행지 이름
  const [location, setLocation] = useState("");        // 여행지 위치
  const [content, setContent] = useState("");          // 상세 설명
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드할 이미지 파일
  const [previewUrl, setPreviewUrl] = useState<string>("");      // 이미지 미리보기 경로
  const [price, setPrice] = useState<number>(0);        // 여행 가격

  // --- [이벤트 핸들러: 이미지 미리보기] ---
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // 브라우저 메모리에 임시 URL 생성
    }
  };

  // --- [이벤트 핸들러: 신규 여행지 서버 전송] ---
  const handleRegister = () => {
    // 1. 보안을 위한 JWT 토큰 획득 (localStorage)
    const token = localStorage.getItem("token");

    // 2. 서버 전송용 데이터 포맷팅
    const travelData = {
      category,
      title,
      location,
      content,
      price,
      imageName: imageFile ? imageFile.name : "없음",
      regDate: new Date().toLocaleDateString() 
    };

    // 3. Axios를 이용한 백엔드 API 통신
  // 👈 [체크] 주소가 백엔드 컨트롤러와 100% 일치하는지 확인!
      axios.post("http://localhost:8080/api/admin/register", travelData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        const newId = res.data.id; // 서버에서 새로 생성된 여행지 PK(ID)
        console.log("등록 성공!", res.data);
        alert(`${title} 등록 완료! (161번째 커밋 🚀)`);
        
        // 성공 시 방금 만든 상세 페이지로 사용자 이동
        navigate(`/travel/${newId}`);
      })
      .catch((err) => {
        console.error("등록 실패 로그:", err);
        alert("등록 실패: 권한이 없거나 서버 응답에 문제가 있습니다.");
      });

    // 4. 전송 후 입력 필드 비우기 (초기화)
    setTitle("");
    setLocation("");
    setContent("");
    setImageFile(null);
    setPreviewUrl("");
    setPrice(0);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* === [좌측 영역] 사이드 내비게이션 바 === */}
      <div style={{ width: "250px", backgroundColor: "#4CAF50", color: "white", padding: "20px", flexShrink: 0 }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "30px" }}>관리자 페이지</h2>
        
        {/* 여행지 등록 탭 버튼 */}
        <div 
          onClick={() => setActiveTeb("travel")} 
          style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "travel" ? "#3e8e41" : "transparent", marginBottom: "10px" }}
        >
          여행지 등록
        </div>
        
        {/* 고객 관리 탭 버튼 */}
        <div 
          onClick={() => setActiveTeb("members")} 
          style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "members" ? "#3e8e41" : "transparent", marginBottom: "10px" }}
        >
          고객 관리 등록
        </div>
      </div>

      {/* === [우측 영역] 탭별 콘텐츠 화면 === */}
      <div style={{ flex: 1, padding: "40px", background: "#fff" }}>
        
        {/* 1. 여행지 등록 탭 화면 */}
        {activeTab === "travel" && (
          <div>
            <h2>새로운 여행 코스 등록</h2>
            <hr />
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
              <label>분류 :
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="domestic">국내 여행</option>
                  <option value="overseas">해외 여행</option>
                </select>
              </label>
              <label>이름: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
              <label>위치: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label>
              <label>내용: <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea></label>
              <label>이미지: <input type="file" onChange={handleImageChange} /></label>
              
              {/* 이미지 미리보기 영역 (선택 시에만 노출) */}
              {previewUrl && <img src={previewUrl} alt="미리보기" style={{ width: "100px", marginTop: "10px" }} />}
              
              <label>가격: <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
              
              <button onClick={handleRegister} style={{ backgroundColor: "#4CAF50", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
                신규 등록 하기
              </button>
            </div>
          </div>
        )}

        {/* 2. 고객 관리 탭 화면 */}
        {activeTab === "members" && (
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            <h2 style={{ marginBottom: "20px" }}>고객 계정 관리</h2>
            <hr />
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                  <th style={{ padding: "12px" }}>회원 번호</th>
                  <th style={{ padding: "12px" }}>이름</th>
                  <th style={{ padding: "12px" }}>이메일</th>
                  <th style={{ padding: "12px" }}>권한</th>
                  <th style={{ padding: "12px" }}>가입일</th>
                  <th style={{ padding: "12px" }}>관리</th>
                </tr>
              </thead>
              <tbody>
                {/* 데이터 로드 후 .map()으로 반복 렌더링될 영역 */}
                <tr style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>1</td>
                  <td style={{ padding: "12px" }}>홍길동</td>
                  <td style={{ padding: "12px" }}>hong@test.com</td>
                  <td style={{ padding: "12px" }}><span style={{ color: "blue", fontWeight: "bold" }}>USER</span></td>
                  <td style={{ padding: "12px" }}>2026-04-13</td>
                  <td style={{ padding: "12px" }}>
                    <button style={{ padding: "5px 10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMain;