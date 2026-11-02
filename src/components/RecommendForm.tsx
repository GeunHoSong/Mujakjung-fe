
import React, { useState } from "react";
import "./RecommendForm.css";

/* ==========================================
   1. 부모 컴포넌트에서 전달받는 Props 타입
========================================== */

interface RecommendFormProps {
    // 현재 위치의 위도
    latitude: number | null;

    // 현재 위치의 경도
    longitude: number | null;

    // 사용자가 선택한 기분 태그 목록
    selectedTags: string[];

    // 선택된 기분 태그를 변경하는 함수
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;

    // 현재 위치 찾기 버튼을 눌렀을 때 실행할 함수
    onFindLocation: () => void;

    // AI 여행 추천 요청을 부모 컴포넌트로 전달하는 함수
    // query: 사용자가 원하는 여행 내용
    // category: AI 여행 / 테마 여행 / 맞춤 여행
    onRecommend: (query: string, category: string) => void;
}

/* ==========================================
   2. 기분별 장소 태그 목록
========================================== */

// 사용자가 원하는 장소의 분위기를 선택할 때 사용
const MOOD_TAGS = [
    "조용한 곳",
    "출발 하기 좋은 곳",
    "매운 음식",
    "사색/휴식",
    "분위기 좋은",
    "빠르게 먹는"
];

/* ==========================================
   3. 테마 여행 카테고리 목록
========================================== */

// 테마 여행 탭에서 보여줄 여행 주제
const THEME_TAGS = [
    "힐링·휴식",
    "맛집 투어",
    "자연 여행",
    "문화·역사",
    "액티비티",
    "야경 명소"
];

/* ==========================================
   4. 여행 추천 입력 컴포넌트
========================================== */

