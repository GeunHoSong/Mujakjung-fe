import React from "react";
import { Container as MapDiv, NaverMap, Marker, NavermapsProvider } from "react-naver-maps";

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: "12px",
  marginTop: "20px"
};

const offcePos = { lat: 37.4979, lng: 127.0276 };

function Footer() {
  return (
    <NavermapsProvider ncpClientId="m7zdnwqn5q">
      <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd', marginTop: '40px' }}>
        <h3 style={{ marginBottom: '15px' }}>찾아 오시는 길</h3>
        
        <MapDiv style={containerStyle}>
          {/* NaverMap 컴포넌트 내부에 Marker가 들어가야 합니다 */}
          <NaverMap defaultCenter={offcePos} defaultZoom={16}>
            <Marker position={offcePos} />
          </NaverMap>
        </MapDiv>

        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <p><strong>주소:</strong> 서울 특별시 강남구 무작정 빌딩</p>
        </div>
      </footer>
    </NavermapsProvider>
  );
}

export default Footer;