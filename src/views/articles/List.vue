<!--
 * @Description: 文章列表
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 22:11:07 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link v-if="auth" to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>

        <ul class="list-group">
          <!-- 使用 v-for 指令渲染文章列表 -->
          <li v-for="article in articles" :key="article.articleId" class="list-group-item">
            <img :src="article.uavatar" class="avatar avatar-small" />
            <!-- 点击文章的标题，前往文章页面显示文章 -->
            <router-link :to="`/articles/${article.articleId}/content`" class="title">
              {{ article.title }}
            </router-link>
            <span class="meta pull-right">
              <span class="timeago">{{ article.date | moment('from') }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 mapState 辅助函数
import { mapState } from 'vuex'

export default {
  name: 'List',
  data() {
    return {
      articles: [], //用户文章
    }
  },
  computed: {
    // 将指定的状态混入计算属性
    ...mapState(['auth', 'user']),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.articles = vm.$store.getters.getArticlesByUid(null, to.params.user)
    })
  },
}
</script>

<style scoped>
</style>