import request from '@/utils/request'
import store from '@/store/index'
export const registerAPI = ({ username, password, repassword }) => {
    return request({
      url: '/api/reg',
      method: 'post',
      data: {
        username,
        password,
        repassword
      }
    })
  }

export const loginAPI = ({username,password}) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data:{
      username,
      password
    }
  })
}

export const getuserinfroAPI=()=>{
  return request({
    url: '/my/userinfo',
    method: 'get',
    headers: {
      Authorization: store.state.token
    }
  })
}
