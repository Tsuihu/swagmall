<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <!-- <detail-base-info :goods="goods"></detail-base-info> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
// import DetailBaseInfo from './childComps/DetailBaseInfo'

import { getDetail,Goods } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid传入数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      // 2.1.获取顶部图片数据
      this.topImages = data.itemInfo.topImages;
      // 2.2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

    });
  },
  methods: {
    
  }
};
</script>

<style scoped>

</style>