/* eslint-disable no-unused-vars */
import axios from "axios";
import { store } from "../store/configureStore";
import { getRefreshToken } from "../store/actions/actionCreators";

let refresh_token = null;

export const setRefreshToken = (token) => {
  refresh_token = token;
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().token.token;
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
    console.log(error.response);
    if (
      error.response.data.message === "Token expired" &&
      error.response.status === 401
    ) {
      store.dispatch(getRefreshToken());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const refreshToken = () => {
  return axiosInstance.post("refresh_token", {
    refresh_token: localStorage.getItem("refresh-token"),
  });
};

export const put_axios = (url, options) => {
  return axiosInstance.put(url, options);
};

export const post_axios = (url, options) => {
  return axiosInstance.post(url, options);
};

export const get_axios = (url, options) => {
  return axiosInstance(url, {
    params: options,
  });
};

export const delete_axios = (url, options) => {
  return axiosInstance.delete(url, {
    params: options,
  });
};
