<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
        <!-- 帖子列表 -->
        <div class="col-md-9 topics-index main-col">
            <!-- 文章过滤菜单 -->
            <div class="panel pane-default">
                <div class="panel-heading">
                    <ul class="list-inline topic-filter">
                        <!-- <li> <a href="/topics?filter=defalut" class="active">活跃</a></li>
                        <li> <a href="/topics?filter=excellent">精华</a></li>
                        <li> <a href="/topics?filter=vote">投票</a></li>
                        <li> <a href="/topics?filter=recent">最近</a></li>
                        <li> <a href="/topics?filter=noreply">零回复</a></li> -->
                        <li v-for="item in filters">
                            <router-link v-title="item.title" :class="{ active: filter === item.filter }" :to="`/topics?filter=${item.filter}`">{{
                                item.name }}</router-link>
                        </li>
                    </ul>
                    <!-- 防止父级元素塌陷 -->
                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- 显示列表 -->
            <div class="panel-body remove-padding-horizontal">
                <!-- 文章过滤菜单 -->
                <ul class="list-group row topic-list">
                    <li class="list-group-item" v-for="(article, index) in articles" :key="index">
                        <router-link :to="`/acticles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                            <div class="count_set">
                                <span class="count_votes" title="投票数">{{article.likeUsers?article.likeUsers.length:0}}</span>
                                <span class="count_seperator">/</span>
                                <span class="count_of_replies" title="回复数">{{article.comments?article.comments.length:0}}</span>
                                <span class="count_seperator">|</span>
                                <!-- TODO:moment怎么用？？ -->
                                <abbr class="timeago">{{article.date|moment('from')}}</abbr>
                            </div>
                        </router-link>
                        <!-- 显示用户头像 tag 属性，将该链接渲染成 div-->
                        <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left"><img :src="article.uavatar"
                                alt="头像" class="media-objet img-thumbnail avatar avatar-middle" /></router-link>
                        <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                            <div class="media-heading title">{{article.title}}</div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    // 当一个组件需要获取多个状态的时候，引入 mapState 可以极大地简化写法。
    import { mapState } from "vuex";
    export default {
        name: 'Home',
        data() {
            return {
                msg: '', // 消息
                msgType: '', // 消息类型
                msgShow: false, // 是否显示消息，默认不显示
                articles: [],
                filter: 'default',
                /*
                列表数据添加到数据对象，而不是直接写在模板里，这样做不仅可以简化模板，还可以方便更改逻辑。
                */
                filters: [
                    { filter: 'default', name: '活跃', title: '最后回复排序' },
                    { filter: 'excellent', name: '精华', title: '只看加精的话题' },
                    { filter: 'vote', name: '投票', title: '点赞数排序' },
                    { filter: 'recent', name: '最近', title: '发布时间排序' },
                    { filter: 'noreply', name: '零回复', title: '无人问津的话题' },
                ]
            }
        },
        /**
         * 组件内路由守卫
         * 在确认渲染该组件的对应路由前调用，不能访问 this
         * 可传递一个回调 给 next ,在回调中用 vm 访问路由实例
         */

        /*   
        to 目标路由
        from 离开的路由
        name：路由的名称，如 'Register'；
      path：路由的路径，如 '/auth/register'；
      params：路由参数对象，如 { id: "1" }；
      query：URL 查询参数对象，如 { page: "1" }；
      meta：元信息对象，如 { auth: true }；
        next  
        */

        beforeRouteEnter(to, from, next) {
            //  路由名称
            const fromName = from.name
            //获取 logout 参数
            const logout = to.params.logout
            // 确认导航
            next(vm => {
                // 通过 vm 参数访问组件实例，已登录时，评估路由名称
                if (vm.$store.state.auth) {
                    switch (fromName) {
                        // 从注册页面跳转而来
                        case 'Register':
                            vm.showMsg('注册成功')
                            break
                        case 'Login':
                            // 显示登录成功
                            vm.showMsg('登录成功')
                            break
                    }
                } else if (logout) {
                    vm.showMsg('操作成功')
                }
                // 确认渲染该组件的对应路由时，设置相关数据
                vm.setDataByFilter(to.query.filter)
            })
        },
        // TODO:计算属性只有一个状态，一个计算属性就覆盖了整个计算属性
        //computed: mapState({user:state=>state.user}),
        // TODO:添加额外的计算属性
        /* computed: {
            otherComputed(){},
            ...mapState({user:'user'}),
            ...mapState(['auth']),
            article(){
                return this.$store.state.article
            }
        }, */
        // 计算属性只有状态
        // computed: mapState(['auth','user','article']),
        computed: {
            //otherComputed
            //  推荐这种写法 添加其他计算属性方便
            ...mapState(['auth', 'user']),
        },
        watch: {
            auth(value) {
                if (!value) {
                    this.showMsg('操作成功')
                }
            },
            /*
            当路由从 /topics?filter=default 跳到类似 /topics?filter=vote 的地址时，Home.vue 会被复用，beforeRouteEnter 不会被再次调用，此时，我们需要监听 '$route' 以根据路由参数的变化，重新获取对应数据。
            */
            '$route'(to) {
                this.setDataByFilter(to.query.filter)
            }
        },
        methods: {
            showMsg(msg, type = 'success') {
                this.msg = msg
                this.msgType = type
                this.msgShow = true
            },
            setDataByFilter(filter = 'default') {
                this.filter = filter
                this.articles = this.$store.getters.getArticlesByFilter(filter)
            }
        }
    }
</script>

<style scoped>
</style>