
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("🔥 Footer 컴포넌트 실행됨!");

    const kakaoMap = (window as any).kakao;

    if (!mapElement.current || !kakaoMap?.maps) {
      console.log("지도 생성 조건을 통과하지 못했어.");
      return;
    }

    kakaoMap.maps.load(() => {
      const options = {
        center: new kakaoMap.maps.LatLng(37.3949, 126.6340),
        level: 4,
      };

      if (mapElement.current) {
        new kakaoMap.maps.Map(mapElement.current, options);
      }
    });
  }, []);

  return (
    <div>
      {/* 1. 카카오 지도 */}
      <div ref={mapElement}style={{width: "100%",height: "320px",backgroundColor: "#f1f5f9",}}/>

      {/* 2. 푸터 전체 */}
      <footer className="site-footer">

        {/* 푸터 메뉴 컨테이너 시작 */}
        <div className="footer-container">

          {/* 무작정 소개 */}
          <div className="footer-brand">
            <h3>무작정 | MUJAKJUNG</h3>
            <p>
              지친 일상에서 벗어나 나만의 여행을 찾아보세요.
            </p>
          </div>

          {/* 서비스 안내 */}
          <div className="footer-section">
            <h4>서비스 안내</h4>
            <ul>
              <li>
                <Link to="/about">무작정 소개</Link>
              </li>
              <li>
                <Link to="/notice/list">공지사항</Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div className="footer-section">
            <h4>고객 지원</h4>
            <ul>
              <li>
                <Link to="/support">고객센터</Link>
              </li>
              <li>
                <Link to="/support">자주 묻는 질문 (FAQ)</Link>
              </li>
              <li>
                <Link to="/support">1:1 문의하기</Link>
              </li>
            </ul>
          </div>

          {/* 정책 안내 */}
          <div className="footer-section">
            <h4>정책 안내</h4>
            <ul>
              <li>
                <Link to="/terms">이용약관</Link>
              </li>
              <li>
                <Link to="/privacy">개인정보처리방침</Link>
              </li>
            </ul>
          </div>

        </div>
        {/* 푸터 메뉴 컨테이너 끝 */}

        {/* 3. 저작권 표시 */}
        <div className="footer-bottom">
          <p>
            © 2026 MUJAKJUNG. All rights reserved.
          </p>
        </div>

      </footer>
    </div>
  );
}

export default Footer;
