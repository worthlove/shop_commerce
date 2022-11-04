import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 当路由遇到 / 则重定向到 /login 路径下
  { path: '/', redirect: '/login', meta: { title: '电商后台管理平台' } },
  // 登录组件
  { path: '/login', meta: { title: '登录' }, component: () => import('@/components/login') },
  // Home组件
  {
    path: '/home',
    meta: { title: '主页' },
    component: () => import('@/views/home'),
    redirect: '/welcome',
    // 子路由
    children: [
      { path: '/welcome', meta: { title: '欢迎页面' }, component: () => import('@/components/welcome') },
      { path: '/users', meta: { title: '用户列表' }, component: () => import('@/components/user') },
      { path: '/rights', meta: { title: '权限列表' }, component: () => import('@/components/rights') },
      { path: '/roles', meta: { title: '角色列表' }, component: () => import('@/components/roles') },
    ]
  }
]
const router = new VueRouter({
  routes
})
/**
 * @param 路由导航守卫
 * @param router:路由对象
 * @param to:将要访问的路径
 * @param from:代表从那个路径而来
 * @param next:是一个函数(1、next();2、next("/login"强制跳转登录页))
 * */
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const tokens = window.sessionStorage.getItem('token')
    if (!tokens) {
      return next('/login')
    } else {
      next()
    }
  }
})
export default router
