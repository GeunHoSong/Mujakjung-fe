import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",

});

// 인터 셉트 설정 
apiClient.interceptors.response.use(
    (Response)=> Response,
    (error)=> {
        if(error.response && error.response.status == 401){
            alert("세션이 만료가 되엇습니다 다시 로그인 해주세요");
            localStorage.removeItem("token");
            window.location.href="/login";
        }
        return Promise.reject(error);
    }
);
export default apiClient;
