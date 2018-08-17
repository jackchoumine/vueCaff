<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
            <!-- 创建时间 -->
            <abbr> {{date|moment('from')}}</abbr>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>
              <!-- 编辑删除图标 用户登录 且 id 为 1 显示图标-->
              <div v-if="auth && uid === 1" class="panel-footer operate">
                <div class="actions">
                  <a @click="deleteArticle" class="admin" href="javascript:;">
                    <i class="fa fa-trash-o"></i>
                  </a>
                  <a @click="editArticle" class="admin" href="javascript:;">
                    <i class="fa fa-pencil-square-o"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
// 引入 mapState 辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Content',
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      date: '',
      uid: 1
    }
  },
  //   计算属性
  computed: {
    //   将仓库以下的状态混入到计算属性中
    ...mapState(['auth', 'user'])
  },
  //   在实例创建完之后调用
  created() {
    //   获取路径参数
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let { uid, title, content, date } = article
      this.uid = uid
      this.title = title
      //   用编辑器的 markdown 方法将 Markdown 内容转为 HTML
      // this.content = SimpleMDE.prototype.markdown(content)
      this.content = SimpleMDE.prototype.markdown(
        emoji.emojify(content, name => name)
      )
      this.date = date
      this.$nextTick(() => {
        //   遍历 当前实例下的 'pre code'元素
        this.$el.querySelectorAll('pre code').forEach(el => {
          // 语法高亮
          hljs.highlightBlock(el)
        })
      })
    }
    this.articleId = articleId
  },
  methods: {
    editArticle() {
      // 跳转到文章编辑页面
      this.$router.push({ name: 'Edit', params: { articleId: this.articleId } })
    },
    //  删除文章
    deleteArticle() {
      this.$swal({
        text: '你确定要删除此内容吗?',
        confirmButtonText: '删除'
      }).then(res => {
        if (res.value) {
          this.$store.dispatch('post', { articleId: this.articleId })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>