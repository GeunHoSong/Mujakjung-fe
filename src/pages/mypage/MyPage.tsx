import React, { useState, useEffect } from "react";
import api from "../../axiosConfig"; // Axios 설정 파일 불러오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅

// 1. 사용자 정보 타입 정의 (TypeScript 인터페이스)
interface UserProfile {
    id: number | string;
    nickname: string;
    bio: string;
    profileImg: string;
    email: string;
}

function Mypage() {
    // 로딩 상태 관리 (데이터를 불러오는 동안 화면 제어)
    const [isLoading, setIsLoading] = useState(true);
    // 사용자 정보 상태 관리
    const [userProfile, setUserProfile] = useState<UserProfile>({
        id: 0,
        nickname: '',
        bio: '',
        profileImg: '',
        email: '',
    });

    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    // 2. 컴포넌트가 처음 렌더링될 때 서버에서 사용자 정보를 가져옴
    useEffect(() => {
        setIsLoading(true);
        api.post('/api/member/mypage') // 서버 API 호출
            .then(res => {
                setUserProfile(res.data); // 성공 시 데이터를 상태에 저장
            })
            .catch(err => {
                console.error("서버 에러:", err); // 에러 발생 시 콘솔 로그 출력
            })
            .finally(() => {
                setIsLoading(false); // 로딩 종료
            });
    }, []);

    // 3. 데이터를 불러오는 중일 때 보여줄 로딩 화면
    if (isLoading) return <div>데이터 불러 오는 중...</div>;

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h1>마이페이지</h1>
            
            {/* 정보 표시 영역: 단순히 읽기 전용으로 데이터를 보여줌 */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: '30px' }}>
                <img 
                    src={`http://localhost:8080/api/member/display?fileName=${userProfile.profileImg}`}
                    alt="프로필 이미지"
                    style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: "cover", border: "1px solid #ddd" }}
                />
                <div>
                    <p style={{ margin: "4px 0" }}><strong>닉네임:</strong> {userProfile.nickname}</p>
                    <p style={{ margin: "4px 0" }}><strong>이메일:</strong> {userProfile.email}</p>
                    <p style={{ margin: "4px 0" }}><strong>자기소개:</strong> {userProfile.bio || "등록된 자기소개가 없습니다."}</p>
                </div>
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #eee", marginBottom: "20px" }} />

            {/* 메뉴 버튼 영역 ("나의 예약" 제거 및 정리) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <button 
                    onClick={() => navigate("/travel/list")}
                    style={{ padding: "10px 16px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
                >
                    🗺️ 내 여행 목록
                </button>
                <button 
                    onClick={() => navigate("/reservation/ReservationList")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    예약 목록
                </button>
                <button 
                    onClick={() => navigate("/reservation/ReservationCreate")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    예약 하기
                </button>
                <button 
                    onClick={() => navigate("/mypage/edit")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    프로필 수정
                </button>
                <button 
                    onClick={() => navigate("/mypage/travel")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    여행 일정
                </button>
                <button 
                    onClick={() => navigate("/travel/TravelSave")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    여행 일정 저장
                </button>
                <button 
                    onClick={() => navigate("/mypage/board")}
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    내 게시글
                </button>
                <button 
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    찜한 여행
                </button>
                <button 
                    style={{ padding: "10px 16px", backgroundColor: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer" }}
                >
                    설정
                </button>
            </div>
        </div>
    );
}

export default Mypage;