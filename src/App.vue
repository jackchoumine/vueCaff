<template>
  <div id="wrap">
    <the-header></the-header>
    <div id="main-container" class="container main-container">
      <!-- 入口组件中的连接页面在此渲染 -->
      <router-view/>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import TheHeader from './components/layouts/TheHeader'
import TheFooter from './components/layouts/TheFooter'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TheHeader,
    TheFooter
  }
}
</script>

<style lang="scss">
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;
@import './assets/styles/main';
@import './assets/styles/extra';

$icon-font-path: '~bootstrap-sass/assets/fonts/bootstrap/';
@import '~bootstrap-sass/assets/stylesheets/_bootstrap';
/* $fa-font-path 是 font-awesome 的一个变量，用于指定字体路径，手动指定到 '~font-awesome/fonts/'*/
/*  在 import 字体前，需要确定 $fa-font-path 的指向 */
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
// markdown 编辑器的样式
@import 'simplemde/dist/simplemde.min.css';
//markdown 代码高亮
@import 'highlight.js/styles/paraiso-dark.css';
/* div .editor-preview-side pre {
  background: rgb(241, 240, 240);
}
div .editor-preview-side pre code[class*='lang-'] {
  color: rgb(206, 202, 202);
} */

html>body{
  background-color:#f0f3f5;
}
body > .container {
  margin-top: 15px;
}

div .editor-preview-side pre { background: #eee;}
div .editor-preview-side pre code[class*="lang-"] { color: rgb(247, 247, 247);}
</style>
