<template>
    <div>
        <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <!-- .self event.target 是当前元素自身时触发处理函数 -->
            <div v-show="show" class="modal" style="display:block" @click.self="close">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button @click="close" class="close">×</button>
                            <h4 class="modal-title">
                                <!-- 插槽 相当于内嵌 HTML标签 -->
                                <!-- VUE组件是不能嵌套的，插槽让我们可以像HTML标签一样可嵌套使用 -->
                                <!-- 嵌套内容来自父级组件-->
                                <!-- 再父级组件中标签的 slot 特性与 slot 的 name 相同，该标签就替换子组件的 slot -->
                                <slot name="title"></slot>
                            </h4>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div v-show="show" class="modal-backdrop fade in" @click="close"></div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 触发事件以关闭弹窗
      this.$emit('update:show', false)
    }
  },
  watch: {
    show(value) {
      // 监听 show 值以切换 body 上 modal-open 类
      const bodyClassList = document.body.classList

      if (value) {
        bodyClassList.add('modal-open')
      } else {
        bodyClassList.remove('modal-open')
      }
    }
  }
}
</script>

<style scoped>
.animated {
  animation-duration: 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>