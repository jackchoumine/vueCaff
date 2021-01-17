<!--
 * @Description: 用户信息
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:03:41 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2>
          <i class="fa fa-cog"></i>
          编辑个人资料
        </h2>
        <hr />
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-6">
              <input
                v-model.trim="username"
                v-validator:input.required="{
                  title: '用户名',
                  regex: /^[a-zA-Z]+\w*\s?\w*$/,
                  error: '用户名要求以字母开头的单词字符',
                }"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">未选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">兴趣</label>
            <div class="col-sm-6">
              <label class="checkbox-inline">
                <input v-model="hobbies" value="泡网" type="checkbox" />
                泡网
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="运动" type="checkbox" />
                运动
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="健身" type="checkbox" />
                健身
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="旅游" type="checkbox" />
                旅游
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="游戏" type="checkbox" />
                游戏
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">个人简介</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  /* 
v-model 会忽略所有表单元素的 
value、checked 和 selected 的初始值，
而使用 Vue 实例的数据，所以我们需要在 data 里声明对应的初始值：
*/
  data() {
    return {
      username: '', // 用户名
      sex: '', // 性别
      hobbies: [], // 兴趣
      introduction: '', // 个人简介
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      const { name, sex, hobbies, introduction } = user

      this.username = name
      this.sex = sex || this.sex
      this.hobbies = hobbies || this.hobbies
      this.introduction = introduction
    }
  },
  methods: {
    //   更新个人信息
    updateProfile(e) {
      this.$nextTick(() => {
        // 表单验证通过
        if (e.target.canSubmit) {
          // 分发 updateUser 事件 更新个人信息
          this.$store.dispatch('updateUser', {
            name: this.username,
            sex: this.sex,
            hobbies: this.hobbies,
            introduction: this.introduction,
          })
          //   用实例的 $message 的 showMsg 方法
          this.$message.show('修改成功')
          //   setTimeout(this.$message.hide(),1500)
        }
      })
    },
  },
}
</script>

<style scoped>
</style>