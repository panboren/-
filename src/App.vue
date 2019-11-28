<template>
  <div id="app">
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!--正常的访问走下面-->
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body,#app
  {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar{width:4px;}
  /*::-webkit-scrollbar-track{background-color:#EBEEF5;}*/
  ::-webkit-scrollbar-thumb{background-color:rgba(64, 158, 255, 0.3);}
  ::-webkit-scrollbar-thumb:hover {background-color:#409EFF}
  ::-webkit-scrollbar-thumb:active {background-color:rgb(64, 158, 255);}


</style>
