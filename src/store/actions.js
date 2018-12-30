import router from '../router'
/**
 * 
 * @param {Object} param0 - vuex状态信息
 * @param {Object} param0.commit - vuex 提交事件
 * @param {Object} param0.state - vuex 仓库
 * @param {Object} param1 - 文章信息
 * @param {Object} param1.article - 文章
 * @param {String} param1.articleId - 文章ID
 * @returns {undefined} 
 * @example
 * post({commit,state},{article:{title:'文章标题'，content:'这是文章内容'}，articleId:'1441414'})
 * @author jackzhoumine-2018年12月30日
 */
const post = ({
    commit,
    state
}, {
    article,
    articleId
}) => {
    let articles = state.articles

    if (!Array.isArray(articles)) articles = []

    if (article) {
        const uid = 1
        const {
            title,
            content
        } = article
        const date = new Date()

        if (articleId === undefined) {
            const lastArticle = articles[articles.length - 1]

            if (lastArticle) {
                articleId = parseInt(lastArticle.articleId) + 1
            } else {
                articleId = articles.length + 1
            }

            articles.push({
                uid,
                articleId,
                title,
                content,
                date
            })
        } else {
            for (let article of articles) {
                if (parseInt(article.articleId) === parseInt(articleId)) {
                    article.title = title
                    article.content = content
                    break
                }
            }
        }

        commit('UPDATE_ARTICLES', articles)
        router.push({
            name: 'Content',
            params: {
                articleId,
                showMsg: true
            }
        })
    } else {
        // 删除文章
        for (let article of articles) {
            if (parseInt(article.articleId) === parseInt(articleId)) {
                articles.splice(articles.indexOf(article), 1)
                break
            }
        }
        // 更新文章列表
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
// 参数 articleId 是文章 ID；isAdd 为 true 时点赞，为 false 时取消赞
/**
 * 文章点赞
 * @param {Object} param0 - vuex 仓库信息
 * @param {Object} param0.commit - vuex commit
 * @param {Object} param0.state - vuex 仓库
 * @param {Object} param1 - 点赞对象
 * @param {Object} param1.articleId - 点赞的文章ID
 * @param {Object} param1.isAdd - 点赞/取消点赞
 * @returns {Array}-文章的点赞用户列表
 * @example 
 * // returns ['user1213','user13121']
 * like({commit,state},{articleId:'qqrqr1311414',isAdd:true})
 * @author jackzhoumine 2018年12月30日
 */
const like = ({
    commit,
    state
}, {
    articleId,
    isAdd
}) => {
    // 仓库的文章
    let articles = state.articles
    // 点赞用户列表
    let likeUsers = []
    // 用户 ID，默认为 1
    const uid = 1

    if (!Array.isArray(articles)) articles = []

    for (let article of articles) {
        // 找到对应文章时
        if (parseInt(article.articleId) === parseInt(articleId)) {
            // 更新点赞用户列表
            likeUsers = Array.isArray(article.likeUsers) ? article.likeUsers : likeUsers

            if (isAdd) {
                // 是否已赞 刚才点击的用户的 id 存在点赞列表中，说明点赞过了，不添加点赞；否则太添加点赞用户
                const isAdded = likeUsers.some(likeUser => parseInt(likeUser.uid) === uid)
                // 没有点赞过
                if (!isAdded) {
                    // 在点赞用户列表中加入当前用户
                    likeUsers.push({
                        uid
                    })
                }
            } else {
                for (let likeUser of likeUsers) {
                    // 找到对应点赞用户时
                    if (parseInt(likeUser.uid) === uid) {
                        // 删除点赞用户
                        likeUsers.splice(likeUsers.indexOf(likeUser), 1)
                        break
                    }
                }
            }

            // 更新文章的点赞用户列表
            article.likeUsers = likeUsers
            break
        }
    }

    // 提交 UPDATE_ARTICLES 以更新所有文章
    commit('UPDATE_ARTICLES', articles)
    // 返回点赞用户列表
    return likeUsers
}

/**
 * 增加评论
 * @param {Object} param0 - vuex 仓库
 * @param {Object} param0.commit - vuex的commit 
 * @param {Object} param0.state - vuex的state
 * @param {Object} param1 - 提交的评论
 * @param {number} param1.articleId - 评论的文章ID
 * @param {object} param1.comment - 评论
 * @param {number} param1.commentId - 评论ID
 * @returns {comment[]} comments - 文章的评论列表
 * @example
 * // returns [{uid:'user123',comment:'12314141',content:'这是评论内容',date:284242}]
 * comment({commit,state},{1424342,'这会评论内容',14141421})
 * @author jackzhoumine-2018年12月30日
 */
const comment = ({
    commit,
    state
}, {
    articleId,
    comment,
    commentId
}) => {
    // 仓库的文章
    let articles = state.articles
    // 评论列表
    let comments = []

    if (!Array.isArray(articles)) articles = []

    for (let article of articles) {
        // 找到对应文章时
        if (parseInt(article.articleId) === parseInt(articleId) && comment) {
            // 获取文章评论
            comments = Array.isArray(article.comments) ? article.comments : comments

            // 获取用户传入的评论内容，设置用户 ID 的默认值为 1
            const {
                uid = 1, content
            } = comment
            const date = new Date()

            if (commentId === undefined) {
                const lastComment = comments[comments.length - 1]

                // 新建 commentId
                if (lastComment) {
                    commentId = parseInt(lastComment.commentId) + 1
                } else {
                    commentId = comments.length + 1
                }

                // 在评论列表中加入当前评论
                comments.push({
                    uid,
                    commentId,
                    content,
                    date
                })
            }

            // 更新文章的评论列表
            article.comments = comments
            break
        }
    }

    // 提交 UPDATE_ARTICLES 以更新所有文章
    commit('UPDATE_ARTICLES', articles)
    // 返回评论列表 在分发事件的回调函数里获取该返回值
    return comments
}
//导出各个事件
export {
    post,
    like,
    comment
}