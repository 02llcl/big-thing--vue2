import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
import { Message } from 'element-ui'
const myaxios = axios.create({
    baseURL: 'http://big-event-vue-api-t.itheima.net'

})
//添加请求拦截器
myaxios.interceptors.request.use(function(config){
    if(store.state.token){
        config.headers.Authorization=store.state.token
    }
    return config
}),function(error){
    return Promise.reject(error)
}



// 定义响应拦截器
myaxios.interceptors.response.use(function (response) {
    // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
    return response
  }, function (error) {
    // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
    if (error.response.status === 401) {
      // 无效的 token
      // 把 Vuex 中的 token 重置为空，并跳转到登录页面
      store.commit('updateToken', '')
      store.commit('updateUserInfo',{})
      router.push('/login')
      Message.error('用户身份已过期')
    }
    return Promise.reject(error)
  })
export default myaxios