// 文章状态管理，将较多的逻辑代码分在文件里，便于管理
// 引入路由作页面跳转用
import router from '../router'

export const post = ({
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
    if (undefined === articleId) {
      console.log('新增一篇文章！')
      // 最后一篇文章
      const lastArticle = articles[articles.length - 1]
      // 数组里有文章
      if (lastArticle) {
        // 在最后一篇文章的 id 上加 1
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
      commit('UPDATE_ARTICLES', articles)
      router.push({
        name: 'Content',
        params: {
          articleId,
          showMsg: true
        }
      })
    } else {
      // 编辑文章
      for (let article of articles) {
        if (parseInt(article.articleId) === pareseInt(articleId)) {
          article.title = title
          article.content = content
          break
        }
      }
 /*      commit('UPDATE_ARTICLES', articles)
      router.push({
        name: 'Content',
        params: {
          articleId,
          showMsg: true
        }
      }) */
    }
  } else {
    for (let article of articles) {
      if (parseInt(article.articleId) === parseInt(articleId)) {
        articles.splice(articles.indexOf(article), 1)
        break
      }
    }
    commit('UPDATE_ARTICLES', articles)
    router.push({
      name: 'Home',
      params: {
        showMsg: true
      }
    })
  }
}
// export default post 和上面有何不同？？
