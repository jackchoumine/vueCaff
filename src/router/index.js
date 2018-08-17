/* 
路由控制文件
*/
import Vue from 'vue'
import Router from 'vue-router'
//  引入路由定义
import routes from './routes'
// 使用路由中间件
Vue.use(Router)

// 新建路由实例
const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active', //为当前路由添加一个 acitve 类，表激活状态
  routes
})
router.beforeEach((to, from, next) => {
  //获取仓库登录信息
  const auth = router.app.$options.store.state.auth;
  const app = router.app
  const store = app.$options.store
  // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId
  // 希望在导航到新页面前隐藏消息提示，
  //只需在全局前置守卫里调用实例的 $message 的 hide 方法。
  app.$message.hide()

  if (auth && to.path.includes('/auth/') ||
    (!auth && to.meta.auth) ||
    (articleId && !store.getters.getArticleById(articleId))
  ) {
    // 当前用户已登录，且目标路由包含 /auth/,跳转到首页
    // 用户未登录且目标页面需要登录时，跳到首页
    console.log(1)
    next('/')
  } else {
    console.log(2)
    next()
  }
})
// 全局后置钩子函数
router.afterEach((to, from) => {
  const app = router.app
  const store = app.$options.store
  const showMsg = to.params.showMsg
  if (showMsg) {
    if (typeof showMsg === 'string') {
      app.$message.showMsg(showMsg)
    } else app.$message.show('操作成功')
  }
})
export default router
