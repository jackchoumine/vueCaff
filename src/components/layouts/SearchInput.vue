<!--
 * @Description: 搜索框
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:23:52 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="navbar-form navbar-left hidden-sm">
    <div class="form-group">
      <input
        type="text"
        v-model.trim="value"
        class="form-control search-input mac-style"
        placeholder="搜索"
        @keyup.enter="serach"
        @input="updateSearchValue"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchInput',
  data() {
    return {
      value: '',
    }
  },
  methods: {
    serach() {
      if (this.value !== '') {
        // 跳转到搜索结果页，附带查询参数 q 作为搜索值
        this.$router.push({ name: 'Search', query: { q: this.value } })
      }
    },
    // 更新 searchValue
    updateSearchValue() {
      this.$store.commit('UPDATE_SEARCH_VALUE', this.value)
    },
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.searchValue = newValue
      },
    },
  },
}
</script>
<style scoped>
.search-input {
  background-image: url(https://laravel-china.org/assets/images/icon-search.png);
}
</style>