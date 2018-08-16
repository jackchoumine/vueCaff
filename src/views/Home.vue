<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
    </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  /**
   * 组件内路由守卫
   * 在确认渲染该组件的对应路由前调用，不能访问 this
   * 可传递一个回调 给 next ,在回调中用 vm 访问路由实例
   */

  /*   to 目标路由
  from 离开的路由
  name：路由的名称，如 'Register'；
path：路由的路径，如 '/auth/register'；
params：路由参数对象，如 { id: "1" }；
query：URL 查询参数对象，如 { page: "1" }；
meta：元信息对象，如 { auth: true }；
  next  */

  beforeRouteEnter(to, from, next) {
    //  路由名称
    const fromName = from.name
    //获取 logout 参数
    const logout = to.params.logout
    // 确认导航
    next(vm => {
      // 通过 vm 参数访问组件实例，已登录时，评估路由名称
      if (vm.$store.state.auth) {
        switch (fromName) {
          // 从注册页面跳转而来
          case 'Register':
            vm.showMsg('注册成功')
            break
          case 'Login':
            // 显示登录成功
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }
    })
  },
  computed: {
    auth() {
      return this.$store.state.auth
    }
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>
</style>