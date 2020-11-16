<template>
  <div id="cart-list-item">
    <div class="product-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="product-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="product">
      <div class="product-title">{{product.title}}</div>
      <div class="product-desc">{{product.desc}}</div>
      <div class="product-bottom">
        <div class="product-price left">￥{{product.price}}</div>
        <div class="product-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  components: { CheckButton },
  name: 'CartListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }     
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    }
  }
}
</script>
<style scoped>
  #cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .product-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .product-title, .product-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product-img {
    padding: 5px;
  }
  .product-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .product {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .product .product-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .product-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .product-bottom .product-price {
    color: orangered
  }
</style>