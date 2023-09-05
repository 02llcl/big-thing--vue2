import Vue from 'vue'
import Vuex from 'vuex'
import createPersisteredState from 'vuex-persistedstate'
import { getuserinfroAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' ,
    userinfo: {}
  },
  getters: {
    nickname(state){
      return state.userinfo.nickname
    },
    username(state){
      return state.userinfo.username
    },
    userimg(state){
      return state.userinfo.user_pic
    }
  },
  mutations: {
    updateToken(state, newToken){
      state.token=newToken
    },
    updateUserInfo(state, info) {
      state.userinfo= info
    }
  },
  actions: {
    async initUserInfo (store){
      const{data: res} =await getuserinfroAPI()
      console.log(res)
      if(res.code==0){
        store.commit('updateUserInfo',res.data)
      }
    }
  },
  modules: {
  },
  plugins:[createPersisteredState()]
})
