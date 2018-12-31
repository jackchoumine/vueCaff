import Vue from 'vue'
import Message from './Message'
import Modal from './Modal.vue'
import Pagination from './Pagination'
// 注册全局组件，第一个参数是组件名，第二个参数是组件对象
/* Vue.component('Message', Message)
Vue.component('Modal', Modal) */
const components = {
  Message,
  Modal,
  Pagination
}
for (const [key, value] of Object.entries(components)) {
  Vue.component(key, value)
}
