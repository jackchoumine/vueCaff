import Mock from "mockjs";
import store from "../store";

Mock.mock('/users/active', 'get', () => {
    let articles = store.getters.computedArticles
    let comments = []
    let userObj = {}
    //活跃用户
    let activeUsers = []
    articles.map((ele) => {
        const articleComments = Array.isArray(ele.comments) ? ele.comments : []
        //并并评论
        comments = [...comments, ...articleComments]
    })
    //统计用户发布评论的数量，并返回包含头像和数量的对象
    // TODO:reduce 函数的用法
    userObj = comments.reduce((accumulator, currentValue) => {
        accumulator[currentValue.uname] = accumulator[currentValue.uname] || {}
        accumulator[currentValue.uname].avatar = currentValue.uavatar
        accumulator[currentValue.uname].num = ++accumulator[currentValue.uname].num || 1
        return accumulator
    }, {})
    //将统计后的数据放入一个数组
    for (const [key, value] of Object.entries(userObj)) {
        activeUsers.push({
            name: key,
            avatar: value.avatar,
            num: value.num
        })
    }
    //将发布评论最多的用户排在前面
    activeUsers.sort((a, b) => a.num - b.num)
    // 取前 8 个发布评论 最多的用户
    activeUsers.slice(0, 8)
    return activeUsers
})
// 这里没有导出 用  import './mock' 引入和导出，然后引入有何区别
/*
TODO: Mock.mock(rurl,rtype,function(options))
当拦截到匹配 rurl 和 rtype 的ajax 时，执行 function 函数
并不结果作为响应返回
可通过 options.body 来访问相关参数
*/