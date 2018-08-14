/* 
路由控制文件
*/
import Vue from 'vue'
import Router from 'vue-router'
// 使用路由中间件
Vue.use(Router)

// 路由定义
const routes = [{
  path: '/auth/register',
  name: 'Register',
//   懒加载视图组件
  component: () =>
    import ('@/views/auth/Register')
}]

// 新建路由实例
const router = new Router({
  mode: 'history',
  routes
})

export default router
