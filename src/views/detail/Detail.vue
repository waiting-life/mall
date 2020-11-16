<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- <toast :message="message" :is-show="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'


import bus from 'common/bus'
// import { mapActions } from 'vuex'


// import Toast from 'components/common/toast/Toast'

export default {
  name: "Detail",
  components: {
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailGoodsInfo,
   DetailParamInfo,
   DetailCommentInfo,
   GoodsList,
   DetailBottomBar,
  //  Toast
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      // message: '',
      // isShow: false
    }
  },
  created() {
    console.log(this)
    // 1、保存传入的iid
    this.iid = this.$route.params.iid
    // 2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      // 1、获取顶部的轮播数据
      this.topImages = res.result.itemInfo.topImages
      // 2、获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      console.log(this.shop)
      // 4、保存商品的详情信息
      this.detailInfo = data.detailInfo;
      // 5、获取参数信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
      // console.log(data.itemParams.info)
      console.log(this.paramInfo)
      // 6、取出评论的信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // // 1.第一次获取,值不对
      // // 值不对的原因:this.$refs.params.
      // this.themeTopYs = []
   
      // this.themeTopYs.push(0);
      // //  参数的offsetTop
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // //  评论的offsetTop
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // //  推荐的offsetTop
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)


      // // this.$nextTick等到前面都渲染完就来执行this.$nextTick这个函数
      // // 这里依然是不对的,因为只能保证dom渲染了,不能保证图片加载完
      // // 根据最新的数据,对应的dom是已经渲染出来
      // // 但是对应的图片依然没有加载完(目前获取到的offsetTop不包含图片),
      // // 有时在页面会正确是因为对图片有缓存,重新刷新进入详情页会不准确,或者进入新的页面
      // // 一般情况下,offsetTop值不对的时候,都是因为图片的问题
      // this.$nextTick(()=> {
      //   // 2.第二次获取:值不对
      //   // 值不对的原因:图片没有计算在内
      //   this.themeTopYs = []
   
      //   this.themeTopYs.push(0);
      //   //  参数的offsetTop
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   //  评论的offsetTop
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   //  推荐的offsetTop
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      //   //  打印出的结果不对，在mounted里面数据没获取到不准确
      //   //  updated里面数据渲染出来了，能保证有数据,
      //   // update更新比较频繁updated里面会更新两次,所以第一次给赋值为空
      // })
    })

    
    // 3、请求推荐数据
    getRecommend().then(res=> {
      console.log(res)
      this.recommends = res.data.list
    })
    // 4.给getThemeTopY赋值(对this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopYs = debounce(()=> {
      this.themeTopYs = []
   
      this.themeTopYs.push(0);
      //  参数的offsetTop
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //  评论的offsetTop
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //  推荐的offsetTop
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    },100)
 },
 mounted() {
  //  mounted里面的也会打印，会将混入，混入到mounted函数里面
   console.log('mounted')
 },
//  updated() {
//    this.themeTopYs = []
   
//    this.themeTopYs.push(0);
//   //  参数的offsetTop
//    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
//   //  评论的offsetTop
//    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
//   //  推荐的offsetTop
//    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
//    console.log(this.themeTopYs)
//   //  打印出的结果不对，在mounted里面数据没获取到不准确
//   //  updated里面数据渲染出来了，能保证有数据,
//   // update更新比较频繁updated里面会更新两次,所以第一次给赋值为空
//  },
 destroyed() {
   bus.$off('itemImageLoad',this.itemImageListener)
 },
  methods: {
    // ...mapActions(['addToCart']),
    // ...mapActions({
    //   add: 'addToCart'
    // }),

    imageLoad() {
      // console.log('....')
      // this.$refs.scroll.refresh()
      this.refresh()
      // 在每次图片加载完成后,值一定是对的,不过会太频繁
      this.getThemeTopYs()
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },

    contentScroll(position) {
      // console.log(position)
       this.isShowBackTop = -position.y > 1000

      // 1.获取y值

      const positionY = -position.y
      // 2.position中的值和主题中的值进行对比
      // [0, 5652, 6419, 6751]
      // positionY在0和5652之间,index = 0;
      // positionY在5652和6419之间,index = 1;
      // positionY在6419和6751之间,index = 2;
      // positionY在超过6751之后,index = 3;

      // for(let i in this.themeTopYs) {
      //   // console.log(i) //i是字符串类型 i+1
      //   // console.log(i+1)
      //   parseInt(i)
      //   if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
      //     console.log(i)
      //   }
      // }

      // 用原始for循环能保证i肯定是个数字
      // 稍微有点不对,取不到i为3
      let len = this.themeTopYs.length;
      for(let i = 0; i < len-1; i++) {
        // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //   console.log(i)
        // }

        // 普通做法,判断
        // if(this.currentIndex !== i &&  ((i < len-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === len-1 && positionY >= this.themeTopYs[i]))) {
        //   // console.log(i)
        //   this.currentIndex = i;
        //   console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // hack做法
        // [0, 5652, 6419, 6751,Number.MAX_VALUE]
        // console.log(Number.MAX_VALUE)
        // positionY在0和5652之间,index = 0;
        // positionY在5652和6419之间,index = 1;
        // positionY在6419和6751之间,index = 2;
        // positionY在6751和非常大的值之间,index = 3;

        // positionY在超过6751之后,index = 3;
        // 这里判断条件为i<len-1,普通做法为i<len
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },

    addToCart() {
      // console.log('点击加到购物车')
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
  

      // 2.将商品添加到购物车里面
      // 提交要在mutations里面,虽然可以,但是不要在这里写
      // this.$store.cartList.push(product)

      this.$store.dispatch('addToCart',product).then(res => {
        // this.isShow = true;
        // this.message = res;
        // console.log(res);
        // setTimeout(()=> {
        //   this.isShow = false;
        //   this.message = '';
        // },1500)

        this.$toast.show(res,2000)
      })


      // 映射，mapActions,还有点问题
      // this.addToCart('addToCart',product).then(res => {
      //   console.log(res);
      // })

      // 3.添加到购物车成功

    }
  }
}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
  .detail-nav {
    position:relative;
    z-index: 9;
    background-color: #fff;
  }
</style>