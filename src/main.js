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
Vue.use(Message)
Vue.config.productionTip = false

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
