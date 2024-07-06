import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});
api.interceptors.request.use(
  function (config) {
    const access_token = localStorage.getItem("access_token");
    if (access_token) config.headers.Authorization = `JWT ${access_token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  },
);