function RecommendForm({
    latitude,
    longitude,
    selectedTags,
    setSelectedTags,
    onFindLocation,
    onRecommend
}: RecommendFormProps) {

    /* ======================================
       5. useState 상태 관리
    ====================================== */

    // 현재 선택한 여행 탭
    // 처음에는 AI 여행이 선택됨
    const [selectedCategory, setSelectedCategory] =
        useState<string>("AI 여행");

    // 사용자가 직접 입력한 여행 요청 내용
    const [query, setQuery] = useState("");

    // 사용자가 선택한 테마 여행 주제
    // 처음에는 선택된 테마가 없음
    const [selectedTheme, setSelectedTheme] =
        useState<string>("");

    // 여행 예산
    // 기본값은 100,000원
    const [budget, setBudget] =
        useState<number>(100000);

    // 최대 이동 거리
    // 기본값은 20km
    const [maxDistance, setMaxDistance] =
        useState<number>(20);

    // 이동수단
    // 기본값은 자동차(car)
    const [transport, setTransport] =
        useState<string>("car");

    // 최대 이동시간
    // 기본값은 60분
    // 현재는 상태만 선언되어 있고 UI나 AI 요청에는 연결되지 않음
    const [maxTravelTime, setMaxTravelTime] =
        useState<number>(60);

    /* ======================================
       6. 기분 태그 선택 및 해제 함수
    ====================================== */

    const toggleTag = (tag: string) => {

        // 이전에 선택된 태그 목록을 가져옴
        setSelectedTags((prev: string[]) =>

            // 이미 선택한 태그라면 목록에서 제거
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)

                // 선택하지 않은 태그라면 목록에 추가
                : [...prev, tag]
        );
    };

    /* ======================================
       7. AI 여행 추천 버튼 클릭 함수
    ====================================== */

    const handleRecommend = () => {

        // 1. 현재 위치가 있는지 확인
        if (latitude == null || longitude == null) {
            alert("먼저 위치를 확인해 주세요.");
            return;
        }

        // 2. 테마 여행 탭을 선택한 경우
        if (selectedCategory === "테마 여행") {

            // 선택한 테마가 없으면 추천 요청 중단
            if (!selectedTheme) {
                alert("여행 테마를 선택해 주세요.");
                return;
            }

            // 선택한 테마와 사용자의 추가 입력을 결합
            const themeQuery =
                `${selectedTheme} 테마에 맞는 여행 일정을 추천해 줘. ${query.trim()}`;

            // 부모 컴포넌트에 여행 요청 전달
            onRecommend(themeQuery, selectedCategory);

            // 테마 여행 요청을 보낸 뒤 함수 종료
            return;
        }

        // 3. AI 여행과 맞춤 여행은 입력 내용 확인
        if (!query.trim()) {
            alert("어떤 여행을 원하는지 입력해 주세요.");
            return;
        }

        // 4. 일반 여행 추천 요청 전달
        // 주의: 맞춤 여행의 예산, 거리, 이동수단은 아직 전달되지 않음
        onRecommend(query.trim(), selectedCategory);
    };

    /* ======================================
       8. 여행 추천 화면 JSX
    ====================================== */

    return (
        <div className="recommend-card">

            {/* =================================
                9. 여행 카테고리 선택 탭
            ================================= */}

            <div className="category-tabs">

                {["AI 여행", "테마 여행", "맞춤 여행"].map(
                    (category) => (

                        <button
                            type="button"
                            key={category}

                            // 클릭한 카테고리를 상태에 저장
                            onClick={() => setSelectedCategory(category)}

                            // 선택된 탭에는 active 클래스 적용
                            className={
                                selectedCategory === category
                                    ? "category-tab active"
                                    : "category-tab"
                            }
                        >
                            {category}
                        </button>
                    )
                )}

            </div>

            {/* =================================
                10. 여행 추천 제목 영역
            ================================= */}

            <h2 className="recommend-title">
            </h2>

            {/* =================================
                11. 현재 위치 상태 표시
            ================================= */}

            <div className="location-box">

                {/* 위치가 확인되지 않은 경우 */}
                {latitude == null || longitude == null ? (
                    <>
                        <span className="location-lcon">📍</span>
                        <strong>내 위치</strong>
                        <p>위치 확인이 필요해요</p>
                    </>
                ) : (

                    // 위치가 확인된 경우
                    <>
                        <span className="location-lcon">📍</span>
                        <strong>내 위치</strong>
                        <p>현재 위치를 확인했어요</p>
                    </>
                )}

                {/* 현재 위치 다시 찾기 버튼 */}
                <button
                    type="button"
                    className="location-button"
                    onClick={onFindLocation}
                >
                    현재 위치 찾기
                </button>

            </div>

            {/* 12. 사용자 여행 조건 입력 영역*/}

            <div>

                {/* 13. 테마 여행 선택 영역 테마 여행 탭에서만 표시 */}

                {selectedCategory === "테마 여행" && (

                    <div className="theme-travel-section">

                        <h3>어떤 테마로 여행을 하고 싶어요?</h3>

                        <div className="theme-list">

                            {THEME_TAGS.map((theme) => (

                                <button
                                    type="button"
                                    key={theme}

                                    // 클릭한 테마를 상태에 저장
                                    onClick={() => setSelectedTheme(theme)}

                                    // 선택한 테마 버튼에 active 적용
                                    className={
                                        selectedTheme === theme
                                            ? "theme_button active"
                                            : "theme_button"
                                    }
                                >
                                    {theme}
                                </button>
                            ))}

                        </div>
                    </div>
                )}

                {/* 14. 맞춤 여행 설정 영역 맞춤 여행 탭에서만 표시 */}

                {selectedCategory === "맞춤 여행" && (

                    <div className="custom-travel-section">

                        {/* 14-1. 여행 예산 설정 */}
                        <div className="custom-travel-field">

                            <label htmlFor="travel-budget">
                                여행 예산
                            </label>

                            {/* 숫자에 천 단위 쉼표 적용 */}
                            <strong>
                                {budget.toLocaleString()}원
                            </strong>

                            {/* 예산을 슬라이더로 조절 */}
                            <input
                                id="travel-budget"
                                type="range"
                                min={10000}
                                max={500000}
                                step={1000}
                                value={budget}

                                // 슬라이더 값을 숫자로 변환해 저장
                                onChange={(e) =>
                                    setBudget(Number(e.target.value))
                                }
                            />

                        </div>

                        {/* 14-2. 최대 이동 거리 설정 */}
                        <div className="custom-travel-field">

                            <label htmlFor="travel-distance">
                                최대 이동 거리
                            </label>

                            {/* 현재 선택한 이동 거리 */}
                            <strong>{maxDistance}km</strong>

                            <input
                                id="travel-distance"
                                type="range"
                                min={1}
                                max={100}
                                step={1}
                                value={maxDistance}

                                // 선택한 거리 값을 상태에 저장
                                onChange={(e) =>
                                    setMaxDistance(Number(e.target.value))
                                }
                            />

                        </div>

                        {/* 14-3. 이동수단 선택 */}
                        <div className="custom-travel-field">

                            <label htmlFor="travel-transport">
                                이동 수단
                            </label>

                            <select
                                id="travel-transport"
                                value={transport}

                                // 선택한 이동수단을 문자열로 저장
                                onChange={(e) =>
                                    setTransport(e.target.value)
                                }
                            >
                                <option value="car">자동차</option>
                                <option value="transit">대중교통</option>
                                <option value="walk">도보</option>
                            </select>

                        </div>

                    </div>
                )}

                {/* 15. 기분 태그 선택 영역 */}

                <div style={{ marginBottom: "20px" }}>

                    <label
                        style={{
                            display: "block",
                            fontWeight: "bold",
                            marginBottom: "10px",
                            color: "#374151",
                            fontSize: "15px"
                        }}
                    >
                        지금 어떤 느낌의 장소를 원해?
                    </label>

                    {/* 태그 버튼을 가로로 배치하고 자동 줄바꿈 */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px"
                        }}
                    >

                        {MOOD_TAGS.map((tag) => {

                            // 현재 태그가 선택되어 있는지 확인
                            const isSelected = selectedTags.includes(tag);

                            return (
                                <button type="button"key={tag}

                                    // 클릭 시 태그 선택 또는 해제
                                    onClick={() => toggleTag(tag)}

                                    style={{
                                        padding: "8px 14px",
                                        borderRadius: "20px",

                                        // 선택 여부에 따라 테두리 변경
                                        border: isSelected
                                            ? "2px solid #2563eb"
                                            : "1px solid #d1d5db",

                                        // 선택 여부에 따라 배경색 변경
                                        backgroundColor: isSelected
                                            ? "#eff6ff"
                                            : "#ffffff",

                                        // 선택 여부에 따라 글자색 변경
                                        color: isSelected
                                            ? "#2563eb"
                                            : "#4b5563",

                                        cursor: "pointer",

                                        fontWeight: isSelected
                                            ? "bold"
                                            : "normal",

                                        fontSize: "14px",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    #{tag}
                                </button>
                            );
                        })}

                    </div>
                </div>

                {/* 16. 사용자 여행 요청 입력창 */}

                <div className="query-section">

                    <label className="query-label">
                        어떤 여행을 하고 싶어?
                    </label>

                    <input type="text"className="recommend-input"value={query}
                        // 입력할 때마다 query 상태 변경
                        onChange={(e) => setQuery(e.target.value)}/>

                </div>

                {/* 17. AI 여행 추천 실행 버튼 */}

                <button type="button"className="recommend-button"
                    // 클릭 시 handleRecommend 함수 실행
                    onClick={handleRecommend}>
                    AI 여행 상담 및 추천받기
                </button>

            </div>
        </div>
    );
}

// 다른 파일에서 RecommendForm을 사용할 수 있도록 내보내기
export default RecommendForm;
