<template>
    <div class="col-md-3 side-bar">
        <div class="panel panel-default corner-raius sidebar-resources">
            <div class="panel-headeing text-center">
                <h3 class="panel-little">实战课程</h3>
            </div>
            <div class="panel-body">
                <Slider :slides="slides">
                    <template slot-scope="{currentSlide}">
                        <a :href="currentSlide.link" target="_blank">
                            <img :src="currentSlide.img" :alt="currentSlide.title" :title="currentSlide.title">
                        </a>
                    </template>
                </Slider>
            </div>
        </div>
        <!-- 活跃用户 -->
        <div class="panel panel-default corner-radius panel-active-users">
            <div class="panel-heading text-center">
                <h3 class="panel-title">
                    活跃用户
                </h3>
            </div>
            <div class="panel-body">
                <div class="users-label">
                    <router-link v-for="(user,index) in activeUsers" :key="index" :to="`/${user.name}`" class="users-label-item">
                        <img :src="user.avatar" class="avatar-small inline-block">
                        {{user.name}}
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 最热文章 -->
        <div class="panel panel-default corner-radius panel-active-users">
            <div class="panel-heading text-center">
                <h3 class="panel-title">
                    最热文章
                </h3>
            </div>
            <div class="panel-body">
                <ul class="list">
                    <li v-for="(article, index) in hotArticles" :key="index">
                        <router-link :to="`/articles/${article.articleId}/content`">
                            <!-- <span v-if="index===0">?</span> -->
                            <span> {{index+1}}</span>
                            {{article.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                //实战课程
                slides: [
                    {
                        title: '《Laravel 入门教程-从零到部署》',
                        img: 'https://lccdn.phphub.org/uploads/banners/YpxKKNlSPdmwotO3u8An.jpg',
                        link: 'https://laravel-china.org/topics/3383/laravel-the-first-chinese-new-book-laravel-tutorial'
                    },
                    {
                        title: '《Laravel 进阶课程 - 从零构建论坛系统》',
                        img: 'https://lccdn.phphub.org/uploads/banners/iNanVVOXdnYQ6jRfMdWE.png',
                        link: 'https://laravel-china.org/topics/6592'
                    },
                    {
                        title: '《Laravel 教程实战高级 - 构架 API 服务器》',
                        img: 'https://lccdn.phphub.org/uploads/banners/tEd4GxhMp6VMh9e0hrUH.jpg',
                        link: 'https://laravel-china.org/topics/7657'
                    }
                ],
                activeUsers: [],
                hotArticles: []
            }
        },
        //在实例创建完后
        created() {
            this.$http.get('/users/active').then(res => {
                this.activeUsers = res.data
                console.log('活跃用户', res.data);
            }).catch(err => {
                console.error('/users/active 亲情活跃用户遇到错误', err)
            }),
                // 通过 axios 执行 POST 请求来返回七天内最热文章，可以传递 num 来指定返回条数
                this.$http.post('/articles/hot', { num: 10 }).then((response) => {
                    this.hotArticles = response.data
                }).catch(err => {
                    console.error('/articles/hot 获取最热文章出错', err);
                })
        },
    }
</script>
<style lang="css" scoped>
    .carousel-inner img {
        display: block;
        margin: auto;
        line-height: 1;
        width: 70%;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px #ccc;
    }
</style>