import { useState, useEffect } from "react";
import axios from "axios";

function MyPageEditProfile() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // 컴포넌트 마운트 시 서버에서 프로필 정보 가져오기
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // 오늘 해결한 401 인증 이슈를 고려해 헤더 포함
                const response = await axios.get("/api/member/mypage", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setProfileImage(response.data.profileUrl); 
            } catch (error) {
                console.error("이미지 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div>이미지 불러오는 중...</div>;

    return (
        <div>
            <h2>프로필 수정</h2>
            {profileImage ? (
                <img src={profileImage} alt="프로필" style={{ width: '100px', borderRadius: '50%' }} />
            ) : (
                <div className="placeholder">기본 이미지</div>
            )}
            {/* 파일 업로드 input은 여기 추가하면 돼 */}
        </div>
    );
}

export default MyPageEditProfile;