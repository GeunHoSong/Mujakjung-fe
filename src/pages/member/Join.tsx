import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';

function Join() {
    // --- 1. 상태 관리 (사용자 입력값 및 검증 상태) ---
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 완료 여부 (true/false)
    const [authCode, setAuthCode] = useState(""); // 이메일 인증 번호 입력값
    const [showAuthInput, setShowAuthInput] = useState(false); // 인증 번호 입력창 노출 여부

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    
    // 닉네임 및 중복 확인 상태
    const [nickname, setNickName] = useState("");
    const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 완료 여부

    const [phone, setPhone] = useState("");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 휴대폰 인증 상태 (추후 확장용)
    const [gender, setGender] = useState(""); // 성별 (M / F)
    const [zipcode, setZipcode] = useState(""); // 우편번호
    const [address, setAddress] = useState(""); // 기본 주소
    const [detailAddress, setDetailAddress] = useState(""); // 상세 주소
    const [agree, setAgree] = useState(false); // 필수 약관 동의 여부

    // --- 2. 이미지 및 부가 기능 상태 ---
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false); // 다음 주소 API 창 열기/닫기
    const [profileFile, setProfileFile] = useState<File | null>(null); // 업로드할 프로필 이미지 파일 객체
    const [previewUrl, setPreviewUrl] = useState(""); // 프로필 이미지 미리보기 URL
    const fileInputRef = useRef<HTMLInputElement>(null); // 숨겨진 파일 input에 접근하기 위한 ref
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    const SERVER_URL = "http://localhost:8080"; // 백엔드 서버 기본 주소

    // --- 3. 비즈니스 로직 함수들 ---

    // [이메일] 인증 번호 전송 요청
    const handleSendEmailAuth = async () => {
        if (!email) {
            alert("이메일을 입력하세요.");
            return;
        }
        try {
            const res = await fetch(`${SERVER_URL}/api/email/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                alert("인증코드가 전송되었습니다. 메일을 확인해보세요.");
                setShowAuthInput(true); // 인증 번호 입력창 활성화
            } else {
                alert("인증코드 전송에 실패했습니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // [이메일] 입력한 인증 코드 검증 요청
    const handleVerifiedEmailCode = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/api/email/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: authCode }),
            });
            
            if (res.ok) {
                alert("이메일 인증이 완료되었습니다.");
                setIsEmailVerified(true); // 인증 성공 처리
                setShowAuthInput(false); // 인증 입력창 닫기
            } else {
                alert("인증 코드가 일치하지 않습니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // [닉네임] 중복 확인 요청
    const handleCheckNickname = async () => {
        if (!nickname) {
            alert("닉네임을 입력하세요.");
            return;
        }
        try {
            const res = await fetch(`${SERVER_URL}/api/member/check-nickname?nickname=${nickname}`, {
                method: "GET",
            });
            
            if (!res.ok) {
                alert("서버 통신 중 오류가 발생했습니다.");
                return;
            }

            // 백엔드 응답값: true (중복됨), false (사용 가능)
            const isDuplicate = await res.json(); 

            // false여야 정상적으로 사용 가능
            if (!isDuplicate) {
                alert("사용 가능한 닉네임입니다.");
                setIsNicknameChecked(true); // 중복 확인 완료 처리
            } else {
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // [주소] 다음 주소 API 선택 완료 시 실행되는 콜백 함수
    const handleComplete = (data: any) => {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setIsPostcodeOpen(false); // 주소 검색창 닫기
    };

    // [이미지] 프로필 사진 선택 시 미리보기 URL 생성 함수
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // 브라우저 메모리에 임시 URL 생성
        }
    };

    // [회원가입] 최종 제출 함수 (FormData로 JSON 데이터와 이미지 파일을 함께 전송)
    const join = async () => {
        // 유효성 검사
        if (!agree) {
            alert("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }
        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        if (!isNicknameChecked) {
            alert("닉네임 중복 확인을 해주세요.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        
        // 백엔드로 보낼 회원 정보 객체 (DTO 매핑용)
        const memberData = {
            email, 
            password, 
            confirmPassword, 
            name, 
            nickname, 
            phone, 
            gender, 
            zipcode, 
            address, 
            detailAddress, 
            role: "USER" // 기본 회원 권한 설정
        };

        // JSON 데이터를 Blob 타입으로 변환하여 FormData에 추가
        formData.append("memberData", new Blob([JSON.stringify(memberData)], { type: "application/json" }));

        // 프로필 이미지가 존재할 경우 FormData에 추가
        if (profileFile) {
            formData.append("profileImage", profileFile);
        }

        try {
            const response = await fetch(`${SERVER_URL}/api/member/join`, {
                method: "POST",
                body: formData, // Content-Type은 브라우저가 multipart/form-data로 자동 설정
            });

            if (!response.ok) {
                alert("회원 가입 실패");
                return;
            }

            alert("회원 가입 성공! 환영합니다.");
            navigate("/login"); // 가입 성공 시 로그인 페이지로 이동
        } catch (error) {
            console.error("전송 에러:", error);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    };

    // --- 4. UI 렌더링 영역 ---
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>회원 가입</h2>

            {/* 프로필 이미지 업로드 영역 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div 
                    onClick={() => fileInputRef.current?.click()} // 원형 영역 클릭 시 숨겨진 file input 클릭 효과
                    style={{ 
                        width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #ccc',
                        margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', backgroundColor: '#f9f9f9', overflow: 'hidden',
                        backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                >
                    {!previewUrl && <span style={{ color: '#888', fontSize: '14px' }}>사진 등록</span>}
                </div>
                {/* 화면에 보이지 않는 파일 업로드 input */}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </div>

            {/* 이메일 입력 및 인증 번호 전송 버튼 */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="이메일" 
                    disabled={isEmailVerified}
                    style={{ flex: 1 }}
                />
                <button type="button" onClick={handleSendEmailAuth} disabled={isEmailVerified}>
                    {isEmailVerified ? "인증 완료" : "인증 번호 전송"}
                </button>
            </div>
            
            {/* 인증 번호 입력 칸 (인증 버튼 누른 후 노출) */}
            {showAuthInput && !isEmailVerified && (
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                    <input 
                        value={authCode} 
                        onChange={(e) => setAuthCode(e.target.value)} 
                        placeholder="인증 번호 입력" 
                        style={{ flex: 1 }}
                    />
                    <button type="button" onClick={handleVerifiedEmailCode}>확인</button>
                </div>
            )}
            <br/>

            {/* 비밀번호, 이름 입력 */}
            <input type="password" value={password} maxLength={16} onChange={(e) => setPassword(e.target.value)} placeholder="비밀 번호" /><br/><br/>
            <input type="password" value={confirmPassword} maxLength={16} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀 번호 확인" /><br/><br/>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" /><br/><br/>

            {/* 닉네임 입력 및 중복 확인 버튼 */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                <input 
                    value={nickname}  
                    onChange={(e) => setNickName(e.target.value)} 
                    placeholder="닉네임" 
                    disabled={isNicknameChecked} 
                    style={{ flex: 1 }}
                />
                <button type="button" onClick={handleCheckNickname} disabled={isNicknameChecked}>
                    {isNicknameChecked ? "확인 완료" : "중복 확인"}
                </button>
            </div><br/>

            {/* 전화번호, 성별 입력 */}
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화 번호 (- 없이 입력)" /><br/><br/>

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">성별 선택</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
            </select><br/><br/>

            {/* 우편번호 및 주소 검색 버튼 */}
            <div>
                <input value={zipcode} readOnly placeholder="우편 번호" style={{ width: '80px', marginRight: '5px' }} />
                <button type="button" onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}>주소 검색</button>
            </div><br/>

            {/* 다음 주소 API 컴포넌트 출력 영역 */}
            {isPostcodeOpen && (
                <div style={{ border: '1px solid #ccc', margin: '10px 0', position: 'relative' }}>
                    <DaumPostcode onComplete={handleComplete} />
                </div>
            )}

            {/* 기본 주소 및 상세 주소 입력 */}
            <input value={address} readOnly placeholder="기본 주소" style={{ width: '300px' }} /><br/><br/>
            <input value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세 주소" /><br/><br/>

            {/* 약관 동의 체크박스 */}
            <label style={{ fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                [필수] 개인정보 수집 및 이용에 동의합니다.
            </label><br/><br/>

            {/* 회원가입 완료 버튼 */}
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