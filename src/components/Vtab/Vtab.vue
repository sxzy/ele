<template>
  <div class="tab">
    <div class="tab_list"><router-link to="/home/goods" v-bind:class="{'active':routername=='goods'}" class="tab1">商品</router-link></div>
    <div class="tab_list"><router-link to="/home/seller" v-bind:class="{'active':routername=='seller'}" class="tab1">商家</router-link></div>
    <div class="tab_list"><router-link to="/home/greeting" class="tab1" v-bind:class="{'active':routername=='greeting'}">评价</router-link></div>
  </div>
</template>
<style>
  .tab {
    display: flex;
    width:100%;
    height:40px;
    line-height: 40px;
    border-bottom:1px solid rgb(7,17,27);
  }
  .tab_list {
    flex: 1;
    text-align: center;
  }
  .tab .tab_list .active {
    color: rgb(240,20,20);
  }
  .tab_list .tab1 {
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    height:14px;
    color: rgb(77,95,93);
    text-align: center;
  }
</style>
<script>
  export default {
    data () {
      return {
        routername: ''
      }
    },
    watch: {
      '$route': 'getrouter'
    },
    methods: {
      getrouter: function (route) {
        this.routername = route.name
        console.log(route)
      }
    }
  }
</script>
