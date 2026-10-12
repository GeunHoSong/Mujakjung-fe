import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig"; // Axios 설정 파일 불러오기

function MyPageEditProfile() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // 수정할 프로필 정보 상태 관리
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // 1. 처음 렌더링될 때 기존 회원 정보 불러오기
    useEffect(() => {
        setIsLoading(true);
        api.post('/api/member/mypage')
            .then(res => {
                const data = res.data;
                setNickname(data.nickname || "");
                setBio(data.bio || "");
                setProfileImg(data.profileImg || "");
            })
            .catch(err => {
                console.error("회원 정보 불러오기 실패:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // 2. 파일 선택 시 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // 3. 수정 완료 버튼 클릭 시 서버로 전송
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("bio", bio);
        if (file) {
            formData.append("file", file);
        }

        // 백엔드 수정 API 주소
        api.put('/api/member/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(() => {
            alert("프로필이 성공적으로 수정되었습니다!");
            navigate("/mypage"); // 수정 후 마이페이지로 이동
        })
        .catch(err => {
            console.error("프로필 수정 실패:", err);
            alert("프로필 수정 중 오류가 발생했습니다.");
        });
    };

    if (isLoading) return <div>정보를 불러오는 중...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>프로필 수정</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                
                {/* 프로필 이미지 미리보기 및 업로드 */}
                <div style={{ textAlign: 'center' }}>
                    {profileImg && !file && (
                        <img 
                            src={`http://localhost:8080/api/member/display?fileName=${profileImg}`}
                            alt="현재 프로필"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                        />
                    )}
                    <div>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                </div>

                {/* 닉네임 입력 */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>닉네임</label>
                    <input 
                        type="text" 
                        value={nickname} 
                        onChange={(e) => setNickname(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>

                {/* 자기소개 입력 */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>자기소개</label>
                    <textarea 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                {/* 버튼 영역 */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="submit"
                        style={{ flex: 1, padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        저장하기
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate("/mypage")}
                        style={{ flex: 1, padding: '12px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MyPageEditProfile;