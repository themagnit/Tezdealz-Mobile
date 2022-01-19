import axios from 'axios';
// @ts-ignore
import * as SecureStore from "expo-secure-store";

import { endPoints } from "../constants/Environment";
export const BASE_URL =  endPoints.apiBaseUrl;       //process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
   // Authorization: 'Bearer ' + localStorage.getItem('caroktajwt')
  }
});

export const axiosFormInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  //  Authorization: 'Bearer ' + localStorage.getItem('caroktajwt')
  }
});

// axiosFormInstance.interceptors.request.use(function (config) {
//   const token = exports.getHeaders();
//   debugger;
//   if (token) {
//     config.headers.Authorization = "Bearer " + token;
//   }

//   return config;
// });


// export const getHeaders = async () => {
//   let token = await SecureStore.getItemAsync("token");

//   return token ? token : "";
// };

// const exports = {
//   getHeaders,
// };

// export default exports;