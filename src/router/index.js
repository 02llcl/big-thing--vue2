import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
 
  {
    path: '/reg',
    component: ()=>import('@/views/register/index.vue')
  },
  {
    path: '/login',
    component: ()=>import('@/views/login/index.vue')
  },
  {
    path: '/home',
    component: ()=>import('@/views/layout/index.vue')
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
    const token = store.state.token
    if(token){
        store.dispatch('initUserInfo')
    }
    next()
})
export default router
