<template>
  <div id="home">
    <!-- 顶部导航组件 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      v-show="isTabFixed"
      class="tab-control"
      ref="tabControl1"
      :titles="['流行','新品','精选']"
      @tabClick="tabClick"
    ></tab-control>

    <!-- better-scroll实现滚动 -->
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :probe-type="3"
      :pull-up-load="true"
    >
      <!-- 轮播图组件 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <!-- 推荐信息组件 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 推荐图片组件 -->
      <feature-view></feature-view>
      <!-- 分类组件 -->
      <tab-control ref="tabControl2" :titles="['流行','新品','精选']" @tabClick="tabClick"></tab-control>
      <!-- 商品组件 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin,backTopMixin} from '../../common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  computed: {
    // goods传值
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据(调用getHomeMultidata()方法获取网络请求的值)
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    console.log("home destroyed");
  },
  // 《进入组件时执行的代码》
  activated() {
    // 加载之前页面的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  // 《离开组件时进行的代码》
  deactivated() {
    // 储存离开时页面的位置
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  mounted() {
    
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    // 1.请求多个数据(调用getHomeMultidata()方法获取网络请求的值)
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 2.请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 把请求的list数据放到goods对象里的list数组
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page + 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    /**
     * 事件监听相关方法
     */
    // 1.通过获取索引值动态改变商品列表
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 3.监听滚动高度
    contentScroll(position) {
      // tabControl吸顶效果
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // 回顶部图标的显示与隐藏
      this.isShowBackTop = (-position.y) > this.tabOffsetTop;
    },
    // 4.上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    // 5.(获取tabControl的offsetTop) $el 用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* viewport height */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用游览器原生滚动时添加的定位 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* calc()获取中间滚动的高度 用全部高度减去顶部底部高度 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>