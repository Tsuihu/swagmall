<template>
  <div>
    <nav-bar class="nav-bar">
      <div class="back" @click="backClick" slot="left">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title" slot="center">
        <div class="title-item" 
              v-for="(item,index) in titles" 
              :key="index"
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      // this.$router.go(-1);
      this.$router.back();
    }
  },
};
</script>

<style scoped>
.nav-bar {
  box-shadow: 0 0 1px 1px rgba(200, 200, 200, .8);
}
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.back img{
  margin-top: 12px;
}
</style>