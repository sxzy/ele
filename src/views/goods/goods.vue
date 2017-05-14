<template>
  <div class="goods_home">
    <div  class="side_nav">
    <ul>
      <li ref="NavPart" v-on:click="jump($event,index)" v-for="(good,index) in goods" class="btn"><span style="line-height: 14px;display: inline-block;vertical-align:middle">{{good.name}}</span></li>
    </ul>
    </div>
    <div v-on:scroll="scroll()" class="goods_part">
      <div v-for="(good,index1) in goods" class="listpart" ref="GoodsPart">
      <div class="title" >
          {{good.name}}
      </div>
      <div v-for="(food,index) in good.foods"  class="content" >
        <router-link class="content_link" :to="{name:'Detail', params:{index:index1,index1:index}}">
        <div class="goods_pic"><img v-bind:src="food.image" alt=""></div>
        <div class="goods_info">
          <div class="goods_title">{{food.name}}</div>
          <div class="goods_description">{{food.description}}</div>
          <div class="goods_sell"><span>月售{{food.sellCount}}多单</span><span class="g_sell">好评率{{food.rating}}</span></div>
          <div class="goods_price"><span>￥{{food.price}}</span><span v-show="food.oldPrice " class="discount">${{food.oldPrice}}</span>
            <div class="cartcontrol" @click ="transfer()">
              <cart-control :food = "food" @set-food="setFood">
                <!--:title = "food.name"-->
                <!--:price = "food.price"-->
              </cart-control></div>
          </div>
          <div v-show="food.count">{{TotalPrice}}</div>
        </div>
        </router-link>
      </div>
      </div>
      </div>
    <div class="cartlist" v-bind:class="{isActive:isActive}" @click ="transfer()">
    <cart-list :cartFood = "SelecteFood"></cart-list>
    </div>
    <div id="bg" @click="close()" v-bind:class="{bg_active:isActive}" class="bg"></div>
    </div>
</template>
<script>
  import axios from 'axios'
  import CartControl from '@/components/cartcontrol/CartControl'
  import CartList from '@/components/CartList/cartlist'
  import Bus from '@/bus'
  export default {
    components: {
      CartControl,
      CartList,
      Bus
    },
    data () {
      return {
        goods: {},
        PositionArray: [],
        targetIndex: 0,
        NavPosition: [],
        SelectedFoods: [],
        totalprice: 0,
        isActive: false,
        cartcount: 0
      }
    },
    computed: {
      TotalPrice: function () {
        var totalprice = 0
        var food = this.SelecteFood
        for (var i = 0; i < food.length; i++) {
          totalprice += food[i].count * food[i].price
        }
        this.totalprice = totalprice
        return totalprice
      },
      SelecteFood: function () {
        var food = []
        this.num ++
        this.cartcount = 0
        for (var i = 0; i < this.goods.length; i++) {
          for (var j = 0; j < this.goods[i].foods.length; j++) {
            if (this.goods[i].foods[j].count) {
              this.cartcount += this.goods[i].foods[j].count
              food.push(this.goods[i].foods[j])
            }
          }
        }
        return food
//        this.getTotalPrice(this.SelectedFoods)
      }
    },
    methods: {
      setFood (val) {
        console.log(val, 32323)
        // food.count =  val
      },
      transfer: function () {
        Bus.$emit('total-price', this.totalprice)
        Bus.$emit('total-num', this.cartcount)
      },
      jump: function (e, index) {
        var GoodsList = document.querySelector('.goods_part')
        GoodsList.scrollTop = this.PositionArray[index]
      },
//      得到的是每一个标题在容器内的位置
      getposition: function (container, target) {
        for (var i = 0; i < target.length; i++) {
          const offsetposition = getTop(target[i]) - 174
          container.push(offsetposition)
        }
        function getTop (e) {
          var offset = e.offsetTop
          if (e.offsetParent != null) {
            offset += getTop(e.offsetParent)
          }
          return offset
        }
      },
      scroll: function (event) {
//       滚动内容页面 实现左侧导航栏的标签跳转
        var GoodsList = document.querySelector('.goods_part')
        var scrollT = Math.ceil(GoodsList.scrollTop)
        for (var i = 0; i < this.PositionArray.length; i++) {
          if (scrollT >= this.PositionArray[this.PositionArray.length - 1]) {
            this.targetIndex = this.PositionArray.length - 1
            this.active(this.PositionArray.length - 1)
          } else if (scrollT >= this.PositionArray[i] && scrollT < this.PositionArray[i + 1]) {
            this.targetIndex = i
            this.active(i)
          }
        }
      },
      close: function () {
        this.isActive = false
      },
      active: function (index) {
//        设置样式，激活当前的active的样式
        var btn = document.querySelectorAll('.btn')
        for (var i = 0; i < btn.length; i++) {
          if (btn[i].classList.contains('active')) {
            btn[i].classList.remove('active')
          }
        }
        btn[index].classList.add('active')
      },
      Navscroll: function (index) {
        var nav = document.querySelector('.side_nav')
        var scrollT = nav.scrollTop
        console.log(this.NavPosition[index] + '页面的位置')
        console.log(scrollT + '滚动轴的位置')
        if ((this.NavPosition[index] - scrollT) < 0) {
          nav.scrollTop -= 60
          console.log(this.NavPosition[index])
          console.log('进来了')
        } else if ((this.NavPosition[index] - scrollT) > 400) {
          nav.scrollTop += 200
        }
      },
      getTotalPrice: function (food) {
        console.log(food)
      }
    },
    mounted: function () {
      var self = this
      var TitleArray = []
      var navArray = []
      axios.get('/api/goods')
        .then(function (response) {
          const goods = response.data.data
          self.goods = goods
          self.$nextTick(function () {
            var title1 = self.$refs.GoodsPart
            var NavList = self.$refs.NavPart
            for (var i = 0; i < title1.length; i++) {
              TitleArray.push(title1[i].querySelector('.title'))
            }
            for (var j = 0; j < NavList.length; j++) {
              navArray.push(NavList[j])
            }
            self.getposition(this.PositionArray, TitleArray)
            self.getposition(this.NavPosition, navArray)
//            将右边的标题栏的位置数据存放在数组中；
          })
        }).catch(function (error) {
          console.log(error)
        })
      Bus.$on('is-Active', function (isActive) {
        this.isActive = isActive
      }.bind(this))
    },
    created: function () {
      console.log('222')
    }
  }
