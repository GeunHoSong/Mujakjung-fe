import React, { useState } from "react";
import RecommendForm from "../../components/RecommendForm";
import AiChatSection from "./AiChatSection";
import useGeolocation from "../../hooks/useGeolocation";

function Main() {
    const { latitude, longitude, error: geoError, loading } = useGeolocation();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [aiInitialQuery, setAiInitialQuery] = useState<string>("");

    // '맞춤 장소 찾기' 완료 시 또는 대화 시작 시 AI 채팅으로 데이터 전달
    const handleStartChatWithContext = (query: string) => {
    // 1. 위치 확인이 진행 중인지 검사
    if (loading) {
        alert("현재 위치를 확인하고 있어요. 잠시만 기다려 주세요.");
        return;
    }

    // 2. 위치 확인 실패 여부 검사
    if (geoError || latitude == null || longitude == null) {
        alert("현재 위치를 확인할 수 없어요. 위치 권한을 확인해 주세요.");
        return;
    }

    // 3. 선택한 태그 정리
    const tagStr =
        selectedTags.length > 0
            ? selectedTags.map(tag => `#${tag}`).join(" ")
            : "특별한 태그 없음";

    // 4. AI에 전달할 질문 구성
    const contextMessage = `
현재 위치: 위도 ${latitude}, 경도 ${longitude}
선호 태그: ${tagStr}
사용자 요청: ${query}

요청에 맞는 장소를 추천해 줘.
실제 장소 정보는 연결된 장소 검색 결과를 바탕으로 안내해 줘.
    `.trim();

    // 5. AI 대화창에 전달
    setAiInitialQuery(contextMessage);
};
    return (
        <div>
            {/* 위치 설정 폼 */}
            <RecommendForm 
                latitude={latitude}
                longitude={longitude}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                onSendToChat={handleStartChatWithContext}
            />

            {/* AI 대화 섹션에 초기 컨텍스트 전달 */}
            <AiChatSection 
                latitude={latitude}
                longitude={longitude}
                initialQuery={aiInitialQuery}
            />
        </div>
    );
}

export default Main;