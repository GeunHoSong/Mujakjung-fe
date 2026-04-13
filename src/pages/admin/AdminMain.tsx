import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminMain() {
  const navigate = useNavigate();
  // 탭 상태 관리 
  const [activeTab , setActiveTeb] = useState("travel");

  // 1. 상태 관리 (데이터 입력값)
  const [category, setCategory] = useState("domestic");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  // 2. 이미지 미리보기 생성 로직
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 3. [핵심] 여행지 등록 함수
  const handleRegister = () => {
    // 로컬 스토리지에서 저장된 토큰 꺼내기
    const token = localStorage.getItem("token");

    // 서버 전송용 데이터 객체
    const travelData = {
      category,
      title,
      location,
      content,  
      price,
      imageName: imageFile ? imageFile.name : "없음",
      regDate: new Date().toLocaleDateString() 
    };

    // Axios POST 요청 (주소, 데이터, 설정)
    axios.post("http://localhost:8080/api/admin/travel/register", travelData, {
        // [필수] 401 Unauthorized 에러 해결을 위한 인증 헤더 추가
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
      .then((res) => {
        // 서버에서 생성된 ID 받아오기
        const newId = res.data.id;
        console.log("등록 성공!", res.data);
        alert(`${title} 등록 완료! (160번째 커밋)`);
        
        // 상세 페이지로 즉시 이동
        navigate(`/travel/${newId}`);
      })
      .catch((err) => {
        console.error("등록 실패 로그:", err);
        // 에러 메시지 처리
        alert("등록 실패: 권한이 없거나 서버가 응답하지 않습니다.");
      });

    // 입력 필드 초기화
    setTitle("");
    setLocation("");
    setContent("");
    setImageFile(null);
    setPreviewUrl("");
    setPrice(0);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
       {/* --- 1. 왼쪽 사이드바 (초록색 기둥) --- */}
       <div style={{width: "250px", backgroundColor: "#4CAF50", color: "white", padding: "20px", flexShrink: 0}}>
        <h2 style={{fontSize: "1.2rem", marginBottom: "30px"}}>관리자 페이지</h2>
        <div onClick={() => setActiveTeb("travel")} style={{padding: "15px", cursor: "pointer",borderRadius: "5px", backgroundColor: activeTab === "travel"? "#3e8e41" :"transparent", marginBottom: "10px"}}>
          여행지 등록
        </div>
        <div onClick={()=> setActiveTeb("members")} style={{padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor : activeTab === "members"? "#3e8e41" : "transparent", marginBottom: "10px"}}>
          고객 관리 등록
        </div>
       </div>
        {/* [오른쪽 영역] 콘텐츠 화면 */}
        <div style={{flex: 1, padding: "40px", background:"#fff"}}>
          {activeTab === "travel" && (
            <div>
              <h2>세로운 여헹 코스 등록</h2>
              <hr />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label>분류 :
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="domsetic">국내 여행</option>
                  <option value="overseas">해외 여행</option>
                </select>
              </label>
              <label>이름: <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} /></label>
              <label>위치: <input type="text" value={location} onChange={(e)=> setLocation(e.target.value)} /></label>
              <label>내용: <textarea value={content} onChange={(e)=> setContent(e.target.value)}></textarea></label>
              <label>이미지: <input type="file" onChange={handleImageChange}  /></label>
              <label>가격: <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
              <button onClick={handleRegister} style={{backgroundColor:"#4CAF50", color: "white", padding: "12px", border: "none", borderRadius: "8px", cursor: "poninter", fontWeight: "bold" }}>
                신규 등록 하기
              </button>
              </div>
            </div>
          )}
          {activeTab === "members" && (
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
              <h2 style={{marginBottom: "20px"}}>고객 계정 관리</h2>
              <hr />
              {/* 회원 목록 테이블 */}
              <table style={{width: "100%", borderCollapse: "collapse", marginTop: "20px", }}>
                <thead>
                  <tr style={{backgroundColor: "#f8f9fa", textAlign: "left", borderBottom: "2px solid #ddd"}}>
                    <th style={{padding: "12px"}}>회원 번호</th>
                    <th style={{padding: "12px"}}>이름</th>
                    <th style={{padding: "12px"}}>이메일</th>
                    <th style={{padding: "12px"}}>권한</th>
                    <th style={{padding: "12px"}}>가입일</th>
                    <th style={{padding: "12px"}}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 나중에 members.map()으로 돌릴 자리! 지금은 예시 데이터 */}
                  <tr style={{borderBottom: "10px solid #eee" }}>
                    <td style={{padding: "12px"}}>1</td>
                    <td style={{padding: "12px"}}>홍길동</td>
                    <td style={{padding: "12px"}}>hong@test.com</td>
                    <td style={{padding: "12px"}}>
                      <span style={{color: "blue", fontWeight: "bold"}}>USER</span>
                    </td>
                    <td style={{padding: "12px"}}>2026-04-13</td>
                    <td style={{padding: "12px"}}>
                      <button style={{padding: "5px 10px", backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "4px" , cursor: "pointer"}}>
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
  )
}

export default AdminMain;