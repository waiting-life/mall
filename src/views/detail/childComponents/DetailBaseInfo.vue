<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!-- 标题 -->
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="price">{{goods.price}}</span>
      <span class="oldprice">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
  position: relative;
}

.info-price .price {
  font-size: 24px;
  color: var(--color-high-text)
}
.info-price .oldprice {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}


/* .info-price .price{
  color: var(--color-high-text);
  font-size: 18px;
  font-weight: 500;
  margin-right: 5px;
}
.info-price .oldprice {
  text-decoration: line-through;
   margin-right: 5px;
   font-size: 14px;
} */
.info-price .discount {
  background-color: var(--color-tint);
  color: #fff;
  padding: 2px;
  border-radius: 6px;
  position: absolute;
  margin-left: 5px;
  bottom: 5px;
  font-size: 14px;
}
.info-other {
  padding: 20px 0 8px;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  justify-content: space-around;
}
.info-other span{
  flex: 1;
}
.info-services {
  display: flex;
  margin: 24px 0;
  font-size: 14px;
  justify-content:space-around;
}
.info-services img {
  width: 14px;
  height: 14px;
}
.info-services .info-service-item {
  flex: 1;
}
</style>