import axios from "axios";

// 공통 설정을 가진 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost:8080', // 여기에 실제 서버 포트를 적어!
    headers: {
        "Content-Type": "application/json",
    },
});

// 인터셉터: 요청 보낼 때마다 로컬 스토리지에서 토큰 가져와서 자동 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;