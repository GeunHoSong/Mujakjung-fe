import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMainMember from "./AdminMember";
import AdminList from "./AdminList";
import AdminUpdate from "./AdminUpdate";
import NoticeSave from "../notice/NoticeSave";
import AdminSelect from "./AdminSelect";
import AdminRemainingSeats from "./AdminRemainingSeats";

function AdminMain() {
  const navigate = useNavigate();

  // 1. 상태 관리
  const [activeTab, setActiveTab] = useState("travel");
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
        
        <div onClick={() => setActiveTab("travel")} style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "travel" ? "#3e8e41" : "transparent" }}>
          여행지 등록
        </div>
        <div onClick={() => setActiveTab("members")} style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "members" ? "#3e8e41" : "transparent" }}>
          고객 관리 등록
        </div>
        <div onClick={() => setActiveTab("notice")} style={{ padding: "15px", cursor: "pointer", borderRadius: "5px", backgroundColor: activeTab === "notice" ? "#3e8e41" : "transparent" }}>
          공지 사항
        </div>
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button onClick={() => setActiveTab('list')}>상품 리스트</button>
          <button onClick={() => setActiveTab('update')}>상품 수정</button>
          <button onClick={() => setActiveTab('select')}>매출 관리</button>
          <button onClick={()=> setActiveTab('seats')}>잔여석 확인</button>
        </div>
      </div>

      {/* === [우측] 콘텐츠 영역 === */}
      <div style={{ flex: 1, padding: "40px", background: "#fff" }}>
        
        {/* 탭 1: 여행지 등록 */}
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

        {/* 탭 2: 회원 관리 */}
        {activeTab === "members" && <AdminMainMember />}

        {/* 탭 3: 상품 리스트 */}
        {activeTab === "list" && (
          <div>
            <h2>상품 리스트</h2>
            <AdminList />
          </div>
        )}

        {/* 탭 4: 상품 수정 */}
        {activeTab === "update" && (
          <div>
            <h2>상품 수정</h2>
            <AdminUpdate />
          </div>
        )}

        {/* 탭 5: 공지사항 */}
        {activeTab === "notice" && <NoticeSave />}

        {/* 탭 6: 매출 관리 */}
        {activeTab === "select" && (
          <div>
            <h2>매출 관리</h2>
            <hr />
            <AdminSelect/>
          </div>
        )}
        {/** 탭 7:  잔여석 확인 */}
        {activeTab == "seats" &&(
          <div>
            <AdminRemainingSeats/>
          </div>
        )}
    
        
      </div>
    </div>
  );
}

export default AdminMain;