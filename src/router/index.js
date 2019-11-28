import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
export function createRouter () {
  return new Router({
    mode: 'history',
    /*  base:'/'+web.name,*/
    base:'/bim',
    routes: [
      {
        path: '/',
        name: 'root',
        redirect:'/login'
      },
      {
        path: '/login',
        name: 'login',
        component:()=>import('../components/login'),
      },
      {
        path: '/home',
        name: 'home',
        component:()=>import('../components/home'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: '*',
        name: 'roots',
        redirect:'/login'
      },
    ]
  })
}
