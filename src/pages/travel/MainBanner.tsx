import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from "react";

// 로컬 이미지 임포트: 경로와 파일명을 변수에 담아 사용
import jejuImg from "../../assets/jejuImg.webp"; 
// Swiper 라이브러리 필수 스타일 임포트
import 'swiper/swiper-bundle.css'



function MainBanner() {
    // [상태 관리] 사용자가 입력하는 검색어와 드롭다운 표시 여부
    const [searchTerm, setSearchTerm] = useState(""); 
    const [showDropdown, setShowDropdown] = useState(false); 

    // [데이터] 드롭다운에 표시할 추천 여행지 목록
    const recommendations = ["제주도 푸른 밤", "강릉 안목 커피거리", "속초 중앙 시장", "부산 해운대"];

    return (
        /* 최상단 컨테이너: 검색창을 배너 위에 띄우기 위해 relative 설정 */
        <div style={{ position: 'relative', width: '100%', height: "500px" }}>
            
            {/* 메인 슬라이드 영역 */}
            <Swiper 
                modules={[Navigation, Pagination, Autoplay]} // 사용할 모듈 배열
                navigation // 좌우 화살표 버튼 활성화
                pagination={{ clickable: true }} // 하단 점 클릭 시 해당 슬라이드로 이동
                autoplay={{ delay: 4000 }} // 4초마다 자동 전환
                style={{ height: '100%' }}
            >
                {/* 슬라이드 1: 이미지 배경 */}
                <SwiperSlide>
                    <div style={{...slideStyle, backgroundImage: `url("/jejuImg.webp")` }}>
                        <h1 style={textStyle}>무작정, 바다로 떠나고 싶을 때</h1>
                    </div>
                </SwiperSlide>

                {/* 슬라이드 2: 색상 배경 (이미지 없을 때 대비) */}
                <SwiperSlide>
                    <div style={{...slideStyle, backgroundColor: '#4CAF50' }}>
                        <h1 style={textStyle}>초록빛 숲에서 즐기는 완벽한 휴식</h1>
                    </div>
                </SwiperSlide>
            </Swiper>
            
            {/* 🔍 검색창 & 드롭다운 영역은 이 아래에 추가하면 배너 위에 겹쳐짐 */}
        </div>
    );
}

// --- ✨ CSS 스타일 상세 설명 (매우 중요!) ---

const slideStyle: React.CSSProperties = {
    height: '100%', // 부모(Swiper) 높이를 꽉 채움
    backgroundSize: 'cover', // 배경 이미지가 잘리지 않고 꽉 차게 조절
    backgroundPosition: 'center', // 이미지의 중심을 가운데로 맞춤
    display: 'flex', // 내부 글자를 중앙 정렬하기 위한 Flexbox 설정
    justifyContent: 'center', // 가로 중앙 정렬
    alignItems: 'center', // 세로 중앙 정렬
    
    /* [중요] brightness: 배경을 어둡게 해서 그 위의 흰색 글자가 잘 보이게 함 (0.0은 검정, 1.0은 원본) */
    filter: 'brightness(0.8)' 
};

const textStyle: React.CSSProperties = {
    color: 'white', // 글자색은 흰색
    fontSize: '3rem', // 큰 폰트 크기 (제목 느낌)
    fontWeight: 'bold', // 두껍게
    
    /* [중요] textShadow: 글자 뒤에 그림자를 줘서 배경이 밝아도 글자가 묻히지 않게 함 */
    /* 설정값: x축 y축 퍼짐정도 색상(rgba) */
    textShadow: '2px 2px 10px rgba(0,0,0,0.5)', 
    
    zIndex: 2 // 슬라이드 배경보다 위로 오도록 층 설정
};

export default MainBanner;