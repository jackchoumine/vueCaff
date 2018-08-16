import MessageComponent from '../components/Message'

export default {
  install: (Vue) => {
    /* 
Vue.extend 用来创建一个新『子类』，其参数是一个包含组件选项的对象，对应我们这里的 Message 组件；
使用 new 关键字可以创建一个新的 Message 实例，因为没有指定 el 挂载目标，当前实例处于『未挂载』状态；
使用 vm.$mount() 手动地挂载一个未挂载的实例，并返回当前实例，此时我们能从实例获取 $el;
    */
    const Message = Vue.extend(MessageComponent)
    const vm = new Message()
    const $el = vm.$mount().$el

    Vue.nextTick(() => {
      // 在一次 DOM 更新后，将实例目标添加到 #main-container 元素内部最前面
      document.querySelector('#main-container').prepend($el)
    })
    /**
     * 添加一个事件监听
     * 第一个参数是 事件名称或包含事件名称的数组
     * 第二个参数是回调函数，会接收触发函数的所有参数
     */
    vm.$on('update:show', (value) => {
      vm.show = value
    })

    const message = {
      // 更改消息并显示提示框
      show(msg = '', type = 'success') {
        vm.msg = msg
        vm.type = type
        vm.show = false

        Vue.nextTick(() => {
          vm.show = true
        })
      },
      //   关闭提示框
      hide() {
        Vue.nextTick(() => {
          vm.show = false
        })
      }
    }
    // 加载实例方法
    Vue.prototype.$message = message
  }
}
