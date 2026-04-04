import { useState } from "react";

//  전역 객체 선언 (window.kakao, window.daum)
const  {kakao, daum} = window as any;
function Footer (){
  // 사용자 선택한 주소를 화면해 보여 주기 위한 상태 
  const [address, setAddress] = useState("서울 특별시 강남구");

  const openSearch = ()=>{
    new daum.Postcode({
      oncomplete: (data: any) => {
        const fullAddr = data.address;
        setAddress(fullAddr); // 선택 한 주소로 텍스트 변경
        //  주소를 좌표로 변환 해주는 서비스 객체 생성 
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(fullAddr, (result: any, status: any)=>{
          //  검색 성공시 
          if(status === kakao.maps.services.Status.OK){
            // 카카오 SDK가 로드된 후 실행 (비동기 제어)
            kakao.maps.load(()=>{
              const cotainer = document.getElementById("footer-map"); // 지도를 담을 영역
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 검색된 좌표
              // 지도 생성 (캡처 예제의 var mapOption 부분)
              const options = {
                center: coords,
                level:3,
              };
              const map = new kakao.maps.Map(cotainer, options);
              // 마커 생성 
              const marker = new kakao.maps.Marker({
                position : coords // 마커 표시될 위치 
              });
              // 마커를 지도 위에 올리기 
              marker.setMap(map);
              console.log("지도외 마커 생성 성공")
            });
          }
        });
      }
    }).open();
  }
  return (
    <footer style={{padding: "20px", borderTop: "1px solid #eee", textAlign:"center" , backgroundColor: "white"}}>
      <p style={{fontWeight: 'bold'}}>무작정 프로젝트 | AI여행 추천 사이트</p>
      <p onClick={openSearch} style={{cursor:'pointer', color:'#007bff' , textDecoration: 'underline', marginBlock: '1px'}}>
        주소: {address}
      </p>
      <div id="footer-map" style={{width: '100%', height: '300px', backgroundColor: '#f8f0fa', borderRadius: '8px' }}>
      </div>
      <p style={{marginTop:"15px" , fontSize: "0.8ram", color: "#999",  }}>© 2026 Mujakjung Project</p>
    </footer>
  )
}

export default Footer;