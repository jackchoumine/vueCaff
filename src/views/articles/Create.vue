<!-- 创作页面 -->
<template>
    <div class="blog-container">
        <div class="blog-pages">
            <div class="col-md-12 panel">
                <div class="panel-body">
                    <h2 class="text-center">创作文章</h2>
                    <hr>
                    <div data-validator-form>
                        <div class="form-group">
                            <input v-model.trim="title" @input="saveTitle" v-validator.required="{ title: '标题' }" type="text" class="form-control" placeholder="请填写标题">
                        </div>
                        <div class="form-group">
                            <!--  <textarea v-validator.required="{ title: '内容' }" class="form-control" placeholder="请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。"></textarea>-->
                            <textarea id="editor"></textarea>
                        </div>
                        <br>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit" @click="post">发 布</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SimpleMDE from 'simplemde'
// 引入 highlight.js 的默认值
import hljs from 'highlight.js'

// 添加全局变量
// 可以使 SimpleMDE
//利用 highlight.js 对代码进行高亮，引入样式后，我们就能看到效果了。
window.hljs = hljs

import ls from '@/utils/localStorage'
export default {
  name: 'Create',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  mounted() {
    const simplemde = new SimpleMDE({
      // 要绑定的 textarea 元素
      element: document.querySelector('#editor'),
      placeholder:
        '请使用 Markdown 格式书写 ;-)，代码片段黏贴时请注意使用高亮语法。代码高亮有点异常',
      spellChecker: false,
      //   不自动下载 FontAwesome
      autoDownloadFontAwesome: false,
      //   自动保存，uniqueId 是是区别于其他站点的标识
      autosave: {
        enabled: true,
        uniqueId: 'content'
      },
      //   代码高亮
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })
    // 监听编辑器的 change 事件
    simplemde.codemirror.on('change', () => {
      // 将改变后的值赋值给文章内容
      this.content = simplemde.value()
    })
    // 将 simlemde 添加到当前实例，以在其他地方调用
    this.simplemde = simplemde
    // 初始化标题和内容
    this.fillContent()
  },
  methods: {
    saveTitle() {
      ls.setItem('smde_title', this.title)
    },
    fillContent() {
      const simplemde = this.simplemde
      const title = ls.getItem('smde_title')
      // 如果 localStorage 有标题数据，使用它作为文章标题
      if (title !== null) {
        this.title = title
      }
      //   编辑器的内容作为文章内容
      this.content = simplemde.value()
    },
    // 发布
    post() {
      const title = this.title
      const content = this.content

      if (title !== '' && content.trim() !== '') {
        const article = {
          title,
          content
        }

        console.log(article)
        this.clearData()
      }
    },
    clearData() {
      this.title = ''
      ls.removeItem('smde_title')
      this.simplemde.value('')
      //清除编辑器自动保存的内容
      this.simplemde.clearAutosavedValue()
    }
  }
}
</script>

<style scoped>
.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}
textarea {
  height: 200px;
}
</style>