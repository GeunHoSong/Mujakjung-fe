// import React, {useState} from "react";
// import DaumPostcode from "react-daum-postcode";


// const Sipnup= ()=> {
//     const REST_API_KEY= 'c20fa1e751278dc7d481f42f175401b2';
//     const REST_API_URL= 'http://localhost:8080/auth/kakao/callback';
//     const KAKAO_AUTH_URL ='https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`';
//     // 버튼 클릭 함수 
//     const handleKakaoLogin =() =>{
//         // 카카오 인증 페이지 로 이동 
//         window.location.href=KAKAO_AUTH_URL;
//     }
//     return (
//         <div>
//             <button type="button" onClick={handleKakaoLogin}>
//                 <img src="{kakaoBtn}" alt="카카오 로그인 ">

//                 </img>
//             </button>
//         </div>
//     )
// }
// export default Sipnup;