import Vue from 'vue'
import './assets/css/reset.min.css'
import App from './App'
//路由
import {createRouter} from './router'
const router = createRouter();
//路由权限
router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem("gtoa_token");//获取浏览器缓存的用户信息
  if (!token&&to.path == '/home') { //如果home没token就跳回登录
    next('/login');
  } else {
    next();
  }
});
//element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
//vuex
import createStore from './store/index';
const store =createStore();

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
