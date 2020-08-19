import axios from "axios";
import { store } from "../store/configureStore";
import { getRefreshToken } from "../actions/actionCreators";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.token;

    if (!token) return config;

    config.headers["access-token"] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("RESP", response);
    return response;
  },
  (error) => {
    console.log("error", error.response);
    if (
      !error.response.data.message &&
      error.response.statusText === "Unauthorized"
    ) {
      store.dispatch(getRefreshToken());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
