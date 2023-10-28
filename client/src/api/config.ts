import axios, {
    AxiosError,
    AxiosInstance,
} from "axios";

const axiosAuthorized: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosAuthorized.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export { axiosAuthorized, axiosInstance };
