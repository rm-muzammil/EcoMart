import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://ecomart-production-1397.up.railway.app/api", // ✅ correct backend URL
  withCredentials: true,
});

Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    let originalRequest = error.config;
    if (error.request.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return Axios(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios(
      "https://ecomart-production-1397.up.railway.app/api/user/refresh-token",
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {}
};
export default Axios;
