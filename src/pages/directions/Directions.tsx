
import { useEffect, useRef } from "react";
import "./Directions.css";

function Directions() {
    // 1. 카카오 지도가 표시될 HTML 요소 참조
    const mapElement = useRef<HTMLDivElement>(null);

    // 2. 컴포넌트가 화면에 나타나면 실행
    useEffect(() => {
        const kakaoMap = (window as any).kakao;

        if (!mapElement.current || !kakaoMap?.maps) {
            console.error("카카오 지도 SDK를 찾을 수 없습니다.");
            return;
        }
        console.log("SDK 상태", kakaoMap?.maps);

        let map: any = null;
        let marker: any = null;
        let cancelled = false;
        let infoWindow: any = null;

        // 3. 카카오 지도 SDK 로딩
        kakaoMap.maps.load(() => {
            if (cancelled || !mapElement.current) return;

            // 4. 지도 중심 좌표
            const position = new kakaoMap.maps.LatLng(
                37.3949,
                126.6340
            );

            // 5. 지도 생성
            map = new kakaoMap.maps.Map(
                mapElement.current,
                {
                    center: position,
                    level: 4,
                }
            );

            console.log("카카오 지도 생성 완료");

            // 6. 빨간색 원형 마커 HTML
            const markerContent = document.createElement("div");
            markerContent.style.width= "24px";
            markerContent.style.height= "24px";
            markerContent.style.backgroundColor= "red";
            markerContent.style.border= "3px solid white";
            markerContent.style.borderRadius= "58px";
            markerContent.style.boxShadow="0 2px 8px rgba(0, 0, 0, 0.04)";
            markerContent.style.cursor= "pointer";  


            // 7. 커스텀 마커 생성
            marker = new kakaoMap.maps.CustomOverlay({
                position: position,
                content: markerContent,
                xAnchor: 0.5,
                yAnchor: 0.5,
                zIndex: 10,
            });

            // 8. 지도에 마커 표시
            marker.setMap(map);
            // 9. 정보창에 표시할 내용
            const infoContent = document.createElement("div");

            infoContent.className = "directions-info";
            infoContent.innerHTML = `
            <strong>무작정 | MUJAKJUNG</strong>
            <p>지친 일상에서 벗어나 나만의 여행을 찾아보세요.</p>
            `;

            // 10. 정보창 생성 (처음에는 숨김)
            infoWindow = new kakaoMap.maps.CustomOverlay({
                position: position,
                content: infoContent,
                yAnchor: 1.8,
                zIndex: 20,
            });

            // 11. 빨간 마커 클릭 시 정보창 열고 닫기
            let isOpen = false;

            // 빨간 마커를 클릭하면 실행
            markerContent.addEventListener("click", ()=> {
                console.log("빨간 마커 클릭 성공");
                // 열림 / 닫힘 
                isOpen = !isOpen;
                if(isOpen){
                    infoWindow.setMap(map);
                    console.log("정보창 출력");
                }else {
                    !infoWindow.setMap(null);
                    console.info("정보창 닫힘")
                }
            })

            console.log("마커 클릭 이벤트 등록 완료");

        });

        // 9. 컴포넌트가 사라질 때 정리
        return () => {
            cancelled = true;

            if (marker) {
                marker.setMap(null);
            }
            // 정보창 제거 
            if(infoWindow){
                infoWindow.setMap(null);
            }
        };

    }, []);

    
return (
    <main className="directions-container">
        <h2>찾아오시는 길</h2>
        <p>무작정 위치 안내</p>

        {/* 카카오 지도 */}
        <div
            ref={mapElement}
            className="directions-map"
        />

        {/* 카카오맵 길찾기 버튼 */}
        <div className="directions-button-container">
            <button type="button"className="directions-button"
                onClick={() => {window.open(
                        "https://map.kakao.com/link/to/무작정,37.3949,126.6340",
                        "_blank","noopener,noreferrer");}}>
                카카오맵 길찾기
            </button>
        </div>
    </main>
);
}

export default Directions;
