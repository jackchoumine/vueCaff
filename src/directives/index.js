import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'
//注册全局指令，所有组件都能用
/**
 *'validator'———— 指令名
 * validator ———— 指令对象
 */
Vue.directive('validator', validator)
Vue.directive('dropdown', dropdown)

//使用循环来注册指令
/* const directives = {
  validator,
  dropdown
}

for (const [key, value] of Object.entries(directives)) {
  Vue.directive(key, value)
} */
