import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
});

// [추가] 요청(Request) 인터셉터: API 보낼 때마다 토큰 헤더에 추가
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // 로그인할 때 저장한 키 이름과 동일해야 함
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답(Response) 인터셉터: 401 발생 시 로그인 페이지로 이동
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert("세션이 만료되었습니다. 다시 로그인해주세요.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;