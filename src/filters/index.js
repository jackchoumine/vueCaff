/*
 * @Description: 全局过滤器
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:15:04 +0800
 * @LastEditors: JackChou
 */
import Vue from 'vue'
import moment from './moment'
// 'moment' 是过滤器名称 moment 是一个函数
Vue.filter('moment', moment)
