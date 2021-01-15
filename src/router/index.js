/*
 * @Description: 路由控制
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-16 01:12:38 +0800
 * @LastEditors: JackChou
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
  linkExactActiveClass: 'active', //为当前路由添加一个 active 类，表激活状态
  routes,
  //指定滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // 有锚点时，滚动到锚点
      return { selector: to.hash }
    } else if (savedPosition) {
      // 有保存位置时，滚动到保存位置
      //TODO:savedPosition 是保存的位置，该参数在使用浏览器的『前进』/『后退』 按钮时才可用。
      return savedPosition
    } else {
      // 默认滚动到页面顶部
      return { x: 0, y: 0 }
    }
  },
})
/**
 * 前置全局路由守卫
 */
router.beforeEach((to, from, next) => {
  //获取仓库登录信息
  const auth = router.app.$options.store.state.auth
  const app = router.app
  const store = app.$options.store
  // 获取目标页面路由参数里的 articleId
  const articleId = to.params.articleId
  // 当前用户
  const user = store.state.user && store.state.user.name
  // 路由参数中的用户
  const paramUser = to.params.user

  // 希望在导航到新页面前隐藏消息提示，
  // 只需在全局前置守卫里调用实例的 $message 的 hide 方法。
  app.$message.hide()

  if (
    (auth && to.path.includes('/auth/')) ||
    (!auth && to.meta.auth) ||
    (articleId && !store.getters.getArticleById(articleId)) ||
    // 路由参数中的用户不为当前用户，且找不到与其对应的文章时，跳转到首页  实际项目中根据用户是否注册来判断
    (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
  ) {
    // 当前用户已登录，且目标路由包含 /auth/,跳转到首页
    // 用户未登录且目标页面需要登录时，跳到首页
    console.log('前置全局路由守卫，跳转到首页')
    next('/')
  } else {
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
