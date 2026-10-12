import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminMainMember from "./AdminMember";
import AdminList from "./AdminList";
import AdminUpdate from "./AdminUpdate";
import NoticeSave from "../notice/NoticeSave";
import AdminSelect from "./AdminSelect";
import AdminRemainingSeats from "./AdminRemainingSeats";
import AdminInquiry from "./AdminInquiry";

function AdminMain() {
  const navigate = useNavigate();

  // ==========================================
  // 1. 상태 관리 (State Management)
  // ==========================================
  // 현재 우측 화면에 보여줄 탭을 결정하는 상태 (기본값: 여행지 등록)
  const [activeTab, setActiveTab] = useState("travel");
  
  // 사이드바 카테고리별 아코디언(접이식 메뉴) 열림/닫힘 상태 관리
  const [isProductOpen, setIsProductOpen] = useState(true);   // 📦 상품 관리 카테고리
  const [isMemberOpen, setIsMemberOpen] = useState(true);     // 👥 회원 및 고객 관리 카테고리
  const [isSalesOpen, setIsSalesOpen] = useState(true);       // 📊 매출 및 정산 관리 카테고리
  const [isNoticeOpen, setIsNoticeOpen] = useState(true);     // 📢 운영 및 소통 카테고리

  // 새로운 여행 상품 등록 시 사용하는 입력값 상태들
  const [category, setCategory] = useState("domestic");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  // ==========================================
  // 2. 이벤트 핸들러 (Event Handlers)
  // ==========================================
  // 신규 여행 코스를 등록하는 API 요청 함수
  const handleRegister = () => {
    const token = localStorage.getItem("accessToken");
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
      
      {/* ========================================== */}
      {/* 3. [좌측] 카테고리형 아코디언 사이드바         */}
      {/* ========================================== */}
      <div style={{ width: "270px", backgroundColor: "#4CAF50", color: "white", padding: "20px", flexShrink: 0, boxSizing: "border-box" }}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "25px", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: "10px" }}>
          관리자 페이지
        </h2>
        
        {/* 📦 1. 상품 관리 카테고리 */}
        <div style={{ marginBottom: "15px" }}>
          <div 
            onClick={() => setIsProductOpen(!isProductOpen)} 
            style={{ padding: "10px 12px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold", backgroundColor: "#3e8e41", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>📦 상품 관리</span>
            <span>{isProductOpen ? "▲" : "▼"}</span>
          </div>
          {/* 하위 메뉴 목록 (토글 상태에 따라 열리고 닫힘) */}
          {isProductOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "15px", marginTop: "5px" }}>
              <div onClick={() => setActiveTab("travel")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "travel" ? "#2e6f31" : "transparent" }}>
                • 여행지 등록
              </div>
              <div onClick={() => setActiveTab("list")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "list" ? "#2e6f31" : "transparent" }}>
                • 상품 리스트
              </div>
              <div onClick={() => setActiveTab("update")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "update" ? "#2e6f31" : "transparent" }}>
                • 상품 수정
              </div>
              <div onClick={() => setActiveTab("seats")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "seats" ? "#2e6f31" : "transparent" }}>
                • 잔여석 확인
              </div>
            </div>
          )}
        </div>

        {/* 👥 2. 회원 및 고객 관리 카테고리 */}
        <div style={{ marginBottom: "15px" }}>
          <div 
            onClick={() => setIsMemberOpen(!isMemberOpen)} 
            style={{ padding: "10px 12px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold", backgroundColor: "#3e8e41", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>👥 회원 및 고객 관리</span>
            <span>{isMemberOpen ? "▲" : "▼"}</span>
          </div>
          {isMemberOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "15px", marginTop: "5px" }}>
              <div onClick={() => setActiveTab("members")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "members" ? "#2e6f31" : "transparent" }}>
                • 고객 관리 등록
              </div>
              <div onClick={() => setActiveTab("inquiry")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "inquiry" ? "#2e6f31" : "transparent" }}>
                • 고객센터 문의 관리
              </div>
            </div>
          )}
        </div>

        {/* 📊 3. 매출 및 정산 관리 카테고리 */}
        <div style={{ marginBottom: "15px" }}>
          <div 
            onClick={() => setIsSalesOpen(!isSalesOpen)} 
            style={{ padding: "10px 12px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold", backgroundColor: "#3e8e41", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>📊 매출 및 정산 관리</span>
            <span>{isSalesOpen ? "▲" : "▼"}</span>
          </div>
          {isSalesOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "15px", marginTop: "5px" }}>
              <div onClick={() => setActiveTab("select")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "select" ? "#2e6f31" : "transparent" }}>
                • 매출 관리
              </div>
            </div>
          )}
        </div>

        {/* 📢 4. 운영 및 소통 카테고리 */}
        <div style={{ marginBottom: "15px" }}>
          <div 
            onClick={() => setIsNoticeOpen(!isNoticeOpen)} 
            style={{ padding: "10px 12px", cursor: "pointer", borderRadius: "5px", fontWeight: "bold", backgroundColor: "#3e8e41", display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>📢 운영 및 소통</span>
            <span>{isNoticeOpen ? "▲" : "▼"}</span>
          </div>
          {isNoticeOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "15px", marginTop: "5px" }}>
              <div onClick={() => setActiveTab("notice")} style={{ padding: "8px", cursor: "pointer", borderRadius: "4px", backgroundColor: activeTab === "notice" ? "#2e6f31" : "transparent" }}>
                • 공지 사항
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ========================================== */}
      {/* 4. [우측] 탭별 콘텐츠 렌더링 영역             */}
      {/* ========================================== */}
      <div style={{ flex: 1, padding: "40px", background: "#fff", boxSizing: "border-box" }}>
        
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
        {activeTab === "members" && <AdminMainMember />}

        {/* 탭 3: 1:1 고객센터 문의 관리 화면 */}
        {activeTab === "inquiry" && <AdminInquiry />}

        {/* 탭 4: 상품 리스트 화면 */}
        {activeTab === "list" && (
          <div>
            <h2>상품 리스트</h2>
            <AdminList />
          </div>
        )}

        {/* 탭 5: 상품 수정 화면 */}
        {activeTab === "update" && (
          <div>
            <h2>상품 수정</h2>
            <AdminUpdate />
          </div>
        )}

        {/* 탭 6: 공지사항 관리 화면 */}
        {activeTab === "notice" && <NoticeSave />}

        {/* 탭 7: 매출 관리 화면 */}
        {activeTab === "select" && (
          <div>
            <h2>매출 관리</h2>
            <hr />
            <AdminSelect />
          </div>
        )}

        {/* 탭 8: 잔여석 확인 화면 */}
        {activeTab === "seats" && (
          <div>
            <AdminRemainingSeats />
          </div>
        )}
        
      </div>
    </div>
  );
}

export default AdminMain;