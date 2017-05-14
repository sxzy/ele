<template>
  <div>
  <div class="cartList">
    <ul>
      <li class="list_head"><span class="cart left">购物车</span><span @click="empty()" class="delete right">清空</span></li>
      <div class="cartfood">
      <li v-for="(food,index) in cartFood"><span class="left">{{food.name}}</span>
        <div class="cartcontrol right"><cart-control :food = "food"></cart-control></div>
      </li>
      </div>
    </ul>
  </div>
  </div>
</template>
<script>
  import CartControl from '../cartcontrol/CartControl'
  export default {
    components: {
      CartControl
    },
    data () {
      return {
        show: 'true'
      }
    },
    props: {
      cartFood: {
        type: Array
      }
    },
    methods: {
      empty: function () {
        for (var i = 0; i < this.cartFood.length; i++) {
          this.cartFood[i].count = 0
        }
      }
    }
  }
</script>
<style scoped>
  .cartfood {
    max-height:200px;
    overflow: auto;
  }
  .list_head {
    height:40px;
    line-height: 40px;
    background: #f3f5f7;
  }
  .list_head .cart {
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
  }
  .list_head .delete {
    font-size: 12px;
    color: rgb(0,160,220);
  }
  .cartList {
    width: 100%;
    background: white;
    position: absolute;
    bottom: 50px;
    z-index: 1000;
  }
  .cartList li{
    display: flex;
    height: 48px;
    padding: 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 24px;
  }
  .cartList li span {
    display: inline-block;
    line-height: 24px;
    color:rgb(7,17,27);
    height:24px;

  }
  .cartcontrol {
    display: inline-block;
  }
  .left {
    flex:2;
  }
  .right{
    flex:1;
  }
</style>
