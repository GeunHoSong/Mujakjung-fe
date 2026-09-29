import React from "react";

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: "12px",
  marginTop: "20px",
  backgroundColor: "#e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500"
};

function Footer() {
  return (
    <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd', marginTop: '40px' }}>
      <h3 style={{ marginBottom: '15px' }}>찾아 오시는 길</h3>
      
      {/* 네이버 지도 대신 안전하게 표시되는 영역 */}
      <div style={containerStyle}>
        📍 네이버 지도 영역 (오프라인 위치 안내)
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
        <p><strong>주소:</strong> 서울 특별시 강남구 무작정 빌딩</p>
      </div>
    </footer>
  );
}

export default Footer;