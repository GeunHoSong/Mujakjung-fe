
import React, { useState } from "react";
import "./Main.css";

// AI 여행 추천 및 채팅 컴포넌트
import AiChatSection from "./AiChatSection";

// 사용자의 현재 위치를 가져오는 커스텀 훅
import useGeolocation from "../../hooks/useGeolocation";
// 마스코트 
import mumu from "../../assets/mumu.png";

/* ========================================
   1. AI 여행 일정 데이터 타입 정의
======================================== */

// AI가 추천하는 개별 여행 장소 정보
interface ItineraryItem {
    time?: string;                  // 방문 시간
    place?: string;                 // 장소 이름
    description?: string;           // 장소 설명
    category?: string;              // 장소 카테고리
    latitude?: number | null;       // 위도
    longitude?: number | null;      // 경도
    recommendation_reason?: string; // AI 추천 이유
}

// AI 여행 추천 결과 데이터
interface RecommendationResponse {
    title?: string;                 // 여행 제목
    summary?: string;               // 여행 요약
    itinerary?: ItineraryItem[];    // 여행 일정 목록
}

// 부모 컴포넌트에서 전달받는 Props
interface MainProps {
    onRecommendationReceived: (
        result: RecommendationResponse | null
    ) => void;
}

/* ========================================
   2. 메인 페이지 컴포넌트
======================================== */

function Main(_props: MainProps) {

    // 현재 위치의 위도와 경도 가져오기
    const { latitude, longitude } = useGeolocation();

    // 사용자가 선택한 여행 분위기 태그 관리
    const [selectedTags, setSelectedTags] =
        useState<string[]>([]);

    return (
        <main className="main-container">

            {/* =================================
                3. 메인 여행 배너 영역
            ================================= */}

            <section className="main-hero">

                {/* 왼쪽 여행 소개 문구 */}
                <div className="main-hero-text">
                    <h1>
                        AI가 만든 <br />
                        나만의 특별한 여행
                    </h1>

                    <p>무작정과 함께 떠나요!</p>
                </div>

                {/* 오른쪽 배너 문구 */}
                <p className="main-hero-subtitle">
                    지금 어디로 떠나 볼까요?
                </p>

            </section>

            {/* =================================
                4. AI 여행 추천 및 상담 영역
            ================================= */}

            <div className="main-content">

                <AiChatSection
                    // 현재 위치 전달
                    latitude={latitude}
                    longitude={longitude}

                    // 선택된 여행 태그 전달
                    selectedTags={selectedTags}

                    // 태그 상태 변경 함수 전달
                    setSelectedTags={setSelectedTags}

                    // 현재 위치 재조회 기능 (추후 구현)
                    onFindLocation={() => {
                        alert(
                            "위치 재조회 기능을 연결해야 해요"
                        );
                    }}
                />

            </div>

            {/* =================================
                5. 무작정 서비스 소개 영역
            ================================= */}

            <section className="main-intro">

                {/* 왼쪽: AI 여행 도우미 소개 */}
                <div className="main-intro-left">
                    <img src={mumu} alt="무작정 AI 여행 마스코트 무무 "  className="mumu-character"/>
                    {/*무무의 인사말 말풍선*/}
                    <div className="mumu-message">
                        <h2>안녕하세요!</h2>

                        <p>무작정의 AI 여행 친구 무무에요!</p>

                        <p>오늘 어디로 떠나 볼까요?</p>
                    </div>

                </div>

                {/* 오른쪽: 무작정의 주요 서비스 */}
                <div className="main-intro-right">

                    <h2>무작정이 만드는 특별함</h2>

                    {/* 세 가지 서비스 특징을 묶는 영역 */}
                    <div className="main-features">

                        {/* 첫 번째: AI 맞춤 여행 */}
                        <div>
                            {/* 아이콘 전용 영역 */}
                            <div className="feature-icon">
                                🧠
                            </div>

                            {/* 서비스 제목 */}
                            <h3>AI 맞춤 여행</h3>

                            {/* 서비스 설명 */}
                            <p>
                                취향에 맞는 여행지를
                                추천해요.
                            </p>
                        </div>

                        {/* 두 번째: 실제 장소 정보 */}
                        <div>
                            <div className="feature-icon">
                                📍
                            </div>

                            <h3>실제 장소 정보</h3>

                            <p>
                                맛집과 관광지를 함께
                                찾아드려요.
                            </p>
                        </div>

                        {/* 세 번째: 힐링 케어 */}
                        <div>
                            <div className="feature-icon">
                                💗
                            </div>

                            <h3>힐링 케어</h3>

                            <p>
                                지친 일상에 쉼표를
                                선물해요.
                            </p>
                        </div>

                    </div>
                </div>

            </section>

        </main>
    );
}

export default Main;
