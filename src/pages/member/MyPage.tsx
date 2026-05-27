import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Mypage() {
    // --- 1. 상태 관리 ---
    const [userProflie, setUserProfile] = useState({
        nickname: '',
        bio: '',
        profileImg: '', // 서버에서 받은 파일명
        email: '',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- 2. 초기 데이터 가져오기 ---
    useEffect(() => {
        axios.get('http://localhost:8081/api/member/mypage')
            .then(res => setUserProfile(res.data))
            .catch(err => console.error("데이터 로딩 실패!", err));
    }, []);

    // --- 3. 핸들러 함수 ---

    // 입력값 변경 (닉네임, 자기소개)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile({ ...userProflie, [name]: value });
    };

    // 정보 수정 저장
    const handleSave = () => {
        axios.post('http://localhost:8081/api/member/mypage/update', userProflie)
            .then(() => alert("정보 수정 완료!"))
            .catch(err => alert("저장 실패"));
    }

    // 사진 업로드
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profileImage', file); 

        try {
            const res = await axios.post('http://localhost:8081/api/member/mypage/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // 서버가 준 새로운 이미지 경로로 업데이트
            setUserProfile({ ...userProflie, profileImg: res.data.imageUrl });
            alert("사진 변경 완료!");
        } catch (err) {
            alert("업로드 실패");
        }
    };

    // --- 4. 화면 설계 (순수 HTML 구조) ---
    return (
        <div>
            <h1>마이페이지</h1>

            {/* 프로필 사진 섹션 */}
            <div>
                <img 
                    // 로직: 이미지가 있으면 서버 주소 + 파일명, 없으면 기본 이미지
                    src={userProflie.profileImg 
                        ? `http://localhost:8081/api/member/display?fileName=${userProflie.profileImg}`
                        : "https://via.placeholder.com/120"} 
                    alt="profile" 
                    onClick={() => fileInputRef.current?.click()} 
                    style={{ width: '120px', height: '120px', cursor: 'pointer' }} // 최소한의 확인용 스타일
                />
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                />
                <p>이미지를 클릭해 수정하세요</p>
            </div>

            {/* 정보 입력 섹션 */}
            <div>
                <label>닉네임: </label>
                <input 
                    name="nickname" 
                    value={userProflie.nickname} 
                    onChange={handleChange} 
                />
            </div>
            
            <br />

            <div>
                <label>자기소개: </label>
                <textarea 
                    name="bio" 
                    value={userProflie.bio} 
                    onChange={handleChange} 
                />
            </div>

            <br />

            <button onClick={handleSave}>정보 수정 하기</button>

            <hr />

            {/* 하단 메뉴 섹션 */}
            <div>
                <button>장바구니</button>
                <button>주문내역</button>
                <button>찜한 상품</button>
                <button>설정</button>
            </div>
        </div>
    );
}

export default Mypage;