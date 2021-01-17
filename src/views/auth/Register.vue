<!--
 * @Description: 注册
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:04:15 +0800
 * @LastEditors: JackChou
-->
<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
      <!-- 消息组件 -->
      <Message :show.sync="msgShow" :type="msgType" :msg="msg" />
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>
        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input
              v-model.trim="username"
              v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }"
              type="text"
              class="form-control"
              placeholder="请填写用户名"
            />
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input
              id="password"
              v-model.trim="password"
              v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }"
              type="text"
              class="form-control"
              placeholder="请填写密码"
            />
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input
              v-model.trim="cpassword"
              v-validator.required="{ target: '#password' }"
              type="text"
              class="form-control"
              placeholder="请填写确认密码"
            />
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input
              v-model.trim="captcha"
              v-validator.required="{ title: '图片验证码' }"
              type="text"
              class="form-control"
              placeholder="请填写验证码"
            />
          </div>
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i>
            注册
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '', // 验证码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false, // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const { tpl, captcha } = createCaptcha(6)

      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        this.showMsg('验证码不正确')
        this.getCaptcha()
      } else {
        const user = {
          name: this.username,
          password: this.password,
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`,
        }
        // const localUser = ls.getItem('user')
        const localUser = this.$store.state.user //从仓库中获取信息
        console.log(JSON.stringify(localUser))
        if (localUser) {
          if (localUser.name === user.name) {
            console.log(user.name)
            this.showMsg('用户名已存在')
            this.login(user)
          } else {
            console.log('登录')
            this.login(user)
          }
        } else {
          console.log('登录2')
          this.login(user)
        }
      }
    },
    login(user) {
      // ls.setItem('user', user)
      this.$store.dispatch('login', user) //分发 login 事件，以保存用户信息和登录
      this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false
      this.$nextTick(() => {
        this.msgShow = true
      })
    },
  },
}
</script>

<style scoped>
.thumbnail {
  width: 170px;
  margin-top: 10px;
  cursor: pointer;
}
.thumbnail .captcha {
  height: 46px;
  background: #e1e6e8;
}
.captcha {
  font-size: 24px;
  font-weight: bold;
  user-select: none;
}
</style>