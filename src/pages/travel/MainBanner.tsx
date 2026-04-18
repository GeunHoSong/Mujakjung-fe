import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

/* [CSS 통합 임포트] */
import 'swiper/swiper-bundle.css'; 


/**
 * [슬라이드 내부 컨텐츠 스타일]
 * zIndex를 제거하여 헤더와 싸우지 않게 설정함
 */
const slideStyle: React.CSSProperties = {
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'brightness(0.8)', 
    position: 'relative',
    // zIndex 제거: 헤더를 뚫고 올라오는 현상 방지
};

/**
 * [슬라이드 위 텍스트 스타일]
 */
const textStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 10px rgba(0,0,0,0.5)', 
    // zIndex 제거
};

function MainBanner() {
    return (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: "500px", 
            /* [중요] 최상단 헤더(10000)보다 무조건 아래에 깔리도록 0 설정 */
            zIndex: 0, 
            marginTop: '70px' 
        }}>
            <Swiper 
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                /* Swiper 자체 레이어도 헤더 아래로 고정 */
                style={{ height: '100%', zIndex: 0 }}
            >
                <SwiperSlide>
                    <div style={{...slideStyle, backgroundColor: '#4CAF50'}}>
                        <h1 style={textStyle}>무작정, 바다로 떠나고 싶을 때</h1>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide>
                    <div style={{...slideStyle, backgroundColor: '#4CAF50' }}>
                        <h1 style={textStyle}>초록빛 숲에서의 완벽한 휴식</h1>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainBanner;