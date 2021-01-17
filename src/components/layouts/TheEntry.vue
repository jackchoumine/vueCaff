<!--
 * @Description: 个人中心入口、登录、注册
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 19:22:10 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="navbar-right">
    <ul v-if="auth" class="nav navbar-nav github-login">
      <!-- 创作文章 -->
      <li>
        <a v-dropdown href="javascript:;">
          <i class="fa fa-plus text-md"></i>
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/articles/create">
              <i class="fa fa-paint-brush text-md"></i>
              创作文章
            </router-link>
          </li>
        </ul>
      </li>
      <!-- 登录状态 -->
      <li>
        <a v-dropdown href="javascript:;">
          <span v-if="user">
            <img v-if="user.avatar" :src="user.avatar" class="avatar-topnav" />
            <span v-if="user.name">{{ user.name }}</span>
          </span>
          <span v-else>佚名</span>
          <span class="caret"></span>
        </a>
        <!-- 入口菜单 -->
        <ul class="dropdown-menu">
          <!-- 个人专栏 -->
          <li v-if="user">
            <router-link :to="`/${user.name}`">
              <i class="fa fa-list-ul text-md i-middle"></i>
              个人专栏
            </router-link>
          </li>
          <!-- 编辑资料 -->
          <li>
            <router-link to="/users/1/edit">
              <i class="fa fa-cog text-md i-middle"></i>
              编辑资料
            </router-link>
          </li>
          <!-- 退出 -->
          <li>
            <a href="#" @click="logout">
              <i class="fa fa-sign-out text-md"></i>
              退出
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <div v-else class="nav navbar-nav github-login">
      <router-link to="/auth/login" class="btn btn-default login-btn">
        <i class="fa fa-user"></i>
        登 录
      </router-link>
      <router-link to="/auth/register" class="btn btn-default login-btn">
        <i class="fa fa-user-plus"></i>
        注 册
      </router-link>
    </div>
  </div>
</template>

<script>
// 引入 mapState 辅助函数
import { mapState } from 'vuex'
export default {
  name: 'TheEntry',
  computed: {
    ...mapState(['auth', 'user']),
    //不使用 mapState
    /*  auth() {
      return this.$store.state.auth
    },
    user() {
      return this.$store.state.user
    } */
  },
  // 添加 methods 选项，并添加 logout 方法
  methods: {
    logout() {
      this.$swal({
        text: '你确定要退出吗？',
        confirmButtonText: '退出',
      }).then(res => {
        if (res.value) this.$store.dispatch('logout')
      })
    },
  },
}
</script>

<style scoped>
</style>