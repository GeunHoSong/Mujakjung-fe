import { useEffect } from "react";

function Footer() {

  const openSearch = () => {
    const { daum, kakao } = window as any;
    //팝업을 열기 전에 카카오가 있는지 먼저 확인!
    if(!daum || !kakao || !kakao.maps || !kakao.maps.services){
      alert("카카오 지도 불러 오는 중 입니다 , 잠시만 기달려 주세요")
      return ;
    }

    new daum.Postcode({
      // 카카오 로딩 되는지 먼저 확인
      oncomplete: (data: any) => {
        const fullAddr = data.address;
        console.log(fullAddr);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(fullAddr, (result: any, status: any) => {
          // 1. Status.OK (오타 수정)
          if (status === kakao.maps.services.Status.OK) {
            // 2. LatLng (t 추가 완료)
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const container = document.getElementById("footer-map");
            const options = { center: coords, level: 3 };

            // 3. new 추가 완료
            const map = new kakao.maps.Map(container, options);

            new kakao.maps.Marker({
              map: map,
              position: coords,
            });
          }
        });
      },
    }).open(); // 4. 괄호 짝 맞춤 완료
  };
  return (
    <footer style={{ padding: "20px", borderTop: "1px solid #eee", textAlign: "center" }}>
      <p>무작정 프로젝트 | AI 여행 추천 서비스 </p>
      
      {/* 1. 클릭하면 검색창이 뜨는 부분 */}
      <p 
        onClick={openSearch} 
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      >
        주소: 서울특별시 강남구 (여기를 눌러서 위치 변경)
      </p>

      {/* 2. ⭐ 이게 제일 중요! 지도가 그려지는 상자야. */}
      <div 
        id="footer-map" 
        style={{ width: '100%', height: '300px', marginTop: '10px', backgroundColor: '#f0f0f0' }}
      ></div>

      <p>© 2026 Mujakjung Project</p>
    </footer>
  );
}
export default Footer;