/**
 * Created by katherine on 2017/4/24.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Detail from '@/views/detail/detail'
import Goods from '@/views/goods/goods'
import Seller from '@/views/seller/seller'
import Greeting from '@/views/greeting/greeting'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/good/:index/sub_good/:index1',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'goods',
          name: 'goods',
          component: Goods

        },
        {
          path: 'seller',
          name: 'seller',
          component: Seller
        },
        {
          path: 'greeting',
          name: 'greeting',
          component: Greeting
        }
      ]
    }
  ]
})
