import React, { useState, useEffect, useRef } from "react";
import api from "../../axiosConfig";

function MyPageEditProfile() {
    // 1. 상태 관리: 데이터와 로딩 상태
    const [id, setId] = useState<number | string>(""); 
    const [nickname, setNickName] = useState("");
    const [bio, setBio] = useState("");
    const [profileImg, setProFileImg] = useState("");
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

 useEffect(() => {
    const targetId = 1; // 테스트용 ID
    setLoading(true);

    // 인터셉터가 토큰을 자동으로 붙여주니까 헤더 생략 가능
    api.get(`/api/mypage/${targetId}`) 
        .then(res => {
            console.log("데이터 수신 성공:", res.data);
            setId(res.data.id);
            setNickName(res.data.nickname);
            setBio(res.data.bio);
            setProFileImg(res.data.profileImg);
        })
        .catch(err => {
            console.error("데이터 불러오기 에러:", err);
            // 401 에러라면 여기가 실행됨
            alert("로그인 정보가 만료되었거나 권한이 없습니다.");
        })
        .finally(() => {
            setLoading(false);
        });
}, []);
    // 2. 파일 업로드 핸들러
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file); 
            try {
                // [수정] 큰따옴표 대신 백틱(`)을 사용해야 ${id}가 정상적으로 들어감
                // 파일 업로드 API 주소도 백엔드 설정에 맞게 확인 필요!
                const res = await api.post(`/api/member/mypage/upload`, formData);
                setProFileImg(res.data.imageUrl); 
                alert("사진 변경 완료");
            } catch (e) {
                console.error(e);
                alert("사진 변경 불가");
            }
        }
    };

    // 3. 전체 저장 버튼 (수정 요청)
    const handleSave = async () => {
        if (!id || id === 0 || id === "") {
            alert("사용자 ID를 찾을 수 없습니다.");
            return;
        }

        try {
            // 백엔드 @PutMapping("/update/{id}") 컨트롤러와 주소 맞춤
            await api.put(`/api/mypage/update/${id}`, { nickname, bio, profileImg });
            alert("수정 완료!");
        } catch (e) {
            console.error(e);
            alert("수정 실패");
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>프로필 수정</h2>
            
            {/* 이미지 수정 영역 */}
            <div style={{ marginBottom: "15px" }}>
                <img 
                    src={`http://localhost:8080/api/mypage/display?fileName=${profileImg}`} 
                    style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
                    onClick={() => fileInputRef.current?.click()} 
                    alt="프로필"
                    onError={(e) => {
                        // 이미지 로딩 실패 시 기본 이미지로 대체하는 방어 코드
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/100";
                    }}
                />
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                <p style={{ fontSize: "12px", color: "#666" }}>이미지를 클릭하면 사진을 변경할 수 있어.</p>
            </div>

            {/* 입력 폼 */}
            <div>
                <label>닉네임: </label>
                <input value={nickname} onChange={(e) => setNickName(e.target.value)} placeholder="닉네임" />
            </div>
            <br />
            <div>
                <label>자기소개: </label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="자기소개" />
            </div>
            <br />
            
            <button onClick={handleSave}>저장하기</button>
        </div>
    );
}

export default MyPageEditProfile;