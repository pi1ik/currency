import axios from "axios";
// import dotenv from "dotenv";

const baseURL = "https://api.coingecko.com/api/v3";

// dotenv.config();

const instance = axios.create({
  baseURL,
  headers: {
    "x-cg-demo-api-key": "CG-KhC674zjwguqyhdrHCdY8m5G",
  },
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = window.localStorage.getItem("token");

//   return config;
// });

export default instance;
