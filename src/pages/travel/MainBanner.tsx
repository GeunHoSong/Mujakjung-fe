import React, { useState, useEffect } from "react";

const slideStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  transition: "all 0.5s ease-in-out",
};

const textStyle: React.CSSProperties = {
  color: "white",
  fontSize: "2.5rem",
  fontWeight: "bold",
  userSelect: "none",
};

const MainBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { text: "무작정, 바다로 떠나고 싶을 때", color: "#4CAF50" },
    { text: "초록빛 숲에서의 완벽한 휴식", color: "#388E3C" },
  ];

  // 4초마다 자동으로 슬라이드가 넘어가도록 설정
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 슬라이더 컨테이너 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...slideStyle,
              backgroundColor: slide.color,
            }}
          >
            <h1 style={textStyle}>{slide.text}</h1>
          </div>
        ))}
      </div>

      {/* 왼쪽 화살표 버튼 */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        &#10094;
      </button>

      {/* 오른쪽 화살표 버튼 */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          background: "rgba(0, 0, 0, 0.3)",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        &#10095;
      </button>

      {/* 하단 인디케이터 (점) */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MainBanner;