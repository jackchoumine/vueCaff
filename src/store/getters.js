/**
 * 获取添加用户信息后的所有文章
 * @param {Object} state  vuex 仓库状态
 * @returns {Object[]} 文章数组
 * @author jackzhoumine-2018年12月31日
 */
export const computedArticles = (state) => {
    let articles = state.articles
    let newArticles = []

    // 添加用户信息，参数 isCurrentUser 代表是否是当前用户
    const addUserInfo = function (isCurrentUser) {
        const userName = state.user && state.user.name
        const userAvatar = state.user && state.user.avatar
        const avatarUrl = 'https://api.adorable.io/avatars/200/'

        // 是当前用户时，设置用户数据为当前用户的信息
        if (isCurrentUser) {
            this.uname = userName
            this.uavatar = userAvatar
        } else {
            // 不是当前用户时，设置用户数据为对象里用户的信息
            this.uavatar = `${avatarUrl}${this.uname}`
        }
    }

    if (Array.isArray(articles)) {
        // 深拷贝 articles 以不影响其原值
        newArticles = JSON.parse(JSON.stringify(articles))
        newArticles.forEach((article) => {
            const comments = article.comments
            const likeUsers = article.likeUsers

            // 添加用户信息到文章
            if (article.uid === 1) {
                //TODO:这里的使用技巧
                addUserInfo.call(article, true)
            } else {
                addUserInfo.call(article)
            }

            // 添加用户信息到评论
            if (Array.isArray(comments)) {
                comments.forEach((comment) => {
                    if (comment.uid === 1) {
                        addUserInfo.call(comment, true)
                    } else {
                        addUserInfo.call(comment)
                    }
                })
            }

            // 添加用户信息到点赞
            if (Array.isArray(likeUsers)) {
                likeUsers.forEach((likeUser) => {
                    if (likeUser.uid === 1) {
                        addUserInfo.call(likeUser, true)
                    } else {
                        addUserInfo.call(likeUser)
                    }
                })
            }
        })
    }

    return newArticles
}
/**
 * 根据用户信息获取文章
 * @param {Object} state veux 仓库状态
 * @param {Object} getters  vuex getter
 * @param {number} uid 用户ID
 * @param {String} user 用户名
 * @returns {Function} 获取文章的函数
 * @author jackzhoumine-2018年12月31日
 */
export const getArticlesByUid = (state, getters) => (uid, user) => {
    // 使用派生状态 computedArticles 作为所有文章
    let articles = getters.computedArticles

    if (Array.isArray(articles)) {
        if (user) {
            /* for (const article of articles) {
                if (article.uname === user) {
                    // 指定 uid 为文章上的 uid
                    uid = article.uid
                    break
                  }
              } */
            // 有用户名时遍历所有文章
            let article = articles.find(ele => ele.uname === user)
            if (article) {uid = article.uid}
        }

        // 使用指定 uid 过滤所有文章
        articles = articles.filter(article => parseInt(uid) === parseInt(article.uid))
    } else {
        articles = []
    }

    return articles
}