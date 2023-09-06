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
    path: '/',
    component: ()=>import('@/views/layout/index.vue'),
    redirect: '/home',//默认的二级路由
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info', // 这里必须叫user-info, 因为侧边栏导航切换的是它
        component: () => import('@/views/User/userInfo')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})
let whiteList = ['/login','/reg']
router.beforeEach((to,from,next)=>{
    const token = store.state.token
    if(token){
        store.dispatch('initUserInfo')
       next()
    } 
    else{
      if(whiteList.includes(to.path)){
        next()
      }
      else{
        next('/login')
      }
    }
})
export default router
