import axios from "axios";
import { store } from "../store/configureStore";
import { getRefreshToken } from "../actions/actionCreators";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export let accessToken;

export const setAccessToken = (token) => (accessToken = token);

axiosInstance.interceptors.request.use(
  (config) => {
    accessToken = localStorage.token;
    if (!accessToken) return config;

    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.data.message === "Token expired" &&
      error.response.statusText === "Unauthorized"
    ) {
      store.dispatch(getRefreshToken());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
