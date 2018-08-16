// 引入路由作页面跳转用
import router from '../router'

const post = ({
  commit,
  state
}, {
  article, //包含文章标题和内容
  articleId //文章 id
}) => {
  // 从仓库读取文章
  let articles = state.articles
  // 没有文章，建一个空数组
  if (!Array.isArray(articles)) articles = []
  //有文章
  if (article) {
    //   单用户
    const uid = 1
    const {
      title,
      content
    } = article
    const date = new Date()
    // 如果没传 articleId，表示新建文章
    if (articleId === undefined) {
      // 最后一篇文章
      const lastArticle = articles[articles.length - 1]

      if (lastArticle) {
        // 在最后一篇文章的 id 上 加一
        articleId = parseInt(lastArticle.articleId) + 1
      } else {
        articleId = articles.length + 1
      }

      //   将当前文章加到所有文章
      articles.push({
        uid,
        articleId,
        title,
        content,
        date
      })
    }
    // 更新文章
    commit('UPDATE_ARTICLES', articles)
    // 跳转到首页 
    //showMsg 用来指示目标页面显示一个提示
    router.push({
      name: 'Home',
      params: {
        articleId,
        showMsg: true
      }
    })
  }
}

export default post
