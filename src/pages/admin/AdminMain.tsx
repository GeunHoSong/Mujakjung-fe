import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMainMember from "./AdminMember"; // 경로 확인 필수!

function AdminMain() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [activeTab, setActiveTab] = useState("travel"); // 탭 전환 상태
  const [category, setCategory] = useState("domestic");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  // 2. 이벤트 핸들러: 여행지 등록
  const handleRegister = () => {

    const token = localStorage.getItem("token");
    console.log("토큰" +  token);
    const travelData = {
      category, title, location, content, price,
      imageName: imageFile ? imageFile.name : "없음",
      regDate: new Date().toLocaleDateString()
    };

    axios.post("http://localhost:8080/api/admin/register", travelData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      alert(`${title} 등록 완료!`);
      navigate(`/travel/${res.data.id}`);
    })
    .catch((err) => {
      console.error(err);
      alert("등록 실패: 권한 또는 서버 문제");
    });
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* === [좌측] 사이드바 === */}
      <div style={{ width: "250px", backgroundColor: "#4CAF50", color: "white", padding: "20px", flexShrink: 0 }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "30px" }}>관리자 페이지</h2>
        
        <div 
          onClick={() => setActiveTab("travel")} 
          style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "travel" ? "#3e8e41" : "transparent" }}
        >
          여행지 등록
        </div>
        
        <div 
          onClick={() => setActiveTab("members")} 
          style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "members" ? "#3e8e41" : "transparent" }}
        >
          고객 관리 등록
        </div>
        <div style={{marginBottom: "20px"}}>
          <button onClick={()=> setActiveTab('list')}>상품 리스트</button>
          <button onClick={()=> setActiveTab('update')}>상품 수정</button>

        </div>
      </div>

      {/* === [우측] 콘텐츠 영역 === */}
      <div style={{ flex: 1, padding: "40px", background: "#fff" }}>
        
        {/* 탭 1: 여행지 등록 화면 */}
        {activeTab === "travel" && (
          <div>
            <h2>새로운 여행 코스 등록</h2>
            <hr />
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
              <label>분류: 
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="domestic">국내 여행</option>
                  <option value="overseas">해외 여행</option>
                </select>
              </label>
              <label>이름: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></label>
              <label>위치: <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label>
              <label>내용: <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea></label>
              <label>이미지: <input type="file" onChange={(e) => {
                const file = e.target.files?.[0];
                if(file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
              }} /></label>
              {previewUrl && <img src={previewUrl} alt="미리보기" style={{ width: "100px" }} />}
              <label>가격: <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></label>
              
              <button onClick={handleRegister} style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                신규 등록 하기
              </button>
            </div>
          </div>
        )}

        {/* 탭 2: 회원 관리 화면 */}
        {activeTab === "members" && (
          <div>
            <AdminMainMember />
          </div>
        )}
        {/* 탭 3: 상품 리스트 화면 */}
        {activeTab === "list" && (
          <div>
            <h2>상품 리스트</h2>
            {/* 나중에 <AdminList /> 들어올 자리 */}
            <p>여기에 상품 목록을 보여줄 예정입니다.</p>
          </div>
        )} {/* <--- 여기서 리스트 탭이 확실히 끝나야 해! */}

        {/* 탭 4: 상품 수정 화면 */}
        {activeTab === "update" && (
          <div>
            <h2>상품 수정</h2>
            {/* 나중에 <AdminUpdate /> 들어올 자리 */}
            <p>여기에 수정할 상품 목록을 보여줄 예정입니다.</p>
          </div>
        )}
      </div> {/* <--- 이 닫는 태그가 콘텐츠 영역 전체를 감싸는 <div>의 끝이야 */}
    </div>
  );
}


export default AdminMain;