import Mock from 'mockjs'
import store from '../store'

Mock.mock('/users/active', 'get', () => {
  // 统计每个用户发表的评论数量
  const articles = store.getters.computedArticles
  const comments = articles.map(ele => (Array.isArray(ele.comments) ? ele.comments : [])).flat(1) //打平数组
  // userObj 结构 {name:{avatar:'',num:number}}
  const userObj = {}
  comments.forEach(item => {
    if (userObj[item.uname]) {
      userObj[item.uname].num = ++userObj[item.uname].num
    } else {
      userObj[item.uname] = {}
      userObj[item.uname].uavatar = item.uavatar
      userObj[item.uname].num = 1
    }
  })
  //将统计后的数据放入一个数组
  const activeUsers = []
  for (const [key, value] of Object.entries(userObj)) {
    activeUsers.push({
      name: key,
      avatar: value.avatar,
      num: value.num,
    })
  }
  //将发布评论最多的用户排在前面
  activeUsers.sort((a, b) => b.num - a.num)
  return activeUsers.slice(0, 8)
})
//拦截最热文章
Mock.mock('/articles/hot', 'post', options => {
  // 将评论最少的文章排在前面
  const filteredArticles = store.getters.getArticlesByFilter('noreply')
  // 将评论最多的文章排在前面
  const articles = filteredArticles.reverse()
  // 取 7 天内评论最多的文章
  const hotArticles = articles.filter(article => new Date() - new Date(article.date) < 3600 * 24 * 7 * 1000)
  // 文章条数
  const num = 10 //默认 10 篇

  // 请求有传 num 时使用它
  if (options.body) {
    try {
      num = JSON.parse(options.body).num
    } catch (e) {
      console.error('解析 post body 出错', e)
    }
  }

  // 取前 num 条评论最多的文章，默认 10 条
  hotArticles = hotArticles.slice(0, num)
  console.log('拦截到最热文章请求', hotArticles)
  return hotArticles
})
// 这里没有导出 用  import './mock' 引入和导出，然后引入有何区别
/*
TODO: Mock.mock(url,type,function(options))
当拦截到匹配 url 和 type 的 ajax 时，执行 function 函数
并不结果作为响应返回
可通过 options.body 来访问相关参数
*/
