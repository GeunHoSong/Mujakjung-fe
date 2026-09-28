import { useEffect } from "react";
import { useNavigate,  useSearchParams } from "react-router-dom";


function GoogleCallback() {
    const [SearchParams ] = useSearchParams();
    const navigate = useNavigate();
    
    useEffect(()=> {
        const token = SearchParams.get("token");
        if(token){
            console.log("구글 로그인 성공 토큰 저장 성공" )
            localStorage.setItem("accessToken", token);
            navigate("/");
        } else {
            console.log("구글 토큰을 찾을 수 없습니다");
            navigate("/");
        }
    },[SearchParams , navigate])
    return  (
        <div style={{textAlign:"center", marginTop:"100px"}}>
           <h3>구글 로그인 처리 중입니다</h3> 
        </div>
    )
}

export default GoogleCallback;