import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

const state = {
  //状态信息，从本地获取
  user: ls.getItem('user'),
  //   用户登录状态
  auth: ls.getItem('auth'),
  articles: ls.getItem('articles'),
}

const mutations = {
  /**
   * UPDATE_USER 是事件类型，后期可用常量代替事件类型
   * @param {} state 
   * @param {Object}} user 
   */
  UPDATE_USER(state, user) {
    state.user = user
    ls.setItem('user', user)
  },
  UPDATE_AUTH(state, auth) {
    state.auth = auth;
    ls.setItem('auth', auth);
  },
  UPDATE_ARTICLES(state, articles) {
    state.articles = articles;
    ls.setItem('articles', articles)
  }
}
const actions = {
  /**
   * 登录时有传用户信息，更新用户信息
   * login 的第一个参数是一个与仓库实例具有相同方法和属性的 context 对象，可从 context.state 获取仓库 state 
   * context.commit 和 {commit} = context等同
   * @param {*} param0 
   * @param {*} user 
   */
  login({
    commit
  }, user) {
    if (user) commit('UPDATE_USER', user)
    commit('UPDATE_AUTH', true)
    router.push('/')
  },
  /**
   * 退出事件
   * @param {} param0 
   */
  logout({
    commit
  }) {
    commit('UPDATE_AUTH', false)
    router.push({
      name: 'Home',
      params: {
        logout: true
      }
    })
  },
  // 更新个人信息
  updateUser({
    state,
    commit
  }, user) {
    const stateUser = state.user
    if (stateUser && typeof stateUser === 'object') {
      // 合并新旧个人信息，等价于 user = Object.assign({}, stateUser, user)
      user = {
        ...stateUser,
        ...user
      }
    }
    // 更新个人信息
    commit('UPDATE_USER', user)
  }
}
//创建新的仓库实例
const store = new Vuex.Store({
  state, //共享的状态，不能直接更改，但是可访问
  mutations, //更改状态的方法
  actions, //类似 mutations 
})

export default store
