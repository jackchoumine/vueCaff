/*
 * @Description: 弹窗插件
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:16:57 +0800
 * @LastEditors: JackChou
 */
import swal from 'sweetalert2'
export default {
  install: Vue => {
    swal.setDefaults({
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(140,212,245)',
      cancelButtonColor: 'rgb(140,212,245)',
    })
    Vue.swal = swal
    Vue.prototype.$swal = swal
  },
}
