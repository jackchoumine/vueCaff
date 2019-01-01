<template>
    <div class="navbar-form navbar-left hidden-sm">
        <div class="form-group">
            <input type="text" v-model.trim="value" class="form-control search-input mac-style" placeholder="搜索"
                @keyup.enter="serach" @input="updateSearchValue">
        </div>
    </div>
</template>
<script>
    export default {
        name: 'SearchInput',
        data() {
            return {
                value: ''
            }
        },
        methods: {
            serach() {
                const value = this.value
                if (value !== '') {
                    console.log(value)
                    // 跳转到搜索结果页，附带查询参数 q 作为搜索值
                    this.$router.push({ name: 'Search', query: { q: value } })
                }
            },
            // 更新 searchValue
            updateSearchValue() {
                this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
            }
        },
        computed: {
            searchValue: {
                get() {
                    return this.$store.state.searchValue
                },
                set(newValue) {
                    this.searchValue = newValue
                }
            }
        },
    }
</script>
<style scoped>
    .search-input {
        background-image: url(https://vuejscaffcdn.phphub.org/assets/images/icon-search.png)
    }
</style>

<!-- 
监听键盘事件时，需要知道键值：
.enter 回车
.tab 制表符
.esc 终止键
 -->