<template>
  <div class="caregory">
    <nav-bar class="navbar">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :tabmenu="categories" @selectItem="selectItem"></tab-menu>
      <scroll
        id="tab-content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScoll"
        :data="[categoryData]"
      >
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @itemClick="tabClick" />
          <goods-list :goods="showCategoryGoods"></goods-list>
        </div>
      </scroll>
      <back-top @click.native="backClcik" v-show="isShow"></back-top>
    </div>
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import {
  tabControlMixin,
  itemListenerMixin,
  backTopMixin
} from "../../common/mixin";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
//子组件
import TabMenu from "./childcop/TabMenu";
import TabContentCategory from "./childcop/TabContentCategory";
//网络请求
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
export default {
  name: "Caregory",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList,
    BackTop
  },
  mixins: [tabControlMixin, itemListenerMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      saveY: 0,
      isShow: false
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  activated() {
    //要刷新一次，不然就会导致返回到首页时返回到顶部了。
    this.$refs.scroll.refresh();
    // 返回页面时滚动到离开时记录的位置并刷新
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 离开页面时记录页面离开时的滚动位置
    this.saveY = this.$refs.scroll.getScrollY();
    // 离开页面时取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex == -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryGoods() {
      if (this.currentIndex == -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },

  methods: {
    //网络请求
    _getCategory() {
      getCategory().then(res => {
        // 1.获取左侧分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i in this.categories) {
          this.categoryData[i] = {
            //存放右侧上面分类数据
            subcategories: {},
            //存放右侧下面商品的数据
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个右侧分类的数据
        this._getSubcategory(0);
      });
    },
    //请求分类的数据
    _getSubcategory(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        // console.log(res.data)
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        //console.log(this.categoryData)
        //请求右侧商品数据
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    //请求右下商品的数据
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategory(index);
    },
    contentScoll(position) {
      this.isShow = -position.y > 1000;
    },
    backClcik() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};
</script>

<style scoped>
.caregory {
  height: 100vh;
  padding-bottom: 49px;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 99;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
</style>