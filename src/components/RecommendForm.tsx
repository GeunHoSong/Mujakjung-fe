
import React, { useState } from "react";

// 1. 부모 컴포넌트에서 전달받을 Props 타입 정의
interface RecommendFormProps {
    latitude: number | null;
    longitude: number | null;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    onSendToChat: (query: string) => void;
    onRecommendationReceived: (
    result: RecommendationResponse | null
) => void;
    
}

// 2. 기분별 장소 태그
const MOOD_TAGS = [
    '조용한 곳',
    '출발 하기 좋은 곳',
    '매운 음식',
    '사색/휴식',
    '분위기 좋은',
    '빠르게 먹는'
];

// 3. AI 추천 응답의 장소 정보 타입
interface ItineraryItem {
    time?: string;
    place?: string;
    description?: string;
    category?: string;
    address?: string;
    latitude?: number | null;
    longitude?: number | null;
    recommendation_reason?: string;
}

// 4. AI 추천 응답 타입
interface RecommendationResponse {
    title?: string;
    summary?: string;
    itinerary?: ItineraryItem[];
}


// 5. 추천 입력 및 결과 컴포넌트
function RecommendForm({
    latitude,
    longitude,
    selectedTags,
    setSelectedTags,
    onSendToChat,
    onRecommendationReceived
}: RecommendFormProps) {

    const [query, setQuery] = useState<string>(
        "인천인데 맛집 소개해 줘"
    );

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [recommendationResult, setRecommendationResult] =
        useState<RecommendationResponse | null>(null);

    // 6. 태그 선택 및 해제
    const toggleTag = (tag: string) => {
        setSelectedTags((prev: string[]) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    // 7. AI 추천 요청
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 위도와 경도가 없으면 요청하지 않음
        if (latitude == null || longitude == null) {
            alert("위치 정보를 불러오지 못했습니다. 위치 권한을 확인해 주세요.");
            return;
        }

        // 질문이 비어 있는지 확인
        if (!query.trim()) {
            alert("AI에게 물어볼 내용을 입력해 주세요.");
            return;
        }

        setIsSubmitting(true);
        onRecommendationReceived(null);

        // FastAPI 서버에 전달할 데이터
        const payload = {
            latitude,
            longitude,
            tags: selectedTags,
            query: query.trim()
        };

        try {
            const response = await fetch(
                "http://localhost:8001/api/ai/recommend",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            if (!response.ok) {
                throw new Error(
                    `FastAPI 서버 에러: ${response.status}`
                );
            }

           const data: RecommendationResponse = await response.json();
           console.log("FestApi 실제 응답: ", data );

            // 8. 내 컴포넌트 화면에 추천 결과 저장
            setRecommendationResult(data);

            // 9. 부모 컴포넌트에 추천 결과 전달
            onRecommendationReceived(data);

            // 10. AI 채팅창으로 질문 전달
            onSendToChat(query.trim());

        } catch (error) {
            console.error("추천 요청 실패:", error);

            alert(
                "AI 추천을 불러오지 못했습니다. FastAPI 서버와 API 응답을 확인해 주세요."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{maxWidth: '600px',margin: '40px auto',padding: '20px',fontFamily: 'sans-serif',background: '#ffffff',borderRadius: '12px',boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            {/* 10. 제목 */}
            <h2 style={{fontSize: '22px',fontWeight: 'bold',color: '#111827',marginBottom: '16px',textAlign: 'center'}}>
                위치 기반 맞춤 설정
            </h2>

            {/* 11. 현재 위치 상태 표시 */}
            <div style={{marginBottom: '20px',padding: '12px 16px',background: '#f0f4f8',borderRadius: '10px',fontSize: '14px'}}>
                <strong>현재 위치 상태: </strong>

                {latitude == null || longitude == null ? (
                    <span style={{ color: '#0284c7' }}>
                        위치 정보를 확인할 수 없습니다.
                    </span>
                ) : (
                    <span style={{color: '#16a34a',fontWeight: '600'}}>
                        위치 확인 완료! (위도: {latitude.toFixed(4)},경도: {longitude.toFixed(4)})
                    </span>
                )}
            </div>

            {/* 12. 사용자 입력 폼 */}
            <form onSubmit={handleSubmit}>

                {/* 기분 태그 선택 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{display: 'block',fontWeight: 'bold',marginBottom: '10px',color: '#374151',fontSize: '15px'}}>
                        지금 어떤 느낌의 장소를 원해?
                    </label>

                    <div style={{display: 'flex',flexWrap: 'wrap',gap: '8px'}}>
                        {MOOD_TAGS.map((tag) => {
                            const isSelected = selectedTags.includes(tag);

                            return (
                                <button type="button" key={tag}onClick={() => toggleTag(tag)}
                                    style={{padding: '8px 14px',borderRadius: '20px',border: isSelected? '2px solid #2563eb': '1px solid #d1d5db',
                                        backgroundColor: isSelected? '#eff6ff' : '#ffffff',color: isSelected? '#2563eb': '#4b5563',
                                        cursor: 'pointer',fontWeight: isSelected? 'bold': 'normal',
                                        fontSize: '14px',transition: 'all 0.2s ease'}}>
                                    #{tag}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 질문 입력 */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{display: 'block',fontWeight: 'bold',marginBottom: '8px',color: '#374151',fontSize: '15px'}}>
                        AI에게 물어볼 내용
                    </label>

                    <input type="text"value={query}onChange={(e) => setQuery(e.target.value)}style={{width: '100%',
                            padding: '12px 16px',borderRadius: '10px',border: '1px solid #d1d5db',boxSizing: 'border-box',fontSize: '14px',outline: 'none'}}
                        placeholder="혼밥하기 좋은 식당 알려줘"
                    />
                </div>

                {/* 추천 요청 버튼 */}
                <button type="submit"disabled={isSubmitting ||latitude == null ||longitude == null}
                    style={{width: '100%',padding: '14px',backgroundColor:isSubmitting ||latitude == null ||longitude == null? '#9ca3af': '#2563eb',
                        color: '#ffffff',border: 'none',borderRadius: '10px',fontSize: '16px',fontWeight: 'bold',
                        cursor:isSubmitting ||latitude == null ||longitude == null? 'not-allowed': 'pointer',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    {isSubmitting
                        ? 'AI가 추천 장소를 찾는 중...'
                        : '맞춤 장소 찾기 🚀'}
                </button>
            </form>

            {/* 13. AI 추천 결과 출력 */}
            {recommendationResult && (
                <div style={{marginTop: '24px',padding: '16px',background: '#f0fdf4',borderRadius: '10px',border: '1px solid #bbf7d0',fontSize: '14px'}}>
                    <h3 style={{color: '#166534',marginTop: 0,marginBottom: '12px'}}>
                         {recommendationResult.title || 'AI 맞춤 추천 결과'}
                    </h3>

                    {/* 전체 추천 설명 */}
                    {recommendationResult.summary && (
                        <p style={{color: '#374151',lineHeight: '1.6', whiteSpace: 'pre-line'}}>
                            {recommendationResult.summary}
                        </p>
                    )}

                    {/* 장소별 추천 카드 */}
                    {Array.isArray(recommendationResult.itinerary) &&
                    recommendationResult.itinerary.length > 0 ? (
                        recommendationResult.itinerary.map(
                            (item, index) => (
                                <div key={`${item.place || 'place'}-${index}`}style={{marginTop: '12px',padding: '14px',background: '#ffffff',border: '1px solid #e5e7eb',borderRadius: '10px'}}>
                                    <h4 style={{margin: '0 0 8px',color: '#111827',fontSize: '16px'}}>
                                        {index + 1}. {item.place || '장소명 없음'}
                                    </h4>

                                    {item.category && (
                                        <p style={{margin: '4px 0',color: '#2563eb'}}>
                                            {item.category}
                                        </p>
                                    )}

                                    {item.time && (
                                        <p style={{margin: '4px 0',color: '#4b5563'}}>
                                            {item.time}
                                        </p>
                                    )}

                                    {item.address && (
                                        <p style={{margin: '4px 0',color: '#4b5563'}}>
                                            {item.address}
                                        </p>
                                    )}

                                    {item.description && (
                                        <p style={{margin: '8px 0',color: '#374151',lineHeight: '1.6'}}>
                                            {item.description}
                                        </p>
                                    )}

                                    {item.recommendation_reason && (
                                        <p style={{margin: '8px 0 0',color: '#166534',lineHeight: '1.6'}}>
                                            추천 이유:{' '}
                                            {item.recommendation_reason}
                                        </p>
                                    )}

                                    {/* 지도 연결에 사용할 좌표 */}
                                    {item.latitude != null &&
                                    item.longitude != null && (
                                        <p style={{margin: '8px 0 0',color: '#6b7280',fontSize: '12px'}}>
                                            좌표 확인 완료
                                        </p>
                                    )}
                                </div>
                            )
                        )
                    ) : (
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                            표시할 일정이 없어요. 서버 응답에 title, summary,
                            itinerary가 포함되어 있는지 확인해 주세요.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default RecommendForm;
