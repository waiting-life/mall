import bus from './bus'
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
     // 1、监听item中图片加载完成,图片加载完成的事件监听
     this.refresh = debounce(this.$refs.scroll.refresh,100)

     // 对监听的事件进行保存
     this.itemImageListener = ()=> {
       this.refresh();
     }
     bus.$on('itemImageLoad',this.itemImageListener)
     console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0,0)
    },
    listenBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}
