import request from '@/utils/request'
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
    method: 'get'
  })
}

export const getmenusAPI=()=>{
  return request({
    url: '/my/menus',
    method:'get'
  })
}

export const updateuserAPI=({id,username,nickname,email,user_pic})=>{
  return request({
    url: '/my/userinfo',
    method:'PUT',
    data:{
      id,
      username,
      nickname,
      email,
      user_pic
    }
  })
}
