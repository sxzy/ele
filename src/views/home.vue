<template>
  <div class="home">
    <div class="header1">
      <v-header v-bind:sellers = seller v-bind:loadstatus = loadstatus></v-header>
      <v-tab></v-tab>
    </div>
    <transition name="slide">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    </transition>
      <div class="footer1">
      <v-footer></v-footer>
      </div>
  </div>
</template>
<style>
  /*.bounce-enter-active {*/
    /*animation: bounce-in .5s;*/
  /*}*/
  /*.bounce-leave-active {*/
    /*animation: bounce-out .5s;*/
  /*}*/
  /*@keyframes bounce-in {*/
    /*0% {*/
      /*transform: scale(0);*/
    /*}*/
    /*50% {*/
      /*transform: scale(1.5);*/
    /*}*/
    /*100% {*/
      /*transform: scale(1);*/
    /*}*/
  /*}*/
  /*@keyframes bounce-out {*/
    /*0% {*/
      /*transform: scale(1);*/
    /*}*/
    /*50% {*/
      /*transform: scale(1.5);*/
    /*}*/
    /*100% {*/
      /*transform: scale(0);*/
    /*}*/
  /*}*/
</style>
<script>
  import VFooter from '../components/Vfooter/Vfooter'
  import VHeader from '../components/Vheader/Vheader'
  import VTab from '../components/Vtab/Vtab'
  import axios from 'axios'
  export default {
    components: {
      VFooter,
      VHeader,
      VTab
    },
    data () {
      return {
        seller: {},
        good: {},
        loadstatus: false
      }
    },
    mounted: function () {
      var t = '2'
      var self = this
      axios.get('/api/seller')
        .then(function (response) {
          const seller = response.data.data
          self.seller = seller
          self.loadstatus = true
          console.log(t)
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
</script>
<style>
  .home{
    height:calc(100vh);
  }
  .header1{
    width: 100%;
  }
  .footer1 {
    position: fixed;
    bottom:0;
    width:100%;
    z-index:1000;
  }
</style>
