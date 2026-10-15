import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import PrivacyPolicyModal from './PrivacyPolicyModal';

function Join() {
    // --- 1. 상태 관리 ---
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [showAuthInput, setShowAuthInput] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    
    const [nickname, setNickName] = useState("");
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    
    // 💡 핵심: 페이지 진입 시 바로 모달이 뜨도록 초기값을 true로 설정!
    const [isModalOpen, setIsModalOpen] = useState(true);

    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const SERVER_URL = "http://localhost:8080";

    // --- 3. 비즈니스 로직 함수들 ---

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
                setShowAuthInput(true);
            } else {
                alert("인증코드 전송에 실패했습니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

    const handleVerifiedEmailCode = async () => {
        try {
            const res = await fetch(`${SERVER_URL}/api/email/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: authCode }),
            });
            
            if (res.ok) {
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

            const isDuplicate = await res.json(); 

            if (!isDuplicate) {
                alert("사용 가능한 닉네임입니다.");
                setIsNicknameChecked(true);
            } else {
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (err: any) {
            console.error(err);
            alert("서버 통신 중 오류가 발생했습니다.");
        }
    };

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

    // 💡 모달에서 약관 동의를 완료했을 때 실행되는 함수 (모달을 닫고 폼 입력 허용)
    const handleModalAgree = (agreedData: any) => {
        console.log("약관 동의 완료:", agreedData);
        setIsModalOpen(false);
    };

    // 💡 사용자가 약관 동의를 거부하고 취소를 눌렀을 때 (이전 페이지로 튕겨내기)
    const handleModalClose = () => {
        alert("약관에 동의해야 회원가입을 진행할 수 있습니다.");
        navigate(-1); // 이전 페이지로 이동
    };

    // 💡 마지막 '회원 가입 완료' 버튼을 눌렀을 때 최종 서버 전송 함수
    const handleFinalJoin = async () => {
        if (!isEmailVerified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        if (!isNicknameChecked) {
            alert("닉네임 중복 확인을 해주세요.");
            return;
        }
        if (!password || password !== confirmPassword) {
            alert("비밀번호가 일치하지 않거나 입력되지 않았습니다.");
            return;
        }

        const formData = new FormData();
        const memberData = {
            email, password, confirmPassword, name, nickname, 
            phone, gender, zipcode, address, detailAddress, role: "USER"
        };

        formData.append("memberData", new Blob([JSON.stringify(memberData)], { type: "application/json" }));

        if (profileFile) {
            formData.append("profileImage", profileFile);
        }

        try {
            const response = await fetch(`${SERVER_URL}/api/member/join`, {
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

    // --- 4. UI 렌더링 영역 ---
    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>회원 가입</h2>

            {/* 프로필 이미지 업로드 영역 */}
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
            
            {/* 인증 번호 입력 칸 */}
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

            {/* 최종 회원가입 완료 버튼 */}
            <button 
                type="button"
                onClick={handleFinalJoin} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                회원 가입 완료
            </button>

            {/* 💡 페이지 진입 시 뜨는 약관 동의 모달 */}
            <PrivacyPolicyModal 
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onAgree={handleModalAgree}
            />
        </div>
    );
}

export default Join;