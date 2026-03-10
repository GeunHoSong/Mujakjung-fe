/**@type {import('tailwindcss').Config} */

export default {
    // Tailwindf를 적용할 파일 경로을 지정해 
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx, text}" , // src 폴더 안의 모든 js ts 파일을 감시 
    ],
    theme:{
        // 포로젝트 전역에서 풀 커스텀 테마 (색상 , 폰트등 )여기서 정의 
        extend:{},
    },
    plugins:[],
}