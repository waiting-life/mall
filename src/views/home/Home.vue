<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   v-show="isTabFixed"
                   ref="topTabControl"/>  
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load=true
            @scroll="contentScroll"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend ref="recommand" :recommends="recommends"/>
      <home-feature ref="feature"/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from "./childComponents/HomeSwiper"
import HomeRecommend from "./childComponents/HomeRecommend"
import HomeFeature from "./childComponents/HomeFeature"


import { getHomeMultidata,getHomeGoods } from "network/home"
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import bus from 'common/bus'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0,list: []},
        'new': {page: 0,list: []},
        'sell': {page: 0,list: []}
      },
      currentType: 'pop',
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [itemListenerMixin,backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1、请求多个数据
    this.getHomeMultidata()
    // 2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // 3、手动点击代码一次
    // 因为下面tabClick函数里面取了dom元素$refs.tabControl,$refs.topTabControl,created里面不能取dom
    // 所以会报错，有两种解决办法
    // 1、手动调用写在mounted里面
    // 2、在tabClick里面做一个判断

    // this.tabClick(0)
  },
  mounted(){
    console.log('mounted')
    // 手动点击代码一次
    this.tabClick(0)
  },
  destroyed(){
    console.log('destroyed')
  },
  // 进来的时候
  activated() {
    console.log('activated')
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  // 离开的时候
  deactivated() {
    console.log('deactivated')
    // 1、保存Y值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2、取消全局事件的监听
    // 不能只传一个事件，要传一个函数，一旦传入一个事件意味着所有的用到关于那个事件的监听都被取消了
    bus.$off('itemImageLoad',this.itemImageListener)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    
    tabClick(index) {
      console.log(index)
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break
      }

      // 让两个TabControl的currentTIndex保持一致
       this.$refs.topTabControl.currentIndex = index;
       this.$refs.tabControl.currentIndex = index;
      // if(this.$refs.topTabControl !== undefined) {
      //   this.$refs.topTabControl.currentIndex = index;
      //   this.$refs.tabControl.currentIndex = index;
      // }
      
    },
    contentScroll(position) {
      // console.log(position)
      // 1、判断BackTop是否显示
      // 可以抽到mixin里面
      // this.isShowBackTop = -position.y > 1000
      this.listenBackTop
      // 2、决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      // console.log((-position.y)>this.tabOffsetTop)
    },
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 2、获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      // 输出的offsetTop不准确，因为图片不一定加载完，要等图片加载完拿对应的offsetTop
      // 主要是轮播图加载慢，影响最大的是轮播图，所以监听轮播图加载完没有
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      console.log(this.tabOffsetTop)
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res=> {
        // console.log(res.data.banner);
        // console.log(res.data.recommend)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /* position: fixed;
    right: 0;
    left: 0;
    top: 0; */
    z-index: 9;
  }
  /* 后面这个吸顶没效果了，不用了 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  /* 行不通 */
 /* .fixed {
   position: fixed;
   left: 0;
   right: 0;
   top: 44px;
 } */

 .tab-control {
   position: relative;
   z-index: 9;
 }

 .content {
   position: absolute;
   overflow: hidden;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }

</style>