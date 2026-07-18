import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";

function MyPageEditProfile() {
    // [상태 관리]
    const [id, setId] = useState<number | string>(""); // 사용자 PK
    const [nickname, setNickName] = useState("");      // 닉네임
    const [bio, setBio] = useState("");                // 자기소개
    const [profileImg, setProFileImg] = useState("");  // 프로필 이미지 경로/이름
    const [loading, setLoading] = useState(true);      // 데이터 로딩 상태
    const fileInputRef = useRef<HTMLInputElement>(null); // 파일 선택창 숨김을 위한 참조
    const navigate = useNavigate();
    const [useData, setUserData] = useState("");
 
    // [데이터 불러오기] 컴포넌트 마운트 시 1회 실행
// [데이터 불러오기]
// MyPage.js (마이페이지 조회 컴포넌트)
// [데이터 불러오기]
useEffect(() => {
    const targetId = localStorage.getItem("memberId");
    const effectiveId = targetId || 13;
    
    setLoading(true); // 로딩 시작

    api.get(`/api/mypage/${effectiveId}`) 
        .then(res => {
            console.log("서버 응답 성공:", res.data);
            
            // 1. 여기서 상태값을 다 채워줘야 함!
            setId(res.data.id);           // 이게 있어야 handleSave가 동작함
            setNickName(res.data.nickname || "");
            setBio(res.data.bio || "");
            setProFileImg(res.data.profileImg);
            setUserData(res.data);        // 현재 페이지 상태 저장
        })
        .catch(err => {
            console.error("데이터 불러오기 에러:", err);
            alert("프로필 정보를 불러오는 데 실패했습니다.");
        })
        .finally(() => setLoading(false)); // 2. 여기서 로딩을 끝내야 화면이 나옴!
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
    // 3. 여기서 id가 제대로 찍히는지 확인
    console.log("저장 시도하는 id값:", id);
    
    if (!id) {
        alert("사용자 정보를 불러오지 못했습니다.");
        return;
    }
    
    try {
        const response = await api.put(`/api/mypage/update/${id}`, {
            nickname: nickname,
            bio: bio
        });
        
        if (response) {
            alert("수정이 완료되었습니다.");
            navigate("/mypage"); // 완료 후 이동
        }
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