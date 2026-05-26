import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative", // 글씨를 이미지 위에 띄우기 위함
};

const textStyle: React.CSSProperties = {
  color: "white",
  fontSize: "2.5rem",
  fontWeight: "bold",
  zIndex: 2, // 배경 이미지보다 위에 보이게 설정
};

const MainBanner: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        marginTop: "70px", // 💡 고정된 헤더(70px)에 가려지지 않도록 마진 추가!
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* 첫 번째 슬라이드 */}
        <SwiperSlide>
          <div
            style={{
              ...slideStyle,
              backgroundColor: "#4CAF50",
            }}
          >
            {/* 💡 나중에 백엔드에서 이미지 URL 받아오면 여기에 넣어주면 돼! */}
            {/* <img src="이미지주소" alt="바다" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} /> */}
            <h1 style={textStyle}>
              무작정, 바다로 떠나고 싶을 때
            </h1>
          </div>
        </SwiperSlide>

        {/* 두 번째 슬라이드 */}
        <SwiperSlide>
          <div
            style={{
              ...slideStyle,
              backgroundColor: "#388E3C",
            }}
          >
            <h1 style={textStyle}>
              초록빛 숲에서의 완벽한 휴식
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainBanner;