import React, { useState, useEffect } from "react";
import api from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

// 인터페이스명은 관례상 대문자로 시작 (UserProfile)
interface UserProfile {
    id: number | string;
    nickname: string;
    bio: string;
    profileImg: string;
    email: string;
}

function Mypage() {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile>({
        id: 0,
        nickname: '',
        bio: '',
        profileImg: '',
        email: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        api.post('/api/member/mypage')
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

    if (isLoading) return <div>데이터 불러 오는 중...</div>;

    return (
        <div>
            <h1>마이페이지</h1>
            
            {/* 정보 표시 영역 */}
            <div style={{ marginBottom: '20px' }}>
                <img 
                    src={`http://localhost:8080/api/member/display?fileName=${userProfile.profileImg}`}
                    alt="프로필 이미지"
                    style={{ width: '120px', height: '120px', borderRadius: '50%' }}
                />
                <p><strong>닉네임:</strong> {userProfile.nickname}</p>
                <p><strong>이메일:</strong> {userProfile.email}</p>
                <p><strong>자기소개:</strong> {userProfile.bio}</p>
            </div>

            <hr />

            {/* 네비게이션 버튼 영역 */}
            <div>
                <button onClick={() => navigate("/cart/CartLocalStoage")}>장바구니</button>
                <button onClick={() => navigate("/cart/CartOrder")}>주문내역</button>
                <button onClick={() => navigate("/mypage/MyPageEditProfile")}>프로필 수정</button>
                <button onClick={() => navigate("/mypage/MyPageTravel")}>나의 여행 일지</button>
                <button onClick={() => navigate("/mypage/MyPageBoard")}>내 게시글</button>
                <button>찜한 상품</button>
                <button>설정</button>
            </div>
        </div>
    );
}

export default Mypage;