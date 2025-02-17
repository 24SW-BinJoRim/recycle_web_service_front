import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://ec2-43-200-108-190.ap-northeast-2.compute.amazonaws.com:8080";

// 로컬스토리지에서 JWT 토큰 가져오기
const getToken = () => localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청을 보낼 때 토큰을 포함하는 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
