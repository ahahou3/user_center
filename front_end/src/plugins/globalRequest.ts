import { extend } from 'umi-request'
import {history} from "umi";
import {stringify} from "querystring";
import { message } from 'antd';

const request = extend({

})
request.interceptors.response.use(async (response: Response) => {
  const res =  await response.clone().json()

  if (res.code === 410) {
    message.error('请先登录');
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname
      })
    })
  }
  return res;
})

export default request
