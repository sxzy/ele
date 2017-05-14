<template>
  <div id="app" class="container">
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
<style>
  /*.container{*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
  /*}*/
</style>
