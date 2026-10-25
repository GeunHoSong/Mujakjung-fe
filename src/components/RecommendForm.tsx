import React, { useState } from "react";

// 1. 부모로부터 받을 Props 타입 정의
interface RecommendFormProps {
    latitude: number | null;
    longitude: number | null;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    onSendToChat: (query: string) => void;
}

const MOOD_TAGS = ['조용한 곳', '출발 하기 좋은 곳', '매운 음식', '사색/휴식', '분위기 좋은', '빠르게 먹는'];

// 2. 파라미터로 props 구조분해 할당
function RecommendForm({ latitude, longitude, selectedTags, setSelectedTags, onSendToChat }: RecommendFormProps) {
    const [query, setQuery] = useState<string>("인천인데 맛집 소개해 줘");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [recommendationResult, setRecommendationResult] = useState<any>(null);

    // 태그 선택 토글 함수
    const toggleTag = (tag: string) => {
        setSelectedTags((prev: string[]) =>
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

        try {
            const response = await fetch("http://localhost:8001/api/ai/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`FastAPI 서버 에러: ${response.status}`);
            }

            const data = await response.json();
            setRecommendationResult(data);

            // 🚀 AI 채팅창으로 컨텍스트 전달!
            onSendToChat(query);

        } catch (error) {
            console.error("추천 요청 실패", error);
            alert("AI 추천을 불러오는데 실패했습니다. FastAPI 서버 상태를 확인해 주세요!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827', marginBottom: '16px', textAlign: 'center' }}>
                위치 기반 맞춤 설정
            </h2>

            {/* 위치 상태 표시 바 (부모로부터 받은 latitude/longitude 활용) */}
            <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#f0f4f8', borderRadius: '10px', fontSize: '14px' }}>
                <strong>현재 위치 상태: </strong>
                {!latitude && <span style={{ color: '#0284c7' }}>위치 정보를 계산 중입니다...</span>}
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

            {/* AI 맞춤 추천 결과 출력 창 */}
            {recommendationResult && (
                <div style={{ marginTop: '20px', padding: '16px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0', fontSize: '14px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#166534', fontWeight: 'bold' }}>✨ AI 맞춤 추천 결과</h4>
                    <div style={{ whiteSpace: 'pre-line', color: '#1f2937', lineHeight: '1.6' }}>
                        {recommendationResult.recommendation
                            ? recommendationResult.recommendation
                            : typeof recommendationResult === 'string'
                            ? recommendationResult
                            : JSON.stringify(recommendationResult, null, 2)}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecommendForm;