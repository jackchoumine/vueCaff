<!--
 * @Description: 文章内容
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:07:17 +0800
 * @LastEditors: JackChou
-->
<template>
  <!--  <div class="blog-container" style="margin-top:20px">
  <div class="blog-pages">-->
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body content-body">
      <h1 class="text-center">{{ title }}</h1>
      <div class="article-meta text-center">
        <i class="fa fa-clock-o"></i>
        <!-- 创建时间 -->
        <abbr>{{ date | moment('from') }}</abbr>
      </div>
      <div class="entry-content">
        <div class="content-body entry-content panel-body">
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
    <!-- 在文章下面显示 点赞 -->
    <div class="votes-container panel panel-default padding-md">
      <div class="panel-body vote-box text-center">
        <div class="btn-group">
          <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
            <!-- 点赞图标 -->
            <i class="fa fa-thumbs-up"></i>
            {{ likeClass ? '已赞' : '点赞' }}
          </a>
          <div class="or"></div>
          <!-- showQrcode = true 内联语句，相当于事件处理函数 handler(){
            this.showQrcode = true;
          }-->
          <button @click="showQrcode = true" class="btn btn-success">
            <i class="fa fa-heart"></i>
            打赏
          </button>
        </div>
        <div class="voted-users">
          <div class="user-lists">
            <span v-for="(likeUser, index) in likeUsers" :key="index">
              <router-link
                :to="`/${likeUser.name}`"
                tag="img"
                :src="likeUser.uavatar"
                class="img-thumbnail avatar avatar-middle"
                :class="{ 'animated swing': likeUser.uid === 1 }"
              ></router-link>
            </span>
          </div>
          <!-- 没人点赞，显示这个 div todo 还没安装 animate.css 动画库 -->
          <div v-if="!likeUsers.length" class="vote-hint">成为第一个点赞的人吧 ?</div>
        </div>
      </div>
    </div>
    <!-- 打赏弹窗 -->
    <Modal :show.sync="showQrcode" class="text-center">
      <div v-if="user" slot="title">
        <img :src="user.avatar" class="img-thumbnail avatar" width="48" />
      </div>
      <div>
        <p class="text-md">如果你想学习更多前端的知识，VuejsCaff.com 是个不错的开始</p>
        <div class="payment-qrcode inline-block">
          <h5>扫一扫打开 VuejsCaff.com</h5>
          <p>
            <!-- 动态二维码 -->
            <qrcode-vue value="https://vuejscaff.com/" :size="160"></qrcode-vue>
          </p>
          <!-- 静态二维码 -->
          <!-- <p><img src="https://vuejscaffcdn.phphub.org/uploads/images/201803/25/2/g3CFVs0h7B.jpeg?imageView2/2/w/1024/h/0" width="160"></p> -->
        </div>
      </div>
      <div slot="footer">
        <div class="text-center">祝你学习愉快 :)</div>
      </div>
    </Modal>
    <!--  评论框 -->
    <div id="reply-box" class="reply-box form box-block">
      <div class="form-group comment-editor">
        <!-- 未登录时，显示一个禁用的评论框 -->
        <textarea v-if="auth" id="editor"></textarea>
        <textarea
          v-else
          disabled
          class="form-control"
          placeholder="需要登录后才能发表评论"
          style="height: 172px"
        ></textarea>
      </div>
      <div class="form-group reply-post-submit">
        <button class="btn btn-primary" id="reply-btn" :disabled="!auth" @click="comment">
          {{ commentId ? '保存编辑' : '回复' }}
        </button>
        <!--  根据有无 commentId 显示不同的操作 -->
        <span class="help-inline btn cancel" style="cursor: pointer" v-show="commentId" @click="cancelEditComment">
          取消编辑
        </span>
        <span class="help-inline" v-show="!commentId">Ctrl+Enter</span>
      </div>
      <!--  html 格式的评论，用v-html输出 -->
      <div class="box preview markdown-body" id="preview-box" v-show="commentHtml" v-html="commentHtml"></div>
    </div>
    <!-- 评论列表 -->
    <div class="replies panel panel-default list-panel replies-index">
      <div class="panel-heading">
        <div class="total">
          回复数量:
          <b>{{ comments.length }}</b>
        </div>
      </div>
      <div class="panel-body">
        <!-- TODO:过度效果的使用 -->
        <transition-group name="fade" tag="ul" id="reply-list" class="list-group row">
          <li v-for="(comment, index) in comments" :key="comment.commentId" class="list-group-item media">
            <div class="avatar avatar-container pull-left">
              <router-link :to="`/${comment.uname}`">
                <img :src="comment.uavatar" class="media-object img-thumbnail avatar avatar-middle" />
              </router-link>
            </div>
            <div class="infos">
              <div class="media-heading">
                <router-link :to="`/${comment.uname}`" class="remove-padding-left author rm-link-color">
                  {{ comment.uname }}
                </router-link>
                <!-- 编辑删除图标 -->
                <span v-if="auth" class="opreate pull-right">
                  <span v-if="comment.uid === 1">
                    <a href="javascript:;" @click="editComment(comment.commentId, index)">
                      <i class="fa fa-edit"></i>
                    </a>
                    <span>·</span>
                    <a href="javascript:;">
                      <i class="fa fa-trash-o" @click="deleteComment(comment.commentId)"></i>
                    </a>
                  </span>
                </span>
                <div class="meta">
                  <a :id="`reply${index + 1}`" :href="`#reply${index + 1}`" class="anchor">#{{ index + 1 }}</a>
                  <span>⋅</span>
                  <abbr class="timeago">{{ comment.date | moment('from', { startOf: 'second' }) }}</abbr>
                </div>
              </div>

              <div class="preview media-body markdown-reply markdown-body" v-html="comment.content"></div>
            </div>
          </li>
        </transition-group>
        <div v-show="!comments.length" class="empty-block">暂无评论~~</div>
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
// 引入 qrcode.vue 的默认值
import QrcodeVue from 'qrcode.vue'
export default {
  name: 'Content',
  components: {
    QrcodeVue,
  },
  data() {
    return {
      title: '', // 文章标题
      content: '', // 文章内容
      date: '', //文章创建时间
      uid: 1, //用户 ID
      likeUsers: [],
      likeClass: '',
      showQrcode: false, // 是否显示打赏弹窗
      commentHtml: '', // 评论 HTML
      comments: [], // 评论列表
      commentId: undefined, //评论 ID
    }
  },
  //   计算属性
  computed: {
    //   将仓库以下的状态混入到计算属性中
    ...mapState(['auth', 'user']),
  },
  //   在实例创建完之后调用
  created() {
    //   获取路径参数
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let { uid, title, content, date, likeUsers, comments } = article
      this.uid = uid
      this.title = title
      //   用编辑器的 markdown 方法将 Markdown 内容转为 HTML
      // this.content = SimpleMDE.prototype.markdown(content)
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
      this.date = date
      this.likeUsers = likeUsers || []
      // 因为是一个对象数组，注意为何不用 indexOf 或者 includes
      this.likeClass = this.likeUsers.some(likeUser => 1 === likeUser.uid) ? 'active' : ''
      this.renderComments(comments)
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
  mounted() {
    // 已登录时，才开始创建
    if (this.auth) {
      // 自动高亮编辑器的内容
      window.hljs = hljs

      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: '请使用 Markdown 格式书写 ;-)，代码片段粘贴时请注意使用高亮语法。',
        spellChecker: false,
        autoDownloadFontAwesome: false,
        // 不显示工具栏
        toolbar: false,
        // 不显示状态栏
        status: false,
        renderingConfig: {
          codeSyntaxHighlighting: true,
        },
      })

      // 内容改变监听
      simplemde.codemirror.on('change', () => {
        // 更新 commentMarkdown 为编辑器的内容
        this.commentMarkdown = simplemde.value()
        // 更新 commentHtml，我们先替换原内容中的 emoji 标识，然后使用 markdown 方法将内容转成 HTML
        this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name))
      })

      // 按键松开监听
      simplemde.codemirror.on('keyup', (codemirror, event) => {
        // 使用 Ctrl+Enter 时提交评论
        if (event.ctrlKey && event.keyCode === 13) {
          this.comment()
        } else if (this.commentId && event.keyCode === 27) {
          //有 commentId  且按下 Esc ，取消评论
          this.cancelEditComment()
        }
      })

      // 将编辑器添加到当前实例
      this.simplemde = simplemde
    }
  },
  methods: {
    editArticle() {
      // 跳转到文章编辑页面
      this.$router.push({
        name: 'Edit',
        params: { articleId: this.articleId },
      })
    },
    //  删除文章
    deleteArticle() {
      this.$swal({
        text: '你确定要删除此内容吗?',
        confirmButtonText: '删除',
      }).then(res => {
        if (res.value) {
          this.$store.dispatch('post', { articleId: this.articleId })
        }
      })
    },
    like(e) {
      if (!this.auth) {
        // 用户未登录，提醒登录
        this.$swal({
          text: '需要登录才能执行操作。',
          confirmButtonText: '前往登录',
        }).then(res => {
          if (res.value) {
            this.$route.push('/auth/login')
          }
        })
      } else {
        //用户已登录
        console.log(e)
        const target = e.currentTarget
        // contains 不是新增 API 在哪定义的？
        const active = target.classList.contains('active')
        const articleId = this.articleId
        // 包含点赞样式，说明点赞过了，就取消点赞
        if (active) {
          this.likeClass = ''
          this.$store.dispatch('like', { articleId }).then(likeUsers => {
            // this.likeUsers = likeUsers;
            //使用带用户信息的点赞用户
            this.likeUsers = this.recompute('likeUsers')
          })
        } else {
          // 添加已点赞样式
          this.likeClass = 'active animated rubberBand'
          // 分发 like 事件，传入 isAdd 参数点赞，更新实例的 likeUers 为返回值
          // like 点赞事件 返回 likeUsers
          this.$store.dispatch('like', { articleId, isAdd: true }).then(likeUsers => {
            //使用带用户信息的点赞用户
            this.likeUsers = this.recompute('likeUsers')
          })
        }
      }
    },
    //提交评论
    comment() {
      // 编辑器的内容不为空时
      if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
        // 分发 comment 事件以提交评论
        this.$store
          .dispatch('comment', {
            comment: { content: this.commentMarkdown },
            articleId: this.articleId,
            // 传入 commentId
            commentId: this.commentId,
          })
          .then(comments => {
            // TODO:在事件分发的then里获取事件的返回值 需要深入理解
            // 在浏览器的控制台打印返回的评论列表
            console.log('分发`comment`事件回调,打印文章评论', comments)
            //在回调里渲染评论
            this.renderComments(comments)
          })
        if (this.commentId) {
          //有 commentId ,取消编辑评论
          this.cancelEditComment()
        } else {
          // 清空编辑器
          this.simplemde.value('')
          // 使回复按钮获得焦点
          document.querySelector('#reply-btn').focus()
          // 将最后的评论滚动到页面顶部
          // TODO:这个函数是怎么用的
          this.$nextTick(() => {
            const lastComment = document.querySelector('#reply-list li:last-child')
            if (lastComment) {
              lastComment.scrollIntoView(true)
            }
          })
        }
      }
    },
    //编辑评论
    editComment(commentId, commentIndex) {
      //编辑器
      const simplemde = this.simplemde
      const codemirror = simplemde.codemirror
      // markdown 格式的索所有评论
      const comments = this.commentsMarkdown
      let comment = comments.find(ele => parseInt(commentId) === parseInt(ele.commentId))
      if (comment) {
        // 设置编辑器的内容
        simplemde.value(comment.content)
        // 使得编辑器获得焦点
        codemirror.focus()
        //将光标移动大内容的末尾
        codemirror.setCursor(codemirror.lineCount(), 0)
        // 评论索引 +1 用来指定页面滚动的位置 TODO: 为何加一
        this.commentIndex = commentIndex + 1
        this.commentId = commentId
      }
    },
    //取消评论：
    cancelEditComment() {
      // 清楚 commentId
      this.commentId = undefined
      // 清空编辑器
      this.simplemde.value('')
      // TODO:下次 DOM 更新后，将评论滚回视图顶部
      this.$nextTick(() => {
        if (this.commentIndex === undefined) return 0
        const currentComment = document.querySelector(`#replay-list li:nth-child(${this.commentIndex})`)
        if (currentComment) {
          currentComment.scrollIntoView(true)
          currentComment.querySelector('.operate a').focus()
        }
      })
    },
    //删除评论
    deleteComment(commentId) {
      this.$swal({
        text: '你确定要删除此评论吗？',
        confirmButtonText: '删除',
      }).then(res => {
        if (res.value) {
          //此时不用传入 comment，根据 commentId 删除评论
          console.log('删除评论')
          this.$store
            .dispatch('comment', {
              commentId,
              articleId: this.articleId,
            })
            .then(this.renderComments)
          this.cancelEditComment()
        }
      })
    },
    // 渲染评论
    renderComments(comments) {
      if (Array.isArray(comments)) {
        // 使用带用户信息的评论
        comments = this.recompute('comments')
        // TODO:深拷贝 comments 以不影响其原值(深拷贝实现的几种方法)
        const newComments = comments.map(comment => ({ ...comment }))
        const user = this.user || {}

        for (let comment of newComments) {
          // comment里已有这两个值了
          //   comment.uname = user.name;
          //   comment.uavatar = user.avatar;
          // 将评论内容从 Markdown 转成 HTML
          comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name))
        }

        // 更新实例的 comments
        this.comments = newComments
        // 将 Markdown 格式的评论添加到当前实例
        this.commentsMarkdown = comments
      }
    },
    //返回带用户信息的文化在那个的某项属性
    recompute(key) {
      const articleId = this.$route.params.articleId
      //已包含用户信息了
      const article = this.$store.getters.getArticleById(articleId)
      let arr = undefined
      if (article) {
        //当键为变量时，用方括号
        arr = article[key]
      }
      return arr || []
    },
  },
}
</script>

<style scoped>
.fade-center-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
<!--
Ctrl+Shift+> 调出大纲
深拷贝 是为了不影响已保存的文章
等价于
const newComments = comments.map(comment=>Object.assign({},comment))

以上 只是拷贝对象的一层数据：
如果对象能被JSON解析，可这样可拷贝：
JSON.parse(JSON.stringify(comments))

-->