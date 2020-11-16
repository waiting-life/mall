<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
// import BScroll from '@better-scroll/core'
// import Pullup from '@better-scroll/pull-up'
// BScroll.use(Pullup)

export default {
  data() {
    return {
      scroll: null
    }
  },
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1、创建BStroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // 2、监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position)=> {
        this.$emit('scroll',position)
      })
    }
    // 3、监听滚动到底部
    if(this.pullUpLoad) {
        this.scroll.on('pullingUp',()=> {
          // console.log("监听滚动到底部")
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      console.log('.....')
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>
<style scoped>

</style>
