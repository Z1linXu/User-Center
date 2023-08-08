/**
 * request 网络请求工具
 */
import {extend} from 'umi-request';
import {stringify} from "querystring";
import {message} from "antd";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)
  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> =>
{
  const res = await response.clone().json();
  if (res.code ===0){
    return res.data;
  }
  if(res.code === 40100){
    message.error('Please login.');
    // @ts-ignore
    history.replace({
      pathname:'/user/login',
      search: stringify({
        redirect: location.pathname,
      }),
    });
  } else {
    message.error(res.description)
  }
  return res.data;
});

export default request;
