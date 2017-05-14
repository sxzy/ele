<template>
  <div>
    <div v-if="loading">loading...</div>
    <div class="goods_img"><img :src=food.image alt=""></div>
    <div class="content">
      <div class="goods_info">
        <div class="info_text">
          <h class="info_title">{{food.name}}</h>
          <div><span class="sell">月售{{food.sellCount}}多单，好评率{{food.rating}}</span></div>
          <div><span class="Oprice">￥{{food.price}}</span><span v-show="food.oldPrice " class="Price_old">${{food.oldPrice}}</span>
            <div class="cart_icon">
              <p>购物车</p>
            </div>
          </div>
        </div>
      </div>
      <div class="goods_intro">
        <h class="title">商品介绍</h>
        <p class="intro_text">
          {{food.info}}
        </p>
      </div>
      <div class="goods_rating">
        <h class="title">商品评价</h>
        <div class="rating_icon">
          <div class="all rating_btn ">全部 {{ratings}}</div>
          <div class="recommend rating_btn">推荐</div>
          <div class="dismiss rating_btn">吐槽</div>
          <div class="clc"></div>
        </div>
        <div class="select">
          <label class="checkbox" @click="rating_show_toggle()">
          <input class="myCheckbox" type="checkbox">
          </label>
          只看有内容的东西</div>
        <ul class="rating_list">
          <li class="rating_listpart" v-for="rating in food.ratings" v-if="showAll ? true : rating.text.length">
            <p class="head"><span class="publish_time">{{rating.rateTime}}</span><span class="head_icon">{{rating.username}}<img
              :src=rating.avatar alt=""></span></span>
            <p class="rating_content">{{rating.text}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer"><v-footer></v-footer></div>
  </div>
</template>
<style>
</style>
<script>
  import axios from 'axios'
  import VFooter from '@/components/Vfooter/Vfooter'
  export default {
    components: {
      VFooter
    },
    data () {
      return {
        loading: false,
        detail: null,
        food: {},
        ratings: 0,
        showAll: true
      }
    },
    created () {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData: function () {
        var self = this
        this.loading = true
        axios.get('/api/goods')
          .then(function (response) {
            const goods = response.data.data
            self.loading = false
            console.log(goods)
            self.food = goods[self.$route.params.index].foods[self.$route.params.index1]
            self.ratings = self.food.ratings.length
          }).catch(function (err) {
            console.log(err)
          })
      },
      rating_show_toggle: function () {
        this.showAll = !this.showAll
      }
    }
  }
</script>
<style scoped>
  * {
    list-style-type: none;
  }
  .clc {
    clear: both;
  }
  /*商品图片*/
  .goods_img {
    height:375px;
  }
  .goods_img img {
    height:375px;
    width:100%;
  }
  /*内容区域块*/
  .content {
    width:100%;
  }
  /*底部固定的购物车块*/
  .footer {
    position: fixed;
    bottom: 0px;
    z-index: 1000;
    width: 100%;
  }
  /*商品的简要信息*/
  .goods_info {
    margin-bottom: 16px;
    padding: 18px 0px;
    border-bottom: 16px solid #f3f5f7;
  }
  .goods_info .info_text {
    padding: 18px;
  }
  .goods_info .sell {
    padding-top: 8px;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .goods_info .Oprice {
    color: rgb(240,20,20);
    line-height: 24px;
    padding-right: 12px;
  }
  .goods_info .Price_old {
    color: rgb(147,153,159);
    line-height: 24px;
    padding-right: 12px;
    text-decoration: line-through;
  }
  .goods_info .cart_icon {
    float: right;
  }
  .cart_icon p {
    display: inline-block;
    width: 75px;
    height: 24px;
    background: rgb(0,160,220);
    border-radius: 10px;
    line-height: 24px;
    color: white;
    text-align: center;
  }
  /*商品介绍区域*/
  .goods_intro {
    padding: 18px;
    border-bottom: 18px solid #f3f5f7;
  }
  .goods_intro .title {
    line-height: 18px;
    font-weight: 700;
  }
  .goods_intro .info_text {
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(77,85,93);
  }
  /*商品评价区域*/
  .goods_rating {
    overflow: auto;
    padding: 18px;
  }
  .goods_rating .rating_icon {
    margin: 18px 0px;
  }
  .goods_rating .select {
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 24px;
    padding: 12px 0px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    border-top: 1px solid rgba(7,17,27,0.1);
  }
  .rating_icon {
    margin: 18px 0px;
  }
  .rating_icon .rating_btn {
    height: 32px;
    float: left;
    line-height: 16px;
    border-radius: 6px;
    padding: 8px 12px;
    margin-right: 8px;
  }
  .rating_icon .all{
    color: white;
    background: rgb(0,160,220);
  }
  .rating_icon .recommend{
    color: rgb(77,85,93);
    background: rgba(0,160,220,0.2);
  }
  .rating_icon .dismiss{
    color: rgb(77,85,93);
    background: rgba(77,85,93,0.2);
  }
  .rating_content{
    padding-top: 6px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f3f5f7;
    color: rgb(7,17,27);
  }
  .rating_list {
    padding: 0px 0px 50px 0px;
  }
  .rating_listpart {
    padding-top: 16px;
  }
  .rating_list .head {
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 12px;
  }
  .rating_list .head_icon {
    float: right;
  }
  .head_icon img{
    width: 12px;
    height: 12px;
    border-radius: 6px 6px;
    margin-left: 6px;
    vertical-align: top;
  }
  /*.myCheckbox {*/
    /*!*display: none;*!*/
  /*}*/
  /*.checkbox {*/
    /*font-weight: 500;*/
    /*font-size: 4em;*/
  /*}*/
  /*input[type='checkbox'].myCheckbox {*/
    /*position: relative;*/
    /*left: -999em;!* hide the real checkbox *!*/
  /*}*/
  /*input[type='checkbox'].myCheckbox + span:after {*/
    /*content:"\f096";!* In fontawesome, is an open square (fa-square-o) *!*/
  /*}*/
  /*input[type='checkbox'].myCheckbox:checked + span:after {*/
    /*content:"\f046";!* fontawesome checked box (fa-check-square-o) *!*/
  /*}*/
  /*content: "\f096"*/
</style>
