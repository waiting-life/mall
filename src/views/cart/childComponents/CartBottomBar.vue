<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button" 
        :is-checked="isSelectAll" 
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="total-price">
      合计:￥{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'CheckBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },

    // totalPrice() {
    //   return this.$store.getters.cartList.filter(item => {
    //     return item.checked
    //   }).reduce((preValue,item) => {
    //     return preValue + item.price * item.count
    //   },0).toFixed(2)
    // },
    // checkedLength() {
    //   return this.$store.getters.cartList.filter(item => item.checked).length
    // }
    isSelectAll() {
      // 1、使用filter
      // if(this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      // 没有数据的时候刚开始选中了，因为，没有数据的时候相当于return !undefined
      // 所以先判断

      // 2、使用find
      // if(this.cartList.length === 0) return false
      // return !this.cartList.find(item => !item.checked)

      // 3、普通遍历方法
      if(this.cartList.length === 0) return false;
      for(let item of this.cartList) {
        if(!item.checked) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    checkClick() {
      // // console.log('...')
      if(this.isSelectAll)  { //全部选中的情况下，变为全部不选中
        this.cartList.forEach(item => item.checked = false)
      }else { //有没有选中的或者全部不选中
        this.cartList.forEach(item => item.checked = true)
      }

      // 不能这样简化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>
<style scoped>
  .cart-bottom-bar {
    position: relative;
    display: flex;
    align-items: center;

    height: 40px;
    font-size: 14px;
    background-color: #eee;
    /* line-height: 40px; */
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    /* line-height: 20px; */
  }
  .total-price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color:orangered;
    color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
</style>