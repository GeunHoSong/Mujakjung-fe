import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';

function Join() {
    // --- 1. 상태 관리 (사용자 입력값) ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhoen] = useState("");
    const [gender, setGender] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [agree, setAgree] = useState(false); // 약관 동의 체크 여부

    // --- 2. 이미지 및 부가 기능 상태 ---
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 우편번호 팝업 열림 상태
    const [profileFile, setProfileFile] = useState<File | null>(null); // 서버로 보낼 실제 이미지 파일
    const [previewUrl, setPreviewUrl] = useState(""); // 브라우저에 보여줄 미리보기 이미지 경로
    const fileInputRef = useRef<HTMLInputElement>(null); // 숨겨진 파일 input 태그에 접근하기 위한 변수
    const navigate = useNavigate(); // 가입 완료 후 페이지 이동을 위한 함수

    // --- 3. 이벤트 핸들러 (동작 로직) ---

    // [주소] 다음 주소 API 서비스 완료 시 실행
    const handleComplete = (data: any) => {
        setZipcode(data.zonecode); // 우편번호 저장
        setAddress(data.address);  // 기본 주소 저장
        setIsPostcodeOpen(false);  // 선택 후 검색창 닫기
    };

    // [이미지] 사진 선택 시 미리보기 생성
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 선택한 첫 번째 파일 가져오기
        if (file) {
            setProfileFile(file); // 실제 파일 상태 저장
            setPreviewUrl(URL.createObjectURL(file)); // 파일로 미리보기 주소 생성
        }
    };

    // --- 4. 회원가입 서버 전송 (API 통신) ---
    const join = async () => {
        // 필수 체크 (유효성 검사)
        if (!agree) {
            alert("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 이미지 포함 전송을 위해 FormData 객체 생성 (바구니 역할)
        const formData = new FormData();

        // 텍스트 데이터(JSON)를 객체로 묶어 Blob으로 변환 후 추가
        const memberData = {
            email, password, name, phone, gender, zipcode, address, detailAddress, role: "USER"
        };
        formData.append("memberData", new Blob([JSON.stringify(memberData)], { type: "application/json" }));

        // 이미지가 선택되었다면 파일 추가
        if (profileFile) {
            formData.append("profileImage", profileFile);
        }

        try {
            // 서버에 POST 요청 (FormData 전송 시 헤더의 Content-Type은 자동으로 설정됨)
            const response = await fetch("http://localhost:8080/api/member/join", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                alert("회원 가입 실패");
                return;
            }

            alert("회원 가입 성공! 환영합니다.");
            navigate("/login"); // 성공 시 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error("전송 에러:", error);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    };

    // --- 5. UI 렌더링 (화면 설계) ---
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>회원 가입</h2>

            {/* 프로필 이미지 등록 및 미리보기 영역 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div 
                    onClick={() => fileInputRef.current?.click()} // 클릭 시 파일 선택창 트리거
                    style={{ 
                        width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #ccc',
                        margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', backgroundColor: '#f9f9f9', overflow: 'hidden',
                        backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                >
                    {/* 선택된 사진이 없을 때만 텍스트 표시 */}
                    {!previewUrl && <span style={{ color: '#888', fontSize: '14px' }}>사진 등록</span>}
                </div>
                {/* 실제 파일 선택 input (화면에서 숨김) */}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </div>

            {/* 입력 폼 섹션 */}
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" /><br/><br/>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀 번호" /><br/><br/>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀 번호 확인" /><br/><br/>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" /><br/><br/>
            <input value={phone} onChange={(e) => setPhoen(e.target.value)} placeholder="전화 번호 (- 없이 입력)" /><br/><br/>

            {/* 성별 선택 드롭다운 */}
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">성별 선택</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
            </select><br/><br/>

            {/* 주소 검색 섹션 */}
            <div>
                <input value={zipcode} readOnly placeholder="우편 번호" style={{ width: '80px', marginRight: '5px' }} />
                <button type="button" onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}>주소 검색</button>
            </div><br/>

            {/* 카카오 주소 API 팝업 영역 (조건부 렌더링) */}
            {isPostcodeOpen && (
                <div style={{ border: '1px solid #ccc', margin: '10px 0', position: 'relative' }}>
                    <DaumPostcode onComplete={handleComplete} />
                </div>
            )}

            <input value={address} readOnly placeholder="기본 주소" style={{ width: '300px' }} /><br/><br/>
            <input value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세 주소" /><br/><br/>

            {/* 약관 동의 및 제출 버튼 */}
            <label style={{ fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                [필수] 개인정보 수집 및 이용에 동의합니다.
            </label><br/><br/>

            <button 
                onClick={join} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                회원 가입 완료
            </button>
        </div>
    );
}

export default Join;