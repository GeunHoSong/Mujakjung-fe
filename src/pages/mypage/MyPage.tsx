import React, { useState, useEffect, useRef } from "react";
import api from "../../axiosConfig"; // 경로를 정확히 확인하세요 (axiosConfig.ts 위치에 맞게 수정)
import { useNavigate } from "react-router-dom";

function Mypage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userProflie, setUserProfile] = useState({
        nickname: '',
        bio: '',
        profileImg: '',
        email: '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
// Mypage.tsx 의 useEffect 부분을 아래와 같이 수정하세요
    useEffect(() => {
        setIsLoading(true);
    
        // 서버 통신 시도
        api.get('/api/member/mypage') 
            .then(res => {
             setUserProfile(res.data);
         })
            .catch(err => {
             console.error("서버 에러:", err);
             // 에러가 나도 로딩을 끝내야 화면이 나옵니다
            })
            .finally(() => {
             setIsLoading(false); // 성공하든 실패하든 로딩 종료
            });
    }, []);
    // --- 2. 핸들러 함수들 (모두 api 인스턴스 사용) ---

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProflie, [name]: value });
    };

    const handleSave = () => {
        api.post('/api/member/mypage/update', userProflie)
            .then(() => alert("정보 수정 완료!"))
            .catch(err => alert("저장 실패"));
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file); 

        try {
            const res = await api.post('/api/member/mypage/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUserProfile({ ...userProflie, profileImg: res.data.imageUrl });
            alert("사진 변경 완료!");
        } catch (err) {
            alert("업로드 실패");
        }
    };

    // --- 3. 화면 렌더링 ---
    if (isLoading) return <div>데이터 불러 오는 중...</div>;
    if (error) return <div>서버 연결 실패 (에러: {error})</div>;

    return (
        <div>
            <h1>마이페이지</h1>
            <div>
                <img 
                    src={`http://localhost:8080/api/member/display?fileName=${userProflie.profileImg}`}
                    style={{ width: '120px', height: '120px', cursor: 'pointer' }}
                />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                <p>이미지를 클릭해 수정하세요</p>
            </div>

            <div>
                <label>닉네임: </label>
                <input name="nickname" value={userProflie.nickname} onChange={handleChange} />
            </div>
            <br />
            <div>
                <label>자기소개: </label>
                <textarea name="bio" value={userProflie.bio} onChange={handleChange} />
            </div>
            <br />
            <button onClick={handleSave}>정보 수정 하기</button>
            <hr />
            <div>
                <button onClick={()=> navigate("/cart/CartLocalStoage")}>장바구니</button>
                <button onClick={()=> navigate("/cart/CartOrder")}>주문내역</button>
                <button>찜한 상품</button>
                <button>설정</button>
            </div>
        </div>
    );
}

export default Mypage;