
import React, { useState } from "react";
import RecommendForm from "../../components/RecommendForm";
import AiChatSection from "./AiChatSection";
import useGeolocation from "../../hooks/useGeolocation";

// AI 추천 장소 한 개의 정보
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

// AI 추천 결과 전체 정보
interface RecommendationResponse {
    title?: string;
    summary?: string;
    itinerary?: ItineraryItem[];
}
interface MainProps {
     onRecommendationReceived: (
        result : RecommendationResponse | null
     ) => void;
}

function Main({onRecommendationReceived}: MainProps) {
    const {
        latitude,
        longitude,
        error: geoError,
        loading
    } = useGeolocation();

    // 1. 선택한 태그 관리
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 2. AI 채팅창에 전달할 질문 관리
    const [aiInitialQuery, setAiInitialQuery] = useState<string>("");

    // 3. AI 추천 결과 관리
 

    // 4. AI 채팅창에 질문 전달
    const handleStartChatWithContext = (query: string) => {
        if (loading) {
            alert("현재 위치를 확인하고 있어요. 잠시만 기다려 주세요.");
            return;
        }

        if (geoError || latitude == null || longitude == null) {
            alert("현재 위치를 확인할 수 없어요. 위치 권한을 확인해 주세요.");
            return;
        }

        const tagStr =
            selectedTags.length > 0
                ? selectedTags.map(tag => `#${tag}`).join(" ")
                : "특별한 태그 없음";

        const contextMessage = `
현재 위치: 위도 ${latitude}, 경도 ${longitude}
선호 태그: ${tagStr}
사용자 요청: ${query}

요청에 맞는 장소를 추천해 줘.
실제 장소 정보는 연결된 장소 검색 결과를 바탕으로 안내해 줘.
        `.trim();

        setAiInitialQuery(contextMessage);
    };

    return (
        <div>
            {/* 5. 위치 기반 추천 폼 */}
            <RecommendForm
                latitude={latitude}
                longitude={longitude}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onSendToChat={handleStartChatWithContext}
                onRecommendationReceived={onRecommendationReceived}
            />

            {/* 6. AI 채팅창 */}
            <AiChatSection
                latitude={latitude}
                longitude={longitude}
                initialQuery={aiInitialQuery}
            />
        </div>
    );
}

export default Main;
