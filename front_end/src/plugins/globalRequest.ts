import { extend } from 'umi-request'
import {history} from "umi";
import {stringify} from "querystring";
import { message } from 'antd';

const request = extend({
  credentials: 'include', //默认请求是否带上cookie
  prefix: process.env.NODE_ENV === 'production'? 'http://user-center.ahahou.online': undefined,
})

/**
 * 全局请求拦截器
 */
request.interceptors.response.use(async (response: Response) => {
  const res =  await response.clone().json()
  if(res.code === 200){
    return res.data
  }
  if (res.code === 410) {
    message.error('未登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname
      })
    })
    return
  }
  if(res.code === 400){
    console.log("400")
    message.error(res.description)
    return res
  }
  if(res.code === 401){
    message.error(res.description)
  }

  console.log("全局异常处理器数据：", res);
  // return res.data;
})

export default request
