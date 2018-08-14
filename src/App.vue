<template>
  <div id="wrap">
    <the-header></the-header>
    <div id="main-container" class="container main-container">
      <router-view/>
    </div>
    <the-footer></the-footer>
    <!--  <div class="jumbotron">
    </div> -->

    <!--  <div class="container">
      <div class="jumbotron">
        <div class="container">
          <h1>Welcome from Bootstrap</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p>
            <a class="btn btn-primary btn-lg" href="http://www.bootcss.com/" role="button" target="_blank">Learn more
              <span class="glyphicon glyphicon-hand-right" aria-hidden="true"></span>
            </a>
          </p>
        </div>
      </div>
      <div class="jumbotron">
        <div class="container">
          <h1>font awesome</h1>
          <p>i标签 和 class 引入字体图标</p>
          <p>
            <i class="fa fa-camera"> </i>
            <i class="fa fa-camera fa-2x"> </i>
            <i class="fa fa-camera fa-3x"> </i>
            <i class="fa fa-camera fa-4x"> </i>
            <i class="fa fa-camera fa-5x"> </i>
            <i class="fa fa-camera fa-spin"> </i>
            <i class="fa fa-spinner fa-spin"></i>
          </p>
        </div>
      </div>
    </div> 
     -->
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

body > .container {
  margin-top: 15px;
}
</style>
