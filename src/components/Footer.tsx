import React, { useState, useCallback } from "react";
// 구글 지도 라이브러리에서 필요한 컴포넌트들을 가져옵니다.
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

// 1. 지도 영역의 디자인 설정 (가로 100%, 세로 350px, 모서리 둥글게)
const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: "12px",
  marginTop: "20px"
};

// 2. 위도(lat)와 경도(lng) 좌표 설정
const officePos = { lat: 37.4979, lng: 127.0276 }; // 도착지: 강남역 인근
const homePos = { lat: 37.5559, lng: 126.9723 };   // 출발지: 서울역 인근

function Footer() {
  // 3. 구글 지도 스크립트를 불러오는 Hook (API 키를 여기에 입력)
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAfvDw7glkYnWbkGteRCgw_5AnUxyl9fZw" 
  });

  // 4. 길 찾기 경로 결과를 저장할 상태 변수
  const [response, setResponse] = useState<google.maps.DirectionsResult | null>(null);

  /**
   * 5. 길 찾기 서비스(DirectionsService)의 결과를 처리하는 함수
   * useCallback을 사용하여 불필요한 재연산을 방지하고 무한 루프를 막습니다.
   */
  const directionsCallback = useCallback((res: any) => {
    // 결과가 성공(OK)이고, 아직 저장된 경로 데이터가 없을 때만 상태를 업데이트합니다.
    if (res !== null && res.status === "OK" && !response) {
      setResponse(res);
    }
  }, [response]);

  // 6. 지도가 로드되었을 때만 실제 화면(JSX)을 그려줍니다.
  return isLoaded ? (
    <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
      <h3 style={{ marginBottom: '15px' }}>찾아오시는 길</h3>
      
      {/* 실제 지도가 그려지는 메인 컴포넌트 */}
      <GoogleMap mapContainerStyle={containerStyle} center={officePos} zoom={13}>
        
        {/* A. 길 찾기 서비스: 출발지에서 도착지까지의 경로 데이터를 요청합니다. */}
        <DirectionsService 
          options={{ 
            origin: homePos,           // 출발지
            destination: officePos,      // 도착지
            travelMode: google.maps.TravelMode.TRANSIT, // 이동 수단: 대중교통
            provideRouteAlternatives: false // 대안 경로 없이 최적의 경로 하나만 제공
          }} 
          callback={directionsCallback} // 요청 결과를 처리할 콜백 함수 연결
        />
        
        {/* B. 경로 렌더링: 요청 결과(response)가 있으면 지도 위에 선을 그려줍니다. */}
        {response && <DirectionsRenderer options={{ directions: response }} />}
        
        {/* C. 마커 표시: 경로 데이터가 오기 전에는 도착지 위치에 빨간 핀(마커)을 꽂아둡니다. */}
        {!response && <Marker position={officePos} />}
      </GoogleMap>

      {/* 하단 주소 정보 영역 */}
      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p><strong>🏢 주소:</strong> 서울특별시 강남구 무작정 빌딩</p>
      </div>
    </footer>
  ) : (
    // 지도가 로드되지 않았을 때 보여줄 로딩 화면
    <div style={{ padding: '20px' }}>지도를 불러오는 중...</div>
  );
}

export default Footer;