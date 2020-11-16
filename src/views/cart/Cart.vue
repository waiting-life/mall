<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: { 
    NavBar,
    CartList,
    CartBottomBar
  }, 
  computed: {
    // 写成数组名字一样的
    // ...mapGetters(['cartLength']),

    // 写成对象可以改名字
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>
<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
  }
</style>