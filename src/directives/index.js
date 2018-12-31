import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'
// 引入 title.js 的默认值
import title from './title'
//注册全局指令，所有组件都能用
/**
 *'validator'———— 指令名
 * validator ———— 指令对象
 */
/* Vue.directive('validator', validator)
Vue.directive('dropdown', dropdown) */

//使用循环来注册指令
const directives = {
    validator,
    dropdown,
    // 添加 title 以便在循环中进行注册
    title
}

for (const [key, value] of Object.entries(directives)) {
    Vue.directive(key, value)
}
