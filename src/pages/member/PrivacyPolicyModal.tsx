import React, { useState } from "react";

// 컴포넌트에서 받을 props 타입 정의
interface PrivacyPolicyModalProps {
  isOpen?: boolean;                      // 모달창 오픈 여부 (기본값 true)
  onClose?: () => void;                  // 취소 또는 닫기 버튼 클릭 시 실행할 함수
  onAgree?: (agreedData: any) => void;   // 필수 동의 완료 후 데이터를 전달하며 실행할 함수
}

function PrivacyPolicyModal({ isOpen = true, onClose, onAgree }: PrivacyPolicyModalProps) {
    
    // --- 1. 상태(State) 관리 ---

    // 개별 약관 동의 여부 상태 관리 (위치기반, AI 추천 제3자 제공)
    const [agreed, setAgreed] = useState({
        location: false,
        thirdParty: false,
    });

    // 각 약관 항목의 상세 내용(아코디언) 펼침/접힘 상태 관리
    const [expanded, setExpanded] = useState({
        location: false,
        thirdParty: false,
    });

    // --- 2. 가드 조건문 ---

    // isOpen 값이 false인 경우 모달을 아예 렌더링하지 않음 (숨김 처리)
    if (!isOpen) return null;

    // --- 3. 비즈니스 로직 및 핸들러 함수 ---

    // 모든 필수 항목(위치 + 제3자 제공)이 체크되었는지 확인하는 변수
    const allAgreed = agreed.location && agreed.thirdParty;

    // [전체 동의하기] 체크박스 클릭 핸들러
    const handleAllCheck = (checked: boolean) => {
        setAgreed({
            location: checked, 
            thirdParty: checked
        });
    };

    // [개별 동의] 체크박스 클릭 핸들러 (이전 상태를 반전시킴)
    const handleSingleCheck = (key: 'location' | 'thirdParty') => {
        setAgreed((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    // [내용보기/닫기] 아코디언 토글 핸들러
    const toggleAccordion = (key: 'location' | 'thirdParty') => {
        setExpanded((prev) => ({
            ...prev, 
            [key]: !prev[key]
        }));
    };

    // [동의하고 시작하기] 완료 버튼 클릭 핸들러
    const handleSubmit = () => {
        // 필수 항목이 모두 동의된 경우에만 실행
        if (allAgreed) {
            if (onAgree) onAgree(agreed); // 부모 컴포넌트로 동의 결과 전달
            if (onClose) onClose();       // 모달 창 닫기 실행
        }
    };

    // --- 4. UI 렌더링 영역 ---
    return (
        /* 화면 전체를 어둡게 덮고 중앙에 팝업창을 띄우는 오버레이 스타일 */
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // 배경 어두운 반투명 처리
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',       // 가로세로 중앙 정렬
            zIndex: 9999,                   // 다른 요소들보다 위에 뜨도록 설정
        }}>
            {/* 모달 박스 본체 */}
            <div style={{
                width: '100%',
                maxWidth: '500px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden',
                padding: '24px',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                
                {/* 모달 헤더 영역 (제목 및 부제목) */}
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111', margin: 0 }}>
                        개인정보 수집 및 이용 동의
                    </h2>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>
                        '무작정(Mujakjung)' 서비스 제공을 위한 동의서
                    </p>
                </div>

                {/* 모달 본문 영역 (스크롤 가능) */}
                <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
                    
                    {/* 전체 동의하기 선택 상자 */}
                    <div 
                        onClick={() => handleAllCheck(!allAgreed)}
                        style={{
                            padding: '12px 16px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px',
                            border: '1px solid #dee2e6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            marginBottom: '16px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input 
                                type="checkbox" 
                                id="all-agree" 
                                checked={allAgreed} 
                                onChange={(e) => handleAllCheck(e.target.checked)} 
                                onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <label htmlFor="all-agree" style={{ fontWeight: 'bold', fontSize: '14px', color: '#333', cursor: 'pointer' }}>
                                전체 동의하기
                            </label>
                        </div>
                        <span style={{ fontSize: '11px', color: '#888' }}>필수 항목 전체 포함</span>
                    </div>

                    {/* 개별 약관 동의 목록 박스들 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        
                        {/* 1. 실시간 위치기반 정보 수집 동의 항목 */}
                        <div style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input 
                                        type="checkbox" 
                                        id="agree-location" 
                                        checked={agreed.location} 
                                        onChange={() => handleSingleCheck('location')}
                                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="agree-location" style={{ fontSize: '13px', color: '#333', cursor: 'pointer' }}>
                                        <strong style={{ color: '#007bff' }}>[필수]</strong> 위치 기반 맛집 추천 정보 수집
                                    </label>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => toggleAccordion('location')} 
                                    style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '12px', cursor: 'pointer' }}
                                >
                                    {expanded.location ? '닫기 ▲' : '내용보기 ▼'}
                                </button>
                            </div>

                            {/* 아코디언 펼쳐졌을 때 보여지는 상세 내용 */}
                            {expanded.location && (
                                <div style={{ padding: '12px 16px', backgroundColor: '#fdfdfd', borderTop: '1px solid #eee', fontSize: '11px', color: '#555', lineHeight: '1.4' }}>
                                    <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>수집 항목: 실시간 좌표 (위도, 경도)</p>
                                    <p style={{ margin: 0 }}>Kakao Local API를 연동하여 내 주변 맛집 및 장소 검색에 이용되며, 검색 응답 완료 즉시 파기됩니다.</p>
                                </div>
                            )}
                        </div>

                        {/* 2. AI 추천 및 제3자 제공 동의 항목 */}
                        <div style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden' }}>
                            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input 
                                        type="checkbox" 
                                        id="agree-thirdparty" 
                                        checked={agreed.thirdParty} 
                                        onChange={() => handleSingleCheck('thirdParty')}
                                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="agree-thirdparty" style={{ fontSize: '13px', color: '#333', cursor: 'pointer' }}>
                                        <strong style={{ color: '#007bff' }}>[필수]</strong> AI 맞춤 추천 및 제3자 위탁 동의
                                    </label>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => toggleAccordion('thirdParty')} 
                                    style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '12px', cursor: 'pointer' }}
                                >
                                    {expanded.thirdParty ? '닫기 ▲' : '내용보기 ▼'}
                                </button>
                            </div>

                            {/* 아코디언 펼쳐졌을 때 보여지는 상세 내용 */}
                            {expanded.thirdParty && (
                                <div style={{ padding: '12px 16px', backgroundColor: '#fdfdfd', borderTop: '1px solid #eee', fontSize: '11px', color: '#555', lineHeight: '1.4' }}>
                                    <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>제3자 제공 및 AI 처리 안내</p>
                                    <p style={{ margin: 0 }}>Google Gemini API에 장소 정보를 전달하여 자연스러운 AI 맞춤 추천 멘트를 생성합니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 안내 문구 */}
                    <p style={{ fontSize: '11px', color: '#888', marginTop: '12px', margin: '12px 0 0 0' }}>
                        * 필수 항목에 동의하지 않을 경우 위치 기반 맞춤 추천 기능을 사용할 수 없습니다.
                    </p>
                </div>

                {/* 모달 하단 버튼 영역 (취소 / 동의하고 시작하기) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '16px', marginTop: '16px' }}>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: '10px 16px',
                                backgroundColor: '#e9ecef',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                color: '#495057',
                            }}
                        >
                            취소
                        </button>
                    )}
                    {/* 모든 필수 항목에 동의해야만 활성화되는 버튼 */}
                    <button
                        type="button"
                        disabled={!allAgreed}
                        onClick={handleSubmit}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: allAgreed ? '#007bff' : '#ced4da', // 동의 여부에 따른 색상 변경
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: allAgreed ? 'pointer' : 'not-allowed',
                        }}
                    >
                        동의하고 시작하기
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PrivacyPolicyModal;