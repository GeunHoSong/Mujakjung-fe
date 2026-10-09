import axios from "axios";
import React, { useState, useEffect } from "react";

interface TravelItem {
    id: number;
    title: string;
}

function MyPageTravel() {
    // 테스트용 초기 더미 데이터
    const [travelList, setTravelList] = useState<TravelItem[]>([
        { id: 1, title: "설레는 부산 2박 3일" },
        { id: 2, title: "제주도 힐링 여행" }
    ]);

    const [loading, setLoading] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    // 백엔드 API 연동용 useEffect
    useEffect(() => {
        const fetchTravelData = async () => {
            try {
                const response = await axios.get("/api/travel/list", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                if (response.data && response.data.length > 0) {
                    setTravelList(response.data);
                }
            } catch (error) {
                console.log("여행 일정 로드 실패(더미 데이터 유지)", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTravelData();
    }, []);

    // 일정 추가 함수 (함수 범위 수정 및 오타 교정)
    const handleAddTravel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        const newItem: TravelItem = {
            id: Date.now(),
            title: newTitle,
        };
        setTravelList([...travelList, newItem]);
        setNewTitle("");
    };

    // 일정 삭제 함수 
    const handleDeleteTravel = (id: number) => {
        setTravelList(travelList.filter((item) => item.id !== id));
    };

    if (loading) return <div className="p-6 text-gray-500">여행 일정 불러 오는 중....</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">나의 여행 일정 관리</h2>
            
            {/* 일정 추가 폼 (Tailwind 클래스 수정: flex gap-2) */}
            <form onSubmit={handleAddTravel} className="flex gap-2">
                <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    placeholder="새로운 여행 제목을 입력 하세요"
                    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium">
                    추가
                </button>
            </form>

            {/* 일정 목록 및 삭제 버튼 */}
            {travelList.length === 0 ? (
                <p className="text-gray-500 text-center py-6">아직 작성한 여행 일지가 없어요.</p>
            ) : (
                <ul className="space-y-3">
                    {travelList.map((item) => (
                        <li 
                            key={item.id}
                            className="p-4 border rounded-md bg-gray-50 flex justify-between items-center shadow-sm"
                        >
                            <span className="font-medium text-gray-700 text-lg">{item.title}</span>
                            <button
                                onClick={() => handleDeleteTravel(item.id)}
                                className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition text-sm font-medium"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyPageTravel;