<!--注册页面-->
<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <!-- 消息组件 -->
            <Message :show.sync="msgShow" :type="msgType" :msg="msg" />

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">请注册</h3>
                </div>

                <div class="panel-body">
                    <div class="form-group">
                        <label class="control-label">用户名</label>
                        <input type="text" class="form-control" placeholder="请填写用户名" v-model.trim="username" v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码</label>
                        <input type="password" class="form-control" placeholder="请填写密码" v-model.trim="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" />
                    </div>
                    <div class="form-group">
                        <label class="control-label">确认密码</label>
                        <input type="password" class="form-control" placeholder="请填写确认密码" v-model.trim="cpassword" v-validator.required="{ target: '#password' }" />
                        <!-- {{password}} -->
                    </div>
                    <div class="form-group">
                        <label class="control-label">图片验证码</label>
                        <input type="text" class="form-control" placeholder="请填写验证码" v-model.trim="captcha" v-validator.required="{ title: '图片验证码' }" />
                    </div>
                    <!-- @click="getCaptcha" 用户手动更换验证码 -->
                    <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
                        <div class="captcha vcenter" v-html="captchaTpl"></div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
                        <i class="fa fa-btn fa-sign-in"></i> 注册
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 引入验证号生成函数
import createCaptcha from '@/utils/createCaptcha'
export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      captcha: '', // 验证码
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  //   生命周期函数，vue 实例创建完立即调用，此时可访问实例的属性和方法了
  created() {
    //   vue 实例创建完，就主动调用验证号生成函数，以让用户第一时间看到验证码
    this.getCaptcha()
  },
  methods: {
    //   生成验证号
    getCaptcha() {
      const { tpl, captcha } = createCaptcha()
      //   tpl 是 HTML 代码 验证码 captcha 隐藏在 tpl 里面 弄成图片验证码的效果
      console.log(tpl)
      //   验证码
      console.log(captcha)
      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      /**
       * 实例的 $nextTick 方法用于在下次 DOM 更新循环结束之后执行延迟回调。
       * 在我们的代码里，当我们点击注册按钮后，表单验证指令有为按钮添加一个 canSubmit 的属性，
       * 但 DOM 没有立即更新，所以我们需在 $nextTick 的延迟回调里，获取更新后的元素属性，
       * 此时的 canSubmit 才是正确的值。
       * https://vuejscaff.com/courses/vuejs-essential/74/submission-of-registration-information
       * nextTick 有一个全局方法 Vue.nextTick，在实例上使用 this.$nextTick，不要忘记 $。
       */
      console.log(e)
      this.$nextTick(() => {
        const target =
          e.target.type === 'submit' ? e.target : e.target.parentElement
        console.log(target)
        if (target.canSubmit) {
            console.log('aa')
          this.submit()
        }
      })
    },
    submit() {
      // 检查验证码是否匹配
      if (this.captcha.toUpperCase() !== this.localCaptcha) {
        alert('验证码不正确')
        this.getCaptcha()
      } else {
        const user = {
          name: this.username,
          password: this.password,
          // 根据用户名，从线上返回一张头像
          avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
        }
        //将用户信息存在本地
        const localUser = ls.getItem('user')

        if (localUser) {
          if (localUser.name === user.name) {
            this.showMsg('用户名已存在')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    login(user) {
      ls.setItem('user', user)
      this.showMsg('注册成功', 'success')
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
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