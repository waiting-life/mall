<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="shop-name">{{shop.name}}</span>
    </div>  
    <div class="shop-info-main">
      <div shop-info-main-item class="shop-info-main-item shop-info-main-left">
        <div class="shop-small-item shop-sells">
          <div>{{shop.sells}}</div>
          <span>总销量</span>
        </div>
        <div class="shop-small-item shop-count">
          <div>{{shop.goodsCount}}</div>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="shop-info-main-item shop-info-main-right">
        <div class="shop-evaluate">
          <div class="shop-evaluate-item" v-for="(item,index) in shop.score" :key="index">
            <span class="score-name">{{item.name}}</span>
            <span class="score-nobetter" :class="{scorebettter: item.isBetter}">{{item.score}}</span>
            <span class="nobetter" :class="{bettercolor: item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.shop-top {
  height: 120px;
  display: flex;
  align-items: center;
}
.shop-top img {
  width: 60px;
  height: 60px;
  margin-left: 8px;
  margin-right: 8px;
}
.shop-top .shop-name {
  font-size: 16px;
}
.shop-info-main {
  display: flex;
  padding: 20px 0;
}
.shop-info-main-item {
  flex: 1;
}
.shop-info-main .shop-info-main-left {
  display: flex;
  border-right: 2px solid #ddd;
  padding: 0 8px;
}
.shop-small-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.shop-small-item div {
  margin-bottom: 10px;
}
.shop-small-item span {
  font-size: 14px;
}
.shop-info-main {
  height: 120px;
}
.shop-info-main .shop-info-main-right {
  margin-left: 30px;
  font-size: 14px;
}
.score-nobetter {
  color: #5ea732;
}
.scorebettter {
  color: #f13e3a;
}
.nobetter {
  background-color:#5ea732;
  color: white;
  text-align: center;
}
.bettercolor {
  background-color: #f13e3a;
  color: #fff;
  text-align: center;
}
.shop-evaluate-item {
  display: flex;
  justify-content: space-between;
  padding: 6px;
}
.shop-bottom {
  width: 120px;
  text-align: center;
  margin: auto;
  padding: 5px 0;
  background-color: #ddd;
  border-radius: 5px;
  font-size: 13px;
}
</style>