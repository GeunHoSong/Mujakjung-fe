import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import "./Join.css";

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

    // 전화번호 가운데 4자리
    const [phoneMiddle, setPhoneMiddle] = useState("");

    // 전화번호 마지막 4자리
    const [phoneLast, setPhoneLast] = useState("");

    // 서버로 보낼 전체 전화번호
    const phone = `010-${phoneMiddle}-${phoneLast}`;
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
    const [locationAgreed, setLocationAgreed] = useState(false);
    const [thirdPartyAgreed, setThirdPartyAgreed] = useState(false);
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

    setLocationAgreed(agreedData.location);
    setThirdPartyAgreed(agreedData.thirdParty);
    setIsModalOpen(false);
};

  
     //  취소 시 무조건 페이지가 뒤로 가던 부분을 잠시 막아두기
    const handleModalClose = () => {
        alert("약관에 동의해야 회원가입을 진행할 수 있습니다.");
        // navigate(-1); // 👈 이 부분을 주석 처리해서 뒤로 튕기는 현상 방지
        setIsModalOpen(false); // 모달만 닫히게 처리
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
        // ✅ 바로 여기에 추가!
        if (phoneMiddle.length !== 4 || phoneLast.length !== 4) {
            alert("휴대전화 번호를 정확히 입력해주세요.");
            return;
        }
        

        const formData = new FormData();
        const memberData = {
            email, password, confirmPassword, name, nickname, 
            phone, gender, zipcode, address, detailAddress, role: "USER" , locationAgreed, thirdPartyAgreed
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
        <div className="join-container">
            <div className="join-card">
                <h2 className="join-title">회원 가입</h2>

                
               {/* 프로필 이미지 업로드 영역 */}
                <div className="join-profile-container">
                    <div className="join-profile-image"onClick={() => fileInputRef.current?.click()}
                        style={{backgroundImage: previewUrl? `url(${previewUrl})`: "none"}}>
                        {!previewUrl && <span>사진 등록</span>}
                    </div>
                   <input type="file"ref={fileInputRef}onChange={handleFileChange}className="join-profile-input"accept="image/*"/>
                </div>

                {/* 이메일 입력 및 인증 번호 전송 버튼 */}
                <div className="join-input-row">
                    <input  value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" disabled={isEmailVerified} />
                    <button type="button" onClick={handleSendEmailAuth} disabled={isEmailVerified}>
                        {isEmailVerified ? "인증 완료" : "인증 번호 전송"}
                    </button>
                </div>
            
             {/* 인증 번호 입력 칸 */}
                {showAuthInput && !isEmailVerified && (
                    <div className="join-input-row">
                        <input 
                            value={authCode} 
                            onChange={(e) => setAuthCode(e.target.value)} 
                            placeholder="인증 번호 입력" 
                            
                        />
                        <button type="button" onClick={handleVerifiedEmailCode}>확인</button>
                    </div>
                )}

                {/* 비밀번호, 이름 입력 */}
                <input type="password" value={password} maxLength={16} onChange={(e) => setPassword(e.target.value)} placeholder="비밀 번호" />
                <input type="password" value={confirmPassword} maxLength={16} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀 번호 확인" />
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />

                {/* 닉네임 입력 및 중복 확인 버튼 */}
                <div className="join-input-row">
                    <input 
                        value={nickname}  
                        onChange={(e) => setNickName(e.target.value)} 
                        placeholder="닉네임" 
                        disabled={isNicknameChecked} 
                      
                    />
                    <button type="button" onClick={handleCheckNickname} disabled={isNicknameChecked}>
                     {isNicknameChecked ? "확인 완료" : "중복 확인"}
                    </button>
                </div>

                {/* 전화번호, 성별 입력 */}
                <div className="join-phone-row">
                    <input value={"010"} readOnly   />
                    <span >-</span>
                    <input value={phoneMiddle} onChange={(e)=> setPhoneMiddle(e.target.value.replace(/\D/g, ""))} 
                        maxLength={4} inputMode="numeric" placeholder="1234"  />
                    <span >-</span>
                    <input value={phoneLast}onChange={(e) =>setPhoneLast(e.target.value.replace(/\D/g, "")) }
                        maxLength={4}inputMode="numeric"placeholder="5678"/>
                </div>

                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">성별 선택</option>
                    <option value="M">남자</option>
                    <option value="F">여자</option>
                </select>

                {/* 우편번호 및 주소 검색 버튼 */}
                <div className="join-address-row">
                    <input value={zipcode} readOnly placeholder="우편 번호"  />
                    <button type="button" onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}>주소 검색</button>
                </div>

                {/* 다음 주소 API 컴포넌트 출력 영역 */}
                {isPostcodeOpen && (
                    <div className="join-postcode-popup">
                        <DaumPostcode onComplete={handleComplete} />
                    </div>
                )}

                {/* 기본 주소 및 상세 주소 입력 */}
                <input value={address} readOnly placeholder="기본 주소"  />
                <input value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세 주소" />

                {/* 최종 회원가입 완료 버튼 */}
                <button className="join-submit-button" type="button"onClick={handleFinalJoin} >회원 가입 완료</button>

                {/* 페이지 진입 시 뜨는 약관 동의 모달 */}
                <PrivacyPolicyModal 
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onAgree={handleModalAgree}
                />
            </div>    
        </div>
    );
}

export default Join;