</script>
<style scoped>
  .cartlist {
    width:100%;
    position: absolute;
    bottom: -200px;
    transition: bottom 0.4s linear;
  }
  .isActive {
    bottom: 0px;
    transition: bottom 0.4s linear;
  }
  .side_nav ul .active {
    position: relative;
    z-index:100;
    background: white;
    color: rgb(7,17,27);
    margin-top: -2px;
    font-weight: 300;
  }
  .goods_home {
    display: flex;
  }
  .side_nav {
    height:calc(100vh - 224px);
    overflow-y: auto;
    width:80px;
    text-align: center;
    box-sizing: border-box;
    background: #f3f5f7;
    flex:0 0 80px;
  }
  .side_nav ul li {
    float: left;
    height: 54px;
    line-height: 54px;
    list-style-type: none;
    font-size: 12px;
    color: gray;
    font-weight: 200;
    width: 80px;
    padding: 0 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .goods_part {
    height:calc(100vh - 224px);
    overflow-y: auto;
  }
  .goods_part .listpart .content:last-child {
    border-bottom: none;
  }
  .goods_part .title {
    width: 100%;
    height:26px;
    line-height:26px;
    padding-left: 14px;
    font-size: 12px;
    color: rgb(147,153,159);
    background: #f3f5f7;
    border-left: 1px solid #d9dde1;
  }
  .goods_part .content {
    margin:18px 18px 0px 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .goods_part .content .content_link{
    display: flex;
  }
  .goods_part .content .goods_pic img{
    width:64px;
    height:64px;
  }
  .goods_part .content .goods_info{
    flex:1;
    /*float: left;*/
    margin-left: 10px;
    margin-top: 2px;
  }
  .goods_info .goods_title{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .goods_info .goods_description {
    font-size: 10px;
    color: rgb(7,17,27);
    line-height: 14px;
    margin-bottom: 8px;
  }
  .goods_info .goods_price{
    font-size: 10px/14px;
    color:red;
    font-weight: normal/700;
    line-height: 24px;
  }
  .goods_info .goods_price .discount{
    margin-left: 12px;
    font-size: 20px;
    text-decoration: line-through;
    color: rgb(147,153,159);
    font-weight: normal/700;
    line-height: 24px;
  }
  .goods_info .goods_sell{
    margin-bottom: 8px;
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
  }
  .goods_info .goods_sell .g_sell {
    display: inline-block;
    padding-left: 12px;
  }
  .cartcontrol {
    display: inline-block;
    float: right;
  }
  .bg {
    display: none;
    position: absolute;
    top: 0px;
    height: 100%;
    width: 100%;
    background: rgba(7,17,27,0.6);
    z-index:888;
  }
  .bg_active {
    display: block;
  }




  /*header的商家信息相关样式*/
  /*.avater {*/
    /*float: left;*/
    /*margin-left: 24px;*/
  /*}*/
  /*.img {*/
    /*width:64px;*/
    /*height:64px;*/
    /*background-color: #9B9B9B;*/
  /*}*/
  /*.seller-info {*/
    /*float: left;*/
    /*margin-left: 16px;*/
    /*padding: 2px 0px;*/
  /*}*/
  /*.seller-info .title {*/
    /*margin-bottom: 8px;*/
    /*height:18px;*/
    /*line-height: 18px;*/
  /*}*/
  /*.seller-info .brand {*/
    /*display: inline-block;*/
    /*height:18px;*/
    /*line-height: 18px;*/
    /*width: 30px;*/
    /*margin-right: 6px;*/
    /*background: url("brand@2x.png");*/
    /*background-size: 30px 18px;*/
    /*vertical-align: top;*/
  /*}*/
  /*.seller-info .name {*/
    /*display: inline-block;*/
    /*font-size: 16px;*/
    /*color:rgb(255,255,255);*/
    /*font-weight: bold;*/
    /*line-height: 18px;*/
    /*height: 18px;*/
  /*}*/
  /*.seller-info .transfer {*/
    /*font-size: 12px;*/
    /*color:rgb(255,255,255);*/
    /*font-weight:200;*/
    /*height:12px;*/
    /*line-height: 12px;*/
    /*margin-bottom: 10px;*/
  /*}*/
  /*.seller-info .activety {*/
    /*height:12px;*/
    /*line-height: 12px;*/
  /*}*/
</style>
