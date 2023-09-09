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

export const updateuserimgAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

export const updataPwdAPI = ({ old_pwd, new_pwd, re_pwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      old_pwd,
      new_pwd,
      re_pwd
    }
  })
}
export const getArtCateListAPI = () => {
  return request({
    url: '/my/cate/list'
  })
}

export const addArtCateAPI=({cate_name,cate_alias})=>{
  return request({
    url:'/my/cate/add',
    method:'POST',
    data:{
      cate_name,
      cate_alias
    }
  })
}

export const updateArtCateAPI=({id,cate_name,cate_alias})=>{
  return request({
    url:'/my/cate/info',
    method:'put',
    data:{
      id,
      cate_name,
      cate_alias
    }
  })
}

export const delArtCateAPI=(id)=>{
  return request({
    url:'/my/cate/del',
    method:'DELETE',
    params:{
      id
    }
  })
}

export const postCateAPI=(fd)=>{
  return request({
    url:'/my/article/add',
    method:'POST',
    data:fd
  })
}

export const getArticleListAPI= ({ pagenum, pagesize, cate_id, state }) => {
  return request({
    url: '/my/article/list',
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
}
