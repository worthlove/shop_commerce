import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // vuex
import './plugins/element.js'
/* 导入全局样式表 */
import './assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont.css'
/* 导入axios库 */
import axios from 'axios'
/* 配置请求的根路径 */
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
/* 挂载原型的属性,通过 this 直接访问 $http */
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
