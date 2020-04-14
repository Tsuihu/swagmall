<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default{
  name:"Scroll",
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
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    // 1.创建BScroll对象
    // var wrapper = document.querySelector('.wrapper');
    var wrapper = this.$refs.wrapper;
    this.scroll = new BScroll(wrapper, {
      click: true,
      // 动态决定是否实时监听
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // 2.监听滚动事件
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
      this.$emit('scroll',position);
    })
    }
    // 3.监听scrool滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      })
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x,y,time = 500) {
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    // 刷新页面 计算可滚动的区域
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 记录液面高度
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
}
</script>

<style scoped>

</style>