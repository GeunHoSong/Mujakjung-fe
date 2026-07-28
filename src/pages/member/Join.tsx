import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';

function Join() {
    // --- 1. 상태 관리 (사용자 입력값) ---
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false); // boolean으로 변경
    const [authCode, setAuthCode] = useState("");
    const [showAuthInput, setShowAuthInput] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickName] = useState("");

    const [phone, setPhone] = useState(""); // 오타 수정 (setPhoen -> setPhone)
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [gender, setGender] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [agree, setAgree] = useState(false);

    // --- 2. 이미지 및 부가 기능 상태 ---
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:8081";

    // [이메일] 인증 번호 전송 함수
    const handleSendEmailAuth = async () => {
        if (!email) {
            alert("이메일을 입력하세요.");
            return;
        }
        try {
            const res = await fetch(`${SERVER_URL}/api/member/email-auth`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                alert("인증코드가 전송되었습니다. 메일을 확인해보세요.");
                setShowAuthInput(true);
            } else {
                alert("인증코드 전송에 실패했습니다.");
            }
        } catch (err: any) { // err 타입 에러 해결
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // [이메일] 인증 코드 확인 함수
    const handleVerifiedEmailCode = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/api/member/email-verified`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: authCode }),
            });
            
            if (res.ok) { // res.ok로 성공 여부 확인
                alert("이메일 인증이 완료되었습니다.");
                setIsEmailVerified(true);
                setShowAuthInput(false);
            } else {
                alert("인증 코드가 일치하지 않습니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    // [전화번호] 인증 번호 전송 요청
    const handleSendPhoneAuth = async () => {
        if (!phone) {
            alert("전화번호를 입력하세요.");
            return;
        }
        alert("인증하신 번호로 인증 번호가 전송되었습니다.");
    };

    // [전화번호] 인증 번호 확인
    const handleVerifiedPhoneCode = async () => {
        alert("휴대폰 인증이 완료 되었습니다.");
        setIsPhoneVerified(true);
    };

    // --- 3. 이벤트 핸들러 ---
    const handleComplete = (data: any) => {
        setZipcode(data.zonecode);
        setAddress(data.address);
        setIsPostcodeOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // --- 4. 회원가입 서버 전송 ---
    const join = async () => {
        if (!agree) {
            alert("약관에 동의해야 회원가입이 가능합니다.");
            return;
        }
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const formData = new FormData();
        const memberData = {
            email, password, name, phone, gender, zipcode, address, detailAddress, role: "USER"
        };
        formData.append("memberData", new Blob([JSON.stringify(memberData)], { type: "application/json" }));

        if (profileFile) {
            formData.append("profileImage", profileFile);
        }

        try {
            const response = await fetch("http://localhost:8080/api/member/join", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                alert("회원 가입 실패");
                return;
            }

            alert("회원 가입 성공! 환영합니다.");
            navigate("/login");
        } catch (error) {
            console.error("전송 에러:", error);
            alert("서버와 통신 중 문제가 발생했습니다.");
        }
    };

    // --- 5. UI 렌더링 ---
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>회원 가입</h2>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ 
                        width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #ccc',
                        margin: '0 auto', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', backgroundColor: '#f9f9f9', overflow: 'hidden',
                        backgroundImage: `url(${previewUrl})`, backgroundSize: 'cover', backgroundPosition: 'center'
                    }}
                >
                    {!previewUrl && <span style={{ color: '#888', fontSize: '14px' }}>사진 등록</span>}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            </div>

            <div>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" /><br/><br/>
                <button type="button" onClick={handleSendEmailAuth} disabled={isEmailVerified}>{isEmailVerified? "인증 완료": "인증 번호 전송"}</button>
            </div>
            {showAuthInput && !isEmailVerified && (
                <div style={{display: 'flex' , gap:'5px' , marginBottom: '10px'}}>
                    <input value={authCode} onChange={(e)=> setAuthCode(e.target.value)} placeholder="인증 번호 입력" style={{flex:1}}/>
                    <button type="button" onClick={handleVerifiedEmailCode}>확인</button>
                </div>
            )}
            <input type="password" value={password} maxLength={16} onChange={(e) => setPassword(e.target.value)} placeholder="비밀 번호" /><br/><br/>
            <input type="password" value={confirmPassword} maxLength={16} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀 번호 확인" /><br/><br/>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" /><br/><br/>
            <input value={nickname} onChange={(e) => setNickName(e.target.value)} placeholder="닉네임" />
            <div>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="전화 번호 (- 없이 입력)" /><br/><br/>
            </div>

            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">성별 선택</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
            </select><br/><br/>

            <div>
                <input value={zipcode} readOnly placeholder="우편 번호" style={{ width: '80px', marginRight: '5px' }} />
                <button type="button" onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}>주소 검색</button>
            </div><br/>

            {isPostcodeOpen && (
                <div style={{ border: '1px solid #ccc', margin: '10px 0', position: 'relative' }}>
                    <DaumPostcode onComplete={handleComplete} />
                </div>
            )}

            <input value={address} readOnly placeholder="기본 주소" style={{ width: '300px' }} /><br/><br/>
            <input value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세 주소" /><br/><br/>

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