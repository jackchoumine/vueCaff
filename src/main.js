// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入 vue.js
import Vue from 'vue'
// 引入 App.vue
import App from './App'
import router from './router'
// 引入全局指令
import './directives'
import './components'
// 引入 store
import store from './store'
import VueSweetalert2 from './plugins/vue-sweetalert2'
Vue.use(VueSweetalert2)
import Message from './plugins/message'
import './filters'
import { mockArticles } from "./mock/data";
import ls from "./utils/localStorage";
Vue.use(Message)
Vue.config.productionTip = false

//执行匿名函数
const AddMockData = (() => {
    // 是否加入测试数据
    const isAddMockData = true;
    let userArticles = ls.getItem('articles');
    if (Array.isArray(userArticles)) {
        // 过滤掉 uid 不是1的元素
        userArticles = userArticles.filter(ele => parseInt(ele.uid) === 1);
    } else {
        userArticles = []
    }
    if (isAddMockData) {
        // 合并用户数据和测试数据 ES6写法
        store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(11)]);
        // ES5 写法
        // store.commit('UPDATE_ARTICLES', userArticles.concat(mockArticles(10)));
        //还可以这样 不推荐
        /* userArticles.push(...mockArticles(40));
        console.log(userArticles)
        store.commit('UPDATE_ARTICLES', userArticles); */
    } else {
        //只用用户数据
        store.commit('UPDATE_ARTICLES', userArticles);
    }
})()

// eslint 配置，允许 new 一个实例后不赋值，我们没有使用 eslint，如果有，则下一行注释不可缺少
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, //注入store
    components: {
        App
    },
    template: '<App/>',
    created() {
        console.log(this.$options.el)
    }
})
