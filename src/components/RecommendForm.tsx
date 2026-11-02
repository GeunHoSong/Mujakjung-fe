
import React, { useState } from "react";
import "./RecommendForm.css"

// 1. 부모 컴포넌트에서 전달받을 Props 타입 정의
interface RecommendFormProps {
    latitude: number | null;
    longitude: number | null;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
    onFindLocation : ()=> void;
    onRecommend: (query: string , category: string) => void;
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
// 5. 추천 입력 및 결과 컴포넌트
function RecommendForm({
    latitude,
    longitude,
    selectedTags,
    setSelectedTags,
    onFindLocation,
    onRecommend
}: RecommendFormProps) {

  const [selectedCategory , setSelectedCategory]= React.useState("AI 여행"); 
  const [query , setQuery] = useState("");
    // 여행 예산: 기본 10만원
    const [budget, setBudget] = useState<number>(100000);
    // 최대 이동 거리: 기본 20km
    const [maxDistance, setMaxDistance] = useState<number>(20);
    // 이동수단: 기본 자동차
    const [transport, setTransport] = useState<string>("car");

    // 최대 이동시간: 기본 60분
    const [maxTravelTime, setMaxTravelTime] = useState<number>(60);


    // 6. 태그 선택 및 해제
    const toggleTag = (tag: string) => {
        setSelectedTags((prev: string[]) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };
    // 추천 버튼 클릭 시 실행
    const handleRecommend = () => {

        // 입력 내용이 비어 있는지 확인
        if (!query.trim()) {
        alert("어떤 여행을 원하는지 입력해 주세요.");
        return;
        }

        // 현재 위치 확인
        if (latitude == null || longitude == null) {
            alert("먼저 위치를 확인해 주세요.");
        return;
    }

    // 부모 컴포넌트에 입력 내용 전달
    onRecommend(query.trim(), selectedCategory);
};
    return (
        <div  className="recommend-card">
            {/* 여행 카테고리 선택 */}
            <div className="category-tabs">
                {["AI 여행", "테마 여행", "맞춤 여행"].map((category)=> (
                    <button type="button" key={category} onClick={()=> setSelectedCategory(category)} className={selectedCategory === category ? "category-tab active" :"category-tab"}>
                        {category}
                    </button>
                ))}
            </div>
            {/* 10. 제목 */}
            <h2 className="recommend-title" >
            </h2>

            {/* 11. 현재 위치 상태 표시 */}
            <div className="location-box">
                {latitude == null || longitude == null ? (
                    <>
                        <span className="location-lcon">📍</span>
                        <strong>내위치</strong>
                        <p>위치 확인이 필요해요</p>
                    </>
                ):(
                    <>
                        <span className="location-lcon">📍</span>
                        <strong>내 위치</strong>
                        <p>현재 위치를 확인 했어요</p>
                    </>

                )}
                <button type="button" className="location-button" onClick={onFindLocation}>현재 위치 찾기</button>
            </div>

            {/* 12. 사용자 입력 폼 */}
            <div>
                {/*맞춤 여행 탭에서만 표시 */}
                {selectedCategory === "맞춤 여행" && (
                    <div className="custom-travel-section">
                        {/*여행 예산 설정*/}
                        <div className="custom-travel-field">
                            <label htmlFor="travel-budget">
                                여행계산
                            </label>
                            <strong>
                                {budget.toLocaleString()}원
                            </strong>
                            <input id="travel-budget" type="range" min={10000} max={500000}step={1000} value={budget} onChange={(e) => setBudget(Number(e.target.value))} />

                        </div>
                        {/* 맞춤 여행 탭에서만 표시 */}]
                        <div className="custom-tavel-field">
                            <label htmlFor="travel-distance">
                                최대 이동 거리 
                            </label>
                            <strong>{maxDistance}</strong>
                            <input id="travel-distance" type="range" min={1} max={100} step={1} value={maxDistance} onChange={(e)=> setMaxDistance(Number(e.target.value))}/>

                        </div>
                        {/*이동 수단 선택  */}
                        <div className="custom-travel-field">
                            <label htmlFor="travel-transport">
                                이동 수단
                            </label>
                            <select id="travel-transport" value={transport} onChange={(e)=> setMaxTravelTime(Number(e.target.value))}>
                                <option value="car">자동차</option>
                                <option value="transit">대중교통</option>
                                <option value="walk">지하철</option>

                            </select>

                        </div>
                    </div>
                    
                )}

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
                <div className="query-section">
                    <label className="query-label">
                        어떤 여행을 하고 싶어 ?
                    </label>
                    <input type="text" className="recommend-input" value={query} onChange={(e)=> setQuery(e.target.value)} />

                </div>
                {/* AI 여행 상담 시작 버튼 */}
                <button type="button" className="recommend-button" onClick={handleRecommend}>  AI 여행 상담 및 추천받기</button>
            </div>

           
        </div>
    );
}

export default RecommendForm;
