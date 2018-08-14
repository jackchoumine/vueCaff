import Vue from 'vue'
import validator from './validator'

//注册全局指令，所有组件都能用
/**
 *'validator'———— 指令名
 * validator ———— 指令对象
 */
Vue.directive('validator', validator)
