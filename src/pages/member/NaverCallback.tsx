import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function NaverCallback (){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useEffect(()=>{
        // 리다이렉트 하면서 더져준 ?token =xxx 값을 꺼내 준다 
        const token = searchParams.get("token");
        if(token){
            console.log("소셜 로그인 성공 토큰을 브라우저 에 저장 합니다 ");
            localStorage.setItem("token", token);// 로컬 스토리지에 JWT 저장
            navigate("/");
        }else {
            console.error("url애 토큰 이 존재 하지 않습니다");
            navigate("/login");
        }
    }, [searchParams, navigate]);
    return (
         <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h3>로그인 처리중 중입다 잠시만 기달려주세요</h3>

        </div>
    )
}

export default NaverCallback;