import React, { useRef, useEffect } from "react";

// 🌍 타입스크립트에서 window 객체에 구글 지도(google)가 있음을 알려주어 에러를 방지합니다.
declare global {
  interface Window {
    google: any;
  }
}

function Footer() {
  // 지도가 렌더링될 DOM 요소를 가리키는 ref
  const mapElement = useRef<HTMLDivElement>(null);
  // 생성된 구글 지도 인스턴스를 저장하여 중복 생성을 막는 ref
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval>;

    // 🚀 구글 지도 API가 스크립트를 통해 완전히 로드될 때까지 안전하게 대기하는 함수
    const initMap = () => {
      // window.google 객체와 DOM 요소가 준비되었고, 아직 지도가 생성되지 않은 경우에만 실행
      if (window.google && window.google.maps && mapElement.current && !mapInstanceRef.current) {
        // 목표 좌표 설정 (송도 좌표: 37.3949, 126.6340)
        const location = { lat: 37.3949, lng: 126.6340 };
        
        // 구글 지도 인스턴스 생성 및 옵션 설정
        mapInstanceRef.current = new window.google.maps.Map(mapElement.current, {
          center: location,
          zoom: 15,
          disableDefaultUI: true, // 불필요한 기본 UI 컨트롤 숨기기
        });

        // 지도 위에 위치를 표시할 마커 생성
        new window.google.maps.Marker({
          position: location,
          map: mapInstanceRef.current,
        });

        // 지도가 성공적으로 생성되면 대기하던 인터벌을 중지합니다.
        if (checkInterval) clearInterval(checkInterval);
      }
    };

    // 컴포넌트가 마운트되자마자 즉시 실행해 보고, 아직 로드 전이라면 0.1초마다 로드 여부를 체크합니다.
    initMap();
    if (!mapInstanceRef.current) {
      checkInterval = setInterval(initMap, 100);
    }

    // 컴포넌트가 언마운트될 때 인터벌을 정리하여 메모리 누수를 방지합니다.
    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, []);

  return (
    <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd', marginTop: '40px' }}>
      {/* 안내 텍스트 영역 */}
      <div style={{ width: "100%", marginTop: "60px", background: "#ffffff", padding: "40px", borderRadius: "24px", border: "1px solid #e2e8f0", 
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)", boxSizing: "border-box", display: "flex", flexDirection: "column",
            alignItems: "center", textAlign: "center"
          }}>
        <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
          찾아 오시는 길
        </h3>
        <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>무작정 프로젝트 오프라인 안내 센터 입니다 언제든지 편하게 방문 해주세요</p>
      </div>

      {/* 🗺️ 구글 지도가 그려질 DOM 영역 */}
      <div 
        ref={mapElement}
        style={{ width: "100%", height: "320px", backgroundColor: "#f1f5f9", borderRadius: "16px", border: "1px solid #cbd5e1", marginBottom: "20px" }}
      />

      {/* 주소 텍스트 정보 */}
      <div style={{ fontSize: "15px", color: "#334155", fontWeight: "600" }}>
        주소: <span style={{ fontWeight: "400", color: "#64748b" }}>인천 특별시 송도신도시 송도동 무작정</span>
      </div>
    </footer>
  );
}

export default Footer;