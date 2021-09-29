import axios from "axios";
export const getHeaders = () => {
  const token = localStorage.getItem("idtoken");

  const res = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (token) {
    // @ts-expect-error: Let's ignore a compile error like this unreachable code
    res["Authorization"] = `Bearer ${token}`;
  }

  return res;
};

//sampleUsage: ApiService(`${endpoint}`, 'POST', jsonObjectParams)
export const ApiService = (
  path: any,
  method = "get",
  payload = null,
  type = null,
  timeout = 0,
  params = null
) => {
  const headers = exports.getHeaders();
  // @ts-expect-error: Let's ignore a compile error like this unreachable code
  return axios({
    method: method,
    url: `${path}`,
    headers,
    data: payload,
    responsType: type,
    timeout: timeout,
    params: params,
  });
};

const exports = {
  ApiService,
  getHeaders,
};

export default exports;
