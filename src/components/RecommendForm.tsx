import React, { useState } from "react";
import useGeolocation from "../hooks/useGeolocation";

// 기분 / 취향 태그 목록
const MOOD_TAGS = ['조용한 곳', '출발 하기 좋은 곳', '매운 음식', '사색/휴식', '분위기 좋은', '빠르게 먹는'];

function RecommendForm() {
    // 1. 위치 커스텀 훅 사용
    const { latitude, longitude, error: geoError, loading } = useGeolocation();

    // 2. 입력 상태값 관리
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [query, setQuery] = useState<string>("인천인데 맛집 소개해 줘");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [recommendationResult, setRecommendationResult] = useState<any>(null);

    // 태그 선택 토글 함수
    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    // 제출 핸들러 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!latitude || !longitude) {
            alert("위치 정보를 불러 오지 못했습니다.");
            return;
        }
        setIsSubmitting(true);

        const payload = {
            latitude,
            longitude,
            tags: selectedTags,
            query
        };

        // 임시 테스트 딜레이 
        setTimeout(() => {
            setRecommendationResult({
                message: "데이터 전송 성공",
                data: payload
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', textAlign: 'center' }}>
                위치 기반 맞춤 설정
            </h2>

            {/* 위치 상태 표시 바 */}
            <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#f0f4f8', borderRadius: '10px', fontSize: '14px' }}>
                <strong>현재 위치 상태: </strong>
                {loading && <span style={{ color: '#0284c7' }}>위치 정보를 계산 중입니다...</span>}
                {geoError && <span style={{ color: '#dc2626' }}>{geoError}</span>}
                {latitude && longitude && (
                    <span style={{ color: '#16a34a', fontWeight: '600' }}>
                        위치 확인 완료! (위도: {latitude.toFixed(4)}, 경도: {longitude.toFixed(4)})
                    </span>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                {/* 기분 태그 선택 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#374151', fontSize: '15px' }}>
                        지금 어떤 느낌의 장소를 원해?
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {MOOD_TAGS.map((tag) => {
                            const isSelected = selectedTags.includes(tag);
                            return (
                                <button
                                    type="button"
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    style={{
                                        padding: '8px 14px',
                                        borderRadius: '20px',
                                        border: isSelected ? '2px solid #2563eb' : '1px solid #d1d5db',
                                        backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                                        color: isSelected ? '#2563eb' : '#4b5563',
                                        cursor: 'pointer',
                                        fontWeight: isSelected ? 'bold' : 'normal',
                                        fontSize: '14px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    #{tag}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 질문 입력 창 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151', fontSize: '15px' }}>
                        AI에게 물어볼 내용
                    </label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', boxSizing: 'border-box', fontSize: '14px', outline: 'none' }}
                        placeholder="혼밥 하기 좋은 식당 알려줘"
                    />
                </div>

                {/* 제출 버튼 */}
                <button
                    type="submit"
                    disabled={isSubmitting || !latitude}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: !latitude ? '#9ca3af' : '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: !latitude ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    {isSubmitting ? 'AI가 추천 장소를 찾는 중...' : '맞춤 장소 찾기 🚀'}
                </button>
            </form>

            {/* 결과 테스트 출력 창 */}
            {recommendationResult && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#f3f4f6', borderRadius: '10px', fontSize: '13px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>테스트 전송 결과</h4>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#374151' }}>
                        {JSON.stringify(recommendationResult, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default RecommendForm;