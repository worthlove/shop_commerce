import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/login'
import Home from "@/views/home";

Vue.use(VueRouter)

const routes = [
  // 当路由遇到 / 则重定向到 /login 路径下
  {path: '/', redirect: '/login'},
  // 登录组件
  {path: '/login', component: Login},
  // Home组件
  {path: '/home', component: Home},
];
const router = new VueRouter({
  routes
})
/**
 * @param router:路由对象
 * @param to:将要访问的路径
 * @param from:代表从那个路径而来
 * @param next:是一个函数(1、next();2、next("/login"强制跳转登录页))
 * */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const tokens = window.sessionStorage.getItem("token")
    if (!tokens) {
      return next('/login')
    } else {
      next()
    }
  }
})
export default router
