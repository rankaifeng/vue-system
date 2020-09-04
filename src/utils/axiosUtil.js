import axios from "axios";
import { stringify } from "query-string";
export const BASE_URL = "http://161.189.38.101:8081";
/**
 * 单例模式返回axios实例
 */
function getInstance() {
  let instance;
  if (instance) {
    return instance;
  }
  return (instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
  }));
}

const server = getInstance();
// 添加请求拦截器
server.interceptors.request.use(
  config => {
    const HEADER_CHART = "application/json; charset=utf-8";
    let apiToken = localStorage.getItem("token");
    // 在发送请求之前做些什么
    const { url, headers } = config;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Authorization"] = `${apiToken == null ? "" : apiToken}`;

    url === "/authenticate"
      ? (headers["Content-Type"] = HEADER_CHART)
      : (headers["Accept"] = HEADER_CHART);
    return config;
  },
  error => {
    // 对请求错误做些什么
    if (error && error.stack.indexOf("timeout") > -1) {
      return Promise.reject("请求超时");
    }
  }
);

// 添加响应拦截器
server.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    console.log(response);
    const { status } = response;

    return status === 200 ? response.data : response;
  },
  error => {
    console.log(error.response);
    const { status } = error.response;
    let errorMsg;
    switch (status) {
      case 404:
        errorMsg = "请求路径出错！";
      case 401:
        errorMsg = "未授权！";
      case 400:
        errorMsg = "请求参数有误！";
      default:
        errorMsg = "连接服务器失败！";
    }
    // 对响应错误做点什么
    return Promise.reject(errorMsg);
  }
);

export const get = (url, params = {}) => {
  if (JSON.stringify(params) === "{}") {
    return server.request({ url, method: "GET", params });
  }
  let headData = [];
  for (let i in params.filter) {
    if (params.filter.hasOwnProperty(i)) {
      if (params.filter[i] != null) {
        if (typeof params.filter[i] === "object") {
          for (let j = 0; j < params.filter[i].length; j++) {
            let qs = `q[${i}][]=${params.filter[i][j]}`;
            headData.push(qs);
          }
        } else {
          let nevi = "q[" + i + "]=" + params.filter[i];
          headData.push(nevi);
        }
      }
    }
  }

  let bUrl = `${url}?${stringify(params.data)}`;
  if (headData.length > 0) {
    url = `${bUrl}&${headData.join("&")}`;
  } else {
    url = bUrl;
  }
  return server.request({
    url,
    method: "GET",
    params
  });
};

export const post = (url, data) => {
  return server.request({
    url,
    method: "POST",
    data
  });
};
