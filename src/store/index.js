import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
// 将所有导出放在 moreActions 里面  TODO:
import * as moreActions from './actions'
import * as moreGetters from './getters'
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
    // 更改所有文咋请的事件类型
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
    },
    // 对象展开运算符混入 moreActions
    // const actions = Object.assign(actions, moreActions)
    ...moreActions,
}
const getters = {
    // 第一个参数是 state ,因为要传递 id,这返回一个函数
    getArticleById: (state,getters) => (id) => {
        // 从仓库中获取所有文章
        // let articles = state.articles
        // 用派生状态 computedArticles 作为所有文章
        let articles = getters.computedArticles
        
        // 所有文章是一个数组
        if (Array.isArray(articles)) {
            let result = articles.filter(article => parseInt(id) == parseInt(article.articleId))
            // console.log('result',result);
            return result.length ? result[0] : null
        } else {
            return null
        }
    },
    // TODO:混入 getters 可理解为
    // getters = Object.assign(getters,moreGetters)
    ...moreGetters
}
//创建新的仓库实例
const store = new Vuex.Store({
    state, //共享的状态，不能直接更改，但是可访问
    getters,
    mutations, //更改状态的方法
    actions, //类似 mutations 
})

export default store
