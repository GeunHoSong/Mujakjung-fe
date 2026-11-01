import React, { useState } from "react";
import "./Main.css";
import AiChatSection from "./AiChatSection";
import useGeolocation from "../../hooks/useGeolocation";

interface ItineraryItem {
    time?: string;
    place?: string;
    description?: string;
    category?: string;
    latitude?: number | null;
    longitude?: number | null;
    recommendation_reason?: string;
}

interface RecommendationResponse {
    title?: string;
    summary?: string;
    itinerary?: ItineraryItem[];
}

interface MainProps {
    onRecommendationReceived: (
        result: RecommendationResponse | null
    ) => void;
}

function Main(_props: MainProps) {
    const { latitude, longitude } = useGeolocation();

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <main className="main-container">
            <div className="main-content">
                <AiChatSection
                    latitude={latitude}
                    longitude={longitude}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    onFindLocation={()=> {
                        alert("위치 재 조회 기능을 연결 해야 해요");
                    }}
                />
            </div>
        </main>
    );
}

export default Main;