
import { useState, useEffect } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./MyPaage.css";

// 1. 사용자 정보 타입 정의
interface UserProfile {
    id: number | string;
    nickname: string;
    bio: string;
    profileImg: string;
    email: string;
}

function Mypage() {
    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);

    // 사용자 정보 상태 관리
    const [userProfile, setUserProfile] = useState<UserProfile>({
        id: 0,
        nickname: "",
        bio: "",
        profileImg: "",
        email: "",
    });

    const navigate = useNavigate();

    // 2. 서버에서 사용자 정보 가져오기
    useEffect(() => {
        setIsLoading(true);

        api.post("/api/member/mypage")
            .then(res => {
                setUserProfile(res.data);
            })
            .catch(err => {
                console.error("서버 에러:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 3. 로딩 화면
    if (isLoading) {
        return <div>데이터 불러 오는 중...</div>;
    }

    return (
        <div
            style={{
                padding: "40px",
                maxWidth: "800px",
                margin: "0 auto",
                fontFamily: "sans-serif"
            }}
        >
            <h1>마이페이지</h1>

            {/* 4. 프로필 정보 전체 영역 */}
            <div className="mypage-profile-card">

                {/* 프로필 이미지 영역 */}
                <div className="mypage-profile-image">

                    {/* 등록한 프로필 사진 */}
                    {userProfile.profileImg ? (
                        <img src={`http://localhost:8080/api/member/display?fileName=${encodeURIComponent(userProfile.profileImg)}`}alt="프로필 이미지"
                            onError={(e) => {e.currentTarget.style.display = "none";}}/>) : null}
                    {/* 기본 프로필 아이콘 */}
                    <span className="mypage-default-icon">
                        👤
                    </span>

                </div>

                {/* 회원 정보 영역 */}
                <div>
                    <p style={{ margin: "4px 0" }}>
                        <strong>닉네임:</strong> {userProfile.nickname}
                    </p>

                    <p style={{ margin: "4px 0" }}>
                        <strong>이메일:</strong> {userProfile.email}
                    </p>

                    <p style={{ margin: "4px 0" }}>
                        <strong>자기소개:</strong>{" "}
                        {userProfile.bio || "등록된 자기소개가 없습니다."}
                    </p>
                </div>

            </div>

            <hr
                style={{
                    border: "0",
                    borderTop: "1px solid #eee",
                    marginBottom: "20px"
                }}
            />

            {/* 5. 마이페이지 메뉴 버튼 영역 */}
            <div className="mypage-menu-grid">
                <button
                    onClick={() => navigate("/reservation/ReservationList")}
                    
                >
                    여행 목록
                </button>

                <button
                    onClick={() => navigate("/reservation/ReservationCreate")}
                    
                >
                    예약 하기
                </button>

                <button
                    onClick={() => navigate("/mypage/edit")}
                   
                >
                    프로필 수정
                </button>

                <button
                    onClick={() => navigate("/travel/TravelList")}
                    
                >
                    여행 일정
                </button>

                <button
                    onClick={() => navigate("/travel/TravelSave")}
                    
                >
                    AI 여행 일정 만들기
                </button>

                <button
                    onClick={() => navigate("/mypage/board")}
                    
                >
                    내 게시글
                </button>

                <button
                    onClick={() => navigate("/mypage/bookmark")}
                    
                >
                    찜 한 여행
                </button>

                <button >
                    설정
                </button>
            </div>
        </div>
    );
}



export default Mypage;
