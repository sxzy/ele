<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avater"><div class="img"><img src="" alt=""></div></div>
      <div class="seller-info">
        <div class="title"><span class="brand"></span><span  class="name">{{sellers.name}}</span></div>
        <div  class="transfer">{{sellers.description}}/{{sellers.description}}</div>
        <div class="activety"><span class="activety_icon"></span><span v-if="loadstatus" class="detail">{{sellers.supports[1].description}}</span></div>
      </div>
      <div class="more" @click = showdetail><p>5个<span class="arrow">></span></p></div>
    </div>
    <div class="info-wrapper">
      <div class="info"><span class="bulletin"></span><span  @click=showdetail class="bullentin_text">{{sellers.bulletin}}</span></div>
    </div>

    <!--详情信息弹出框-->
    <div v-show="detailShow" class="info_detail">
      <div class="info_head">
        <div class="title"><p class="title_text">周品香坊 ( 大运村 )</p></div>
        <div class="grating">star star star star star</div>
      </div>
      <div class="discount">
        <div class="list_title"><span class="line"></span><span class="title">优惠信息</span><span class="line"></span></div>
        <div class="info_list">
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
          <div class="info"><span class="bulletin">ww</span><span class="bullentin_text">在线支付满28减5，满50减10</span></div>
        </div>
      </div>
      <div class="seller_info">
        <p class="list_title"><span class="line"></span><span class="title">商家公告</span><span class="line"></span></p>
        <div class="detail info_list">我是试试是和i时候i婚纱好的市场司试试后i哦收我我是试试是和i时候i婚纱好的我是试试是和i时候i婚纱好的市场司试试后i哦收我我是试试是和i时候i婚纱好的市场司试试后i哦收我</div>
      </div>
      <div @click=closedetail class="close"><p class="close1">关闭</p></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showdetail: function () {
        this.detailShow = true
      },
      closedetail: function () {
        this.detailShow = false
      }
    },
    props: ['sellers', 'loadstatus']
  }
</script>
<style>

  /*主体的布局信息*/
  .background_img {
    width:100%;
    height:134px;
    position: absolute;
    z-index: -1;
    background-image: url("decrease_1@2x.png");
    top:0px;
    left:0px;
    filter: blur(10px);
  }
  .header {
    background: rgba(7,17,27,0.5);
    position: relative;
    width:100%;
    height:134px;
    blur:5px;
    overflow: hidden;
  }
  .content-wrapper {
    box-sizing: border-box;
    width:100%;
    padding-top: 24px;
    height: 106px;
    position: relative;
  }
  .info-wrapper {
    height:28px;
    width:100%;
    line-height: 28px;
  }
  /*header的商家信息相关样式*/
  .avater {
    float: left;
    margin-left: 24px;
  }
  .img {
    width:64px;
    height:64px;
    background-color: #9B9B9B;
  }
  .seller-info {
    float: left;
    margin-left: 16px;
    padding: 2px 0px;
  }
  .seller-info .title {
    margin-bottom: 8px;
    height:18px;
    line-height: 18px;
  }
  .seller-info .brand {
    display: inline-block;
    height:18px;
    line-height: 18px;
    width: 30px;
    margin-right: 6px;
    background: url("brand@2x.png");
    background-size: 30px 18px;
    vertical-align: top;
  }
  .seller-info .name {
    display: inline-block;
    font-size: 16px;
    color:rgb(255,255,255);
    font-weight: bold;
    line-height: 18px;
    height: 18px;
  }
  .seller-info .transfer {
    font-size: 12px;
    color:rgb(255,255,255);
    font-weight:200;
    height:12px;
    line-height: 12px;
    margin-bottom: 10px;
  }
  .seller-info .activety {
    height:12px;
    line-height: 12px;
  }
  .seller-info .activety_icon {
    display: inline-block;
    height:12px;
    line-height: 12px;
    width: 12px;
    margin-right: 4px;
    background: url("decrease_1@2x.png");
    background-size: 12px 12px;
    vertical-align: top;
  }
  .seller-info .detail {
    font-size: 10px;
    color:rgb(255,255,255);
    font-weight: 200;
    height:12px;
    line-height: 12px;
    display: inline-block;
    vertical-align: top;
  }
  .more {
    position: absolute;
    bottom: 18px;
    right:12px;
    width:60px;
    background-color: rgba(0,0,0,0.2);
    border-radius: 14px;
    padding:0px 8px;
    height:24px;
    line-height: 24px;
    text-align: center;
  }
  .more p {
    vertical-align: top;
    font-size: 10px;
    display: inline-block;
    font-weight: 200;
    color: white;
  }
  .more .arrow {
    display: inline-block;
    margin-left:2px;
    color: white;
  }
  /*公告部分的展示*/
  .info-wrapper {
    border-bottom: 1px solid black;
    padding:0 22px 0 12px;
    background-color: rgba(7,17,27,0.2);
  }
  .info-wrapper .info {
    width: 100%;
    font-size: 10px;
    color:rgb(255,255,255);
    font-weight: 200;
    height:28px;
    line-height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-wrapper .bulletin {
    display: inline-block;
    width:22px;
    height:12px;
    background: url("bulletin@2x.png");
    background-size: 22px 12px;
    margin-right: 4px;
    vertical-align: top;
    margin-top: 7px;
  }
  .info-wrapper .bullentin_text {
    font-size: 10px;
    color:rgb(255,255,255);
    font-weight: 200;
    line-height: 28px;
    vertical-align: top;
  }
  /*详情页的样式*/
  /*容器的基本样式设置*/
  .info_detail {
    position: fixed;
    width: 100%;
    height:100%;
    top:0px;
    left:0px;
    overflow: auto;
    padding:64px 36px 32px 36px;
    background:rgba(7,17,27,0.8);
    margin-bottom: 32px;
  }
  /*公共的标题样式*/
  .info_detail .line {
    width:104px;
    border: 1px solid rgba(255,255,255,0.2);
    display: inline-block;
    vertical-align: middle;
  }
  .list_title{
    margin-bottom: 24px;
    line-height: 16px;
    height: 16px;
    text-align: center;
    color: rgb(255,255,255);
  }
  .list_title .title {
    display: inline-block;
    padding: 0px 12px;
  }
  /*头部商家以及评分的基本样式*/
  .info_head {
    text-align: center;
    color: rgb(255,255,255);
    margin-bottom: 28px;
  }
  .info_head .title_text {
    font-size: 16px;
    font-weight: 700;
  }
  .info_head .grating {
    height: 48px;
  }
  /*优惠信息的基本样式*/
  .info_list {
    padding: 0px 12px;
    margin-bottom: 28px;
    color: white;
  }
  /*优惠信息的每一个list的样式*/
  .discount .info {
    height:16px;
    line-height: 16px;
    margin-bottom: 12px;
  }
  .discount .bullentin_text {
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    height: 12px;
  }
  /*商家公告的基本样式设置*/
  .seller_info .detail{
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
  }
  /*点击关闭按钮*/
  .close {
    color: white;
    font-size: 32px;
    text-align: center;
    width:100%;
    height:32px;
  }
</style>
