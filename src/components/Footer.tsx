import { useRef , useEffect } from "react";



function Footer(){
  const mapElement = useRef<HTMLDivElement>(null);
  
 
  useEffect(() => {
     const kakaoMap = (window as any).kakao;

console.log("1 kakaoMap", kakaoMap);
console.log("2 Map", kakaoMap?.maps);
console.log("3 지도 영역", mapElement.current);

if (!mapElement.current || !kakaoMap?.maps) {
  console.log("지도 생성 조건을 통과하지 못했어.");
  return;
}

    kakaoMap.maps.load(() => {
      const options = {
        center: new kakaoMap.maps.LatLng(37.3949, 126.6340),
        level: 4,
      };

      new kakaoMap.maps.Map(mapElement.current, options);
    });
  }, []);
  return (
    <div ref={mapElement} style={{width: "100%", height: "320px", backgroundColor: "#f1f5f9"}}>
      <p>카카오 지도입니다....</p>
    </div>
  )
}

export default Footer;