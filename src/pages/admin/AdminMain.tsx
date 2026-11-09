
import axios from "axios";
import { useState } from "react";
import AdminMainMember from "./AdminMember";
import AdminList from "./AdminList";
import AdminUpdate from "./AdminUpdate";
import NoticeSave from "../notice/NoticeSave";
import AdminInquiry from "./AdminInquiry";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminMain() {
    const navigate = useNavigate();

    // 1. 현재 선택한 관리자 메뉴
    const [activeTab, setActiveTab] = useState("travel");

    // 2. 사이드바 메뉴 열림/닫힘
    const [isTravelOpen, setIsTravelOpen] = useState(true);
    const [isMemberOpen, setIsMemberOpen] = useState(true);
    const [isNoticeOpen, setIsNoticeOpen] = useState(true);

    // 3. 여행지 등록 입력값
    const [category, setCategory] = useState("domestic");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // 4. 여행지 등록 API
    const handleRegister = () => {
        const token = localStorage.getItem("accessToken");

        if (!title.trim() || !location.trim()) {
            alert("여행지 이름과 위치를 입력해 주세요.");
            return;
        }

        const travelData = {
            category,
            title,
            location,
            content,
            price: 0,
            imageName: imageFile ? imageFile.name : "없음",
            regDate: new Date().toLocaleDateString()
        };

        axios.post(
            "http://localhost:8080/api/admin/register",
            travelData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((res) => {
            alert(`${title} 등록 완료!`);
            navigate(`/travel/${res.data.id}`);
        })
        .catch((err) => {
            console.error("여행지 등록 오류:", err);
            alert("등록 실패: 권한 또는 서버 문제");
        });
    };

    return (
        <div className="admin-container">

            {/* 5. 왼쪽 관리자 사이드바 */}
            <aside className="admin-sidebar">

                <h2 className="admin-sidebar-title">
                    무작정 관리자
                </h2>

                {/* 여행지 관리 */}
                <div className="admin-menu-group">

                    <button type="button"className="admin-menu-title" onClick={() => setIsTravelOpen(!isTravelOpen)}>
                        <span>🗺️ 여행지 관리</span>
                        <span>{isTravelOpen ? "▲" : "▼"}</span>
                    </button>

                    {isTravelOpen && (
                        <div className="admin-submenu">
                          <button type="button"className={activeTab === "travel" ? "active" : ""}onClick={() => setActiveTab("travel")}
                            >
                                여행지 등록
                            </button>

                            <button
                                type="button"
                                className={activeTab === "list" ? "active" : ""}
                                onClick={() => setActiveTab("list")}
                            >
                                여행지 목록
                            </button>

                            <button
                                type="button"
                                className={activeTab === "update" ? "active" : ""}
                                onClick={() => setActiveTab("update")}
                            >
                                여행지 수정
                            </button>

                        </div>
                    )}
                </div>

                {/* 회원 및 고객 관리 */}
                <div className="admin-menu-group">

                    <button
                        type="button"
                        className="admin-menu-title"
                        onClick={() => setIsMemberOpen(!isMemberOpen)}
                    >
                        <span>👥 회원 및 고객 관리</span>
                        <span>{isMemberOpen ? "▲" : "▼"}</span>
                    </button>

                    {isMemberOpen && (
                        <div className="admin-submenu">

                            <button
                                type="button"
                                className={activeTab === "members" ? "active" : ""}
                                onClick={() => setActiveTab("members")}
                            >
                                회원 관리
                            </button>

                            <button
                                type="button"
                                className={activeTab === "inquiry" ? "active" : ""}
                                onClick={() => setActiveTab("inquiry")}
                            >
                                고객센터 문의 관리
                            </button>

                        </div>
                    )}
                </div>

                {/* 운영 및 소통 */}
                <div className="admin-menu-group">

                    <button
                        type="button"
                        className="admin-menu-title"
                        onClick={() => setIsNoticeOpen(!isNoticeOpen)}
                    >
                        <span>📢 운영 및 소통</span>
                        <span>{isNoticeOpen ? "▲" : "▼"}</span>
                    </button>

                    {isNoticeOpen && (
                        <div className="admin-submenu">

                            <button
                                type="button"
                                className={activeTab === "notice" ? "active" : ""}
                                onClick={() => setActiveTab("notice")}
                            >
                                공지사항 관리
                            </button>

                        </div>
                    )}
                </div>

            </aside>

            {/* 6. 오른쪽 관리자 콘텐츠 */}
            <main className="admin-content">

                {/* 여행지 등록 */}
                {activeTab === "travel" && (
                    <section className="admin-card">

                        <h2>새로운 여행지 등록</h2>

                        <p className="admin-description">
                            AI 여행 추천에 사용할 여행지 정보를 등록합니다.
                        </p>

                        <div className="admin-form">

                            {/* 여행 분류 */}
                            <label>
                                여행 분류
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="domestic">국내 여행</option>
                                    <option value="overseas">해외 여행</option>
                                </select>
                            </label>

                            {/* 여행지 이름 */}
                            <label>
                                여행지 이름
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="예: 제주도 힐링 여행"
                                />
                            </label>

                            {/* 여행지 위치 */}
                            <label>
                                여행지 위치
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="예: 제주특별자치도"
                                />
                            </label>

                            {/* 여행지 설명 */}
                            <label>
                                여행지 설명
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="여행지의 특징과 분위기를 입력하세요."
                                    rows={5}
                                />
                            </label>

                            {/* 대표 이미지 */}
                            <label>
                                대표 이미지
                                <input type="file"accept="image/*"onChange={(e) => {const file = e.target.files?.[0];
                                        if (previewUrl) {
                                            URL.revokeObjectURL(previewUrl);
                                        }

                                        if (file) {
                                            setImageFile(file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        } else {
                                            setImageFile(null);
                                            setPreviewUrl("");
                                        }
                                    }}
                                />
                            </label>

                            {/* 이미지 미리보기 */}
                            {previewUrl && (
                                <img src={previewUrl}alt="여행지 이미지 미리보기"className="admin-image-preview"/>)}

                            <button type="button"className="admin-register-button"onClick={handleRegister}>
                                여행지 등록하기
                            </button>

                        </div>
                    </section>
                )}

                {/* 회원 관리 */}
                {activeTab === "members" && (
                    <section className="admin-card">
                        <AdminMainMember />
                    </section>
                )}

                {/* 고객센터 문의 관리 */}
                {activeTab === "inquiry" && (
                    <section className="admin-card">
                        <AdminInquiry />
                    </section>
                )}

                {/* 여행지 목록 */}
                {activeTab === "list" && (
                    <section className="admin-card">
                        <h2>여행지 목록</h2>
                        <AdminList />
                    </section>
                )}

                {/* 여행지 수정 */}
                {activeTab === "update" && (
                    <section className="admin-card">
                        <h2>여행지 수정</h2>
                        <AdminUpdate />
                    </section>
                )}

                {/* 공지사항 관리 */}
                {activeTab === "notice" && (
                    <section className="admin-card">
                        <NoticeSave />
                    </section>
                )}

            </main>
        </div>
    );
}

export default AdminMain;
