import { useEffect, useRef } from "react";

// 장소 하나의 데이터 타입
interface ItineraryItem {
    place?: string;
    latitude?: number | null;
    longitude?: number | null;
}

// 날짜별 일정 데이터 타입
interface ItineraryDay {
    day?: number;
    courses: ItineraryItem[];
}

// 지도 컴포넌트에 전달되는 Props 타입
interface ItineraryMapProps {
    itinerary: (ItineraryItem | ItineraryDay)[];
}

function ItineraryMap({ itinerary }: ItineraryMapProps) {
    // 지도를 표시할 HTML 영역
    const mapElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const kakaoMap = (window as any).kakao;

        // 지도 영역과 카카오 지도 API 확인
        if (!mapElement.current || !kakaoMap?.maps) {
            console.error("카카오 지도 API를 확인할 수 없습니다.");
            return;
        }

        // 카카오 지도 라이브러리 준비 후 실행
        kakaoMap.maps.load(() => {
            if (!mapElement.current) return;

            // 추천 장소 원본 데이터 확인
            console.log(
                "추천 장소 원본 전체:",
                JSON.stringify(itinerary, null, 2)
            );

            // 날짜별 courses를 하나의 장소 목록으로 합치기
            const courseItems: ItineraryItem[] = itinerary.flatMap(
                (item) => {
                    if ("courses" in item) {
                        return item.courses ?? [];
                    }

                    return [item];
                }
            );

            // 위도와 경도가 모두 유효한 장소만 선택
            const places = courseItems.filter(
                (
                    item
                ): item is ItineraryItem & {
                    latitude: number;
                    longitude: number;
                } =>
                    typeof item.latitude === "number" &&
                    Number.isFinite(item.latitude) &&
                    typeof item.longitude === "number" &&
                    Number.isFinite(item.longitude)
            );

            // 디버깅 로그
            console.log("전체 장소 목록:", courseItems);
            console.log("좌표가 확인된 장소:", places);
            console.log("마커 생성 대상 개수:", places.length);

            // 첫 번째 추천 장소를 지도 중심으로 설정
            const firstPlace = places[0];

            console.log("첫 번째 장소:", firstPlace);

            const center = firstPlace
                ? new kakaoMap.maps.LatLng(
                      firstPlace.latitude,
                      firstPlace.longitude
                  )
                : new kakaoMap.maps.LatLng(37.3949, 126.6340);

            // 실제 지도 생성
            const map = new kakaoMap.maps.Map(mapElement.current, {
                center,
                level: 5,
            });

            // 여러 장소의 위치를 포함할 영역
            const bounds = new kakaoMap.maps.LatLngBounds();

            // 좌표가 있는 장소마다 마커 생성
            places.forEach((item) => {
                const position = new kakaoMap.maps.LatLng(
                    item.latitude,
                    item.longitude
                );

                const marker = new kakaoMap.maps.Marker({
                    map,
                    position,
                });

                // 마커 위치를 지도 범위에 추가
                bounds.extend(position);

                // 마커를 클릭하면 장소 이름 표시
                const infoContent = document.createElement("div");

                infoContent.style.padding = "8px 12px";
                infoContent.textContent = item.place || "추천 장소";

                const infoWindow = new kakaoMap.maps.InfoWindow({
                    content: infoContent,
                });

                kakaoMap.maps.event.addListener(
                    marker,
                    "click",
                    () => {
                        infoWindow.open(map, marker);
                    }
                );
            });

            // 여러 장소가 있으면 모든 마커가 보이도록 조정
            if (places.length > 1) {
                map.setBounds(bounds);
            }
        });
    }, [itinerary]);

    return (
        <div
            ref={mapElement}
            style={{
                width: "100%",
                height: "320px",
                marginTop: "16px",
                borderRadius: "12px",
                overflow: "hidden",
            }}
        />
    );
}

export default ItineraryMap;