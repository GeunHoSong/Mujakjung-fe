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
    console.log("데이터 불러오기 useEffect 진입"); // 추가
    const targetId = 13; // 실제 존재하는 ID로 확인
    setLoading(true);

    api.get(`/api/mypage/${targetId}`) 
        .then(res => {
            console.log("서버 응답 성공:", res.data); // 추가
            // ... 데이터 세팅
        })
        .catch(err => {
            console.error("데이터 불러오기 에러:", err); // 추가
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

const handleSave = async () => {
    try {
        // 백틱(`)을 사용하여 URL에 id를 포함시킵니다.
        const response = await api.put(`/api/mypage/update/${id}`, {
            nickname: nickname,
            bio: bio
        });
        
        console.log("저장 성공:", response.data);
        alert("수정이 완료되었습니다.");
    } catch (error) {
        console.error("저장 실패:", error);
        alert("저장에 실패했습니다.");
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
                    src={profileImg ? `http://localhost:8080/api/mypage/display?fileName=${profileImg}` : "/default-profile.png"} // 외부 URL 대신 로컬 public 폴더에 이미지 파일을 넣고 경로 수정
                    style={{ width: '100px', height: '100px', borderRadius: '50%', cursor: 'pointer' }} 
                    onClick={() => fileInputRef.current?.click()} 
                     alt="프로필"
                      // onError 로직에서 또 다른 외부 서버를 참조하지 않도록 주의하세요
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