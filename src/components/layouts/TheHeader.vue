<template>
    <div class="navbar navbar-default topnav">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" @click="toggleNav">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <a href="/" class="navbar-brand">
                    <img src="../../assets/8UT35md5t9.png" :alt="logo.title" />
                    <!-- <span class="title">
                        {{ logo.title }}
                    </span> -->
                </a>
            </div>
            <!-- { in: showCollapsedNav } -->
            <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse',{'in':showCollapsedNav }]">
                <ul class="nav navbar-nav">
                    <li v-for="(item,index) in navList" :key="index" :class="{ active: index === activeNavIndex }">
                        <a href="#" @click="changeNavIndex(index)">{{ item }}</a>
                    </li>
                </ul>
                <!-- 注册组件入口 -->
                <div class="navbar-right">
                    <SearchInput></SearchInput>
                    <TheEntry/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TheEntry from '@/components/layouts/TheEntry'
import SearchInput from '@/components/layouts/SearchInput'
export default {
  name: 'TheHeader',
  components: { TheEntry ,SearchInput},
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}site/ByvFbNlQYVwhvTyBgLdqitchoacDNznN.jpg`,
        title: 'VuejsCaff'
      },
      navList: ['社区', '头条', '问答', '教程'],
      activeNavIndex: 0,
      showCollapsedNav: false
    }
  },
  beforeCreate() {
    //   实例初始化之后，数据观测之前被调用
    //   在 vue 实例创建之前，添加一个属性
    this.uploadsUrl =
      'https://vuejscaffcdn.phphub.org/uploads/images/201806/06/1/8UT35md5t9.png?imageView2/1/w/200/h/200'
  },
  methods: {
    changeNavIndex(index) {
      this.activeNavIndex = index
    },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav
    }
  }
}
</script>
<style scoped>
.title {
  display: inline;
}
/* .navbar-default .navbar-nav > .active > a {
  background: rgba(0, 0, 0, 0.03);
} */
</style>
