export default {
  // CSS를 브라우저가 이해할 수 있게 변환해주는 도구들이야
  plugins: {
    tailwindcss: {}, // Tailwind 규칙을 해석해
    autoprefixer: {}, // 구형 브라우저에서도 디자인이 안 깨지게 접두사를 붙여줘
  },
}