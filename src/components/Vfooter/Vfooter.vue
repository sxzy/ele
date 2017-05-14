<template>
  <div class="footer">
    <div class="totalPrice" v-bind:class="{active:isActiveStyle}">
      <div class="shopcart">
        <div @click="toggleclass()"  class="logo_wraper"><div v-show="totalnum" class="count">{{totalnum}}</div><i class="fa fa-bath fa-1x" aria-hidden="true"></i></div>
      </div>
      <div class="Price"><span >${{totalprice}}</span></div>
      <div class="transfer_price"><span >另需配送费￥4元{{totalnum}}</span></div>
    </div>
    <div  class="transfer_condition" v-bind:class="{transfer_active:istransfer}">$20元起送</div>
  </div>
</template>
<script>
  import Bus from '@/bus'
  export default {
//    conponent: {
//      Bus
//    },
    data () {
      return {
        totalprice: 0,
        isActive: false,
        isActiveStyle: false,
        istransfer: false,
        transfer: 20,
        totalnum: 0
      }
    },
    watch: {
      totalprice: function () {
        var Otransfer = document.querySelector('.transfer_condition')
        if (this.totalprice > 0) {
          if (this.totalprice - 20 < 0) {
            this.istransfer = false
            this.transfer = 20 - this.totalprice
            Otransfer.innerHTML = '还差' + this.transfer + '起送'
          } else {
            this.istransfer = true
            Otransfer.innerHTML = '结算'
          }
          this.isActiveStyle = true
        } else {
          Otransfer.innerHTML = '$20元起送'
          this.istransfer = false
          this.isActive = false
          this.isActiveStyle = false
        }
        Bus.$emit('is-Active', this.isActive)
      }
    },
    mounted: function () {
      Bus.$on('total-price', function (totalprice) {
        this.totalprice = totalprice
      }.bind(this))
      Bus.$on('total-num', function (totalnum) {
        this.totalnum = totalnum
      }.bind(this))
    },
    methods: {
      toggleclass: function () {
        if (this.totalprice > 0) {
          this.isActive = !this.isActive
        }
        Bus.$emit('is-Active', this.isActive)
      }
    }
  }
</script>
<style acoped>
  .footer{
    display: flex;
    width: 100%;
    background: #141d27;
    height: 50px;
    color: rgba(255,255,255,0.4);
    z-index: 1000;
  }
  .totalPrice {
    flex: 1;
    margin-left: 18px;
  }
  .totalPrice .shopcart {
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #141d27;
    position: relative;
    bottom: 10px;
    vertical-align: top;
    padding: 6px;
    box-sizing: border-box;
  }
  .totalPrice .shopcart .fa{
    font-size: 24px;
    color: #80858a;
    line-height: 44px;
  }
  .totalPrice .logo_wraper {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    text-align: center;
    background: #2;
    background: #2b343c;
  }
  .active .logo_wraper .fa {
    color: rgb(255,255,255);
  }
  .active .logo_wraper  {
    background: rgb(0,160,220);
  }
  .totalPrice .Price{
    display: inline-block;
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    margin-top: 12px;
    font-weight: 700;
    line-height: 25px;
    padding-right: 12px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .footer .active .Price {
    color: rgb(255,255,255);
  }
  .totalPrice .transfer_price{
    display: inline-block;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 50px;
    margin-left:12px;
  }
  .transfer_condition {
    width:105px;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-weight: 700;
    line-height: 50px;
    background-color: #586C94;
    text-align: center;
  }
  .transfer_active {
    background-color: rgb(0,160,220);
    color: rgb(255,255,255);
  }
  .count {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 12.5px 12.5px;
    background: red;
    left: 40px;
    color: white;
    line-height: 25px;
    top: -2px;
  }

</style>
