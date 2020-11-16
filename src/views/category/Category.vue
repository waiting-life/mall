<template>
  <div>
    分类
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import {backTopMixin} from 'common/mixin'
export default {
  data() {
    return {

    }
  },
  name: "Category",
  mixins:[backTopMixin],
  methods: {

  }
}
</script>
<style>

</style>