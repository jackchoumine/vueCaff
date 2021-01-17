<!--
 * @Description: 轮播
 * @Date: 2021-01-16 00:49:21 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-17 21:09:51 +0800
 * @LastEditors: JackChou
-->
<template>
  <div v-if="slides.length" class="carousel slide" @mouseover="stop" @mouseout="play">
    <div class="carousel-inner">
      <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
        <div v-if="show" key="current">
          <slot :currentSlide="currentSlide"></slot>
        </div>
        <div v-else key="next" class="item next">
          <slot :currentSlide="currentSlide"></slot>
        </div>
      </transition>
    </div>
    <div class="carousel-indicators">
      <li
        v-for="(n, index) in slides.length"
        :key="index"
        :class="{ active: n - 1 === currentIndex }"
        @click="play(n - 1)"
      ></li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Slider',
  props: {
    //轮播项
    slides: {
      type: Array,
      default: () => [],
    },
    //是否自动播放
    autoplay: {
      type: Boolean,
      default: true,
    },
    //轮播延迟
    delay: {
      type: Number,
      default: 8000,
    },
  },
  data() {
    return {
      currentIndex: 0, //当前索引
      show: true, //是否显示当前项
    }
  },
  methods: {
    play() {
      if (this.autoplay) {
        this.interval = setInterval(() => {
          this.playTo(this.nextIndex)
        }, this.delay)
      }
    },
    stop() {
      if (this.interval) clearInterval(this.interval)
    },
    playTo(n) {
      if (this.currentIndex === n) return
      this.show = false
      setTimeout(() => {
        this.currentIndex = n
        this.show = true
      }, 0)
    },
  },
  computed: {
    //当前项
    currentSlide() {
      return this.slides[this.currentIndex]
    },
    //下一项索引
    nextIndex() {
      if (this.currentIndex === this.slides.length - 1) {
        //当前项是最后一项
        return 0
      } else {
        return this.currentIndex + 1
      }
    },
  },
  mounted() {
    //TODO:注意这里的定时器的调用方式 为何不在created 函数里调用呢？
    if (this.autoplay) this.play()
  },
}
</script>
<style lang="css" scoped>
.carousel {
  margin-top: 4px;
  padding-bottom: 30px;
}

.carousel-inner > div {
  min-height: 177px;
}

@media (min-width: 1200px) {
  .carousel-inner > div {
    min-height: 228px;
  }
}

.carousel-indicators {
  bottom: 0;
  border-radius: 12px;
  background-color: hsla(0, 0%, 100%, 0.3);
  margin-bottom: 0px;
  padding: 4px 8px;
}

.carousel-indicators li {
  margin: 0 3px;
  border: 1px solid#ff8580;
  background-color: #f4665f;
}
</style>

<!-- 
    TODO:
    ①知识： slot 的使用
    作用域插槽
    ②给 标签 加 key ,key可区分相同的标签，可正确渲染
    ③ props 中的数组和对象的默认值，应该由一个工厂函数返回。TODO:工厂函数？
 -->