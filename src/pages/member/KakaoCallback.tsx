import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// 화살표 함수 대신 function 키워드를 사용했습니다.
function kakaoCallback(){
    const [searchParams]= useSearchParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const token = searchParams.get("token");
        if(token){
            console.log("카카오 로그인 성공~! 토큰 저장 하는 중 ");
            localStorage.setItem("token", token);
            navigate("/");
        }else{
            console.error("카카오 토큰을 찾을 수 없습니다");
            navigate("/login");
        }
    }, [searchParams , navigate])
    return (
        <div style={{textAlign: "center", marginTop: "100px"}}>
            <h3>카카오 로그인 처리 중입니다</h3>

        </div>
    )
}

export default kakaoCallback