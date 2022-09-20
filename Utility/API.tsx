import { axiosFormInstance, axiosInstance } from "./axiosInstances";
import * as SecureStore from "expo-secure-store";

export const getHeaders = async () => {
  let token = await SecureStore.getItemAsync("token");
  // const res = {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // };

  // if (token) {
  //   // @ts-expect-error: Let's ignore a compile error like this unreachable code
  //   res["Authorization"] = `Bearer ${token}`;
  // }

  return token ? token : "";
};

const exports = {
  getHeaders,
};

export default exports;

// axiosInstance.interceptors.request.use(function (config) {
//   const token = exports.getHeaders();
//   debugger;
//   if (token) {
//     config.headers.Authorization = "Bearer " + token;
//   }

//   return config;
// });
// axiosFormInstance.interceptors.request.use(function (config) {
//   const token = exports.getHeaders();
//   debugger;
//   if (token) {
//     config.headers.Authorization = "Bearer " + token;
//   }

//   return config;
// });

export const addData = async (endpoint: string, requestBody?: object) => {

  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};
export const addFormData = async (endpoint: string, requestBody?: object) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosFormInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateData = async (endpoint: string, requestBody?: object) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};
export const updateFormData = async (
  endpoint: string,
  requestBody?: object
) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosFormInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};
export const deleteData = async (endpoint: string) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosInstance.delete(endpoint);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getAllData = async (url: string) => {
  // const headers = await getHeaders()
  try {
    let result = await axiosInstance.get(url);
    return result.data;
  } catch (error: any) {
    return error.response;
  }
};


export const addToFav = async (url: string, id: string) => {
  // let headers  = await getHeaders()
  try {
    let result = await axiosInstance.patch(`${url}/${id}`);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};


export const updateUser = async (url: string, data: any) => {
  // let headers  = await getHeaders()
  try {
    let result = await axiosInstance.patch(`${url}`, data);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

