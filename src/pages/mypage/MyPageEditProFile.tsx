import React, { useState, useEffect, useRef } from "react";
import api from "../../axiosConfig";

function MyPageEditProfile() {
    // [상태 관리]
    const [id, setId] = useState<number | string>(""); // 사용자 PK
    const [nickname, setNickName] = useState("");      // 닉네임
    const [bio, setBio] = useState("");                // 자기소개
    const [profileImg, setProFileImg] = useState("");  // 프로필 이미지 경로/이름
    const [loading, setLoading] = useState(true);      // 데이터 로딩 상태
    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 선택창 숨김을 위한 참조

    // [데이터 불러오기] 컴포넌트 마운트 시 1회 실행
    useEffect(() => {
        const targetId = 1; // 추후 로그인 정보(Auth)에서 가져오도록 수정 필요
        setLoading(true);

        api.get(`/api/mypage/${targetId}`) 
            .then(res => {
                const { id, nickname, bio, profileImg } = res.data;
                setId(id);
                setNickName(nickname);
                setBio(bio);
                setProFileImg(profileImg);
            })
            .catch(err => {
                console.error("데이터 불러오기 에러:", err);
                alert("프로필 정보를 불러오는 데 실패했습니다.");
            })
            .finally(() => setLoading(false));
    }, []);

    // [이미지 업로드] 파일 변경 시 서버로 바로 전송
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file); 

        try {
            const res = await api.post(`/api/member/mypage/upload`, formData);
            setProFileImg(res.data.imageUrl); // 서버에서 반환된 이미지 경로 업데이트
            alert("사진 변경 완료");
        } catch (e) {
            console.error("이미지 업로드 에러:", e);
            alert("사진 업로드 중 오류가 발생했습니다.");
        }
    };

    // [정보 저장] 수정된 닉네임과 자기소개 서버 저장
    const handleSave = async () => {
        if (!id) return;

        try {
            await api.put(`/api/mypage/update/${id}`, { nickname, bio, profileImg });
            alert("수정 완료!");
        } catch (e) {
            console.error("저장 에러:", e);
            alert("수정 실패");
        }
    };

    // [로딩 화면] 데이터가 올 때까지 표시
    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>프로필 수정</h2>
            
            {/* 프로필 이미지 영역 */}
            <div style={{ marginBottom: "15px" }}>
                <img 
                    // 프로필 이미지가 있으면 보여주고, 없으면 기본 이미지(placeholder) 출력
                    src={profileImg ? `http://localhost:8080/api/mypage/display?fileName=${profileImg}` : "https://via.placeholder.com/100"} 
                    style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
                    onClick={() => fileInputRef.current?.click()} 
                    alt="프로필"
                    onError={(e) => (e.target as HTMLImageElement).src = "https://via.placeholder.com/100"}
                /> 
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                <p style={{ fontSize: "12px", color: "#666" }}>이미지를 클릭하면 사진을 변경할 수 있습니다.</p>
            </div>

            {/* 입력 폼 영역 */}
            <div>
                <label>닉네임: </label>
                <input value={nickname} onChange={(e) => setNickName(e.target.value)} />
            </div>
            <br />
            <div>
                <label>자기소개: </label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <br />
            
            <button onClick={handleSave}>저장하기</button>
        </div>
    );
}

export default MyPageEditProfile;