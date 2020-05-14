<template>
  <div class="cart-list">
    <scroll class="content" ref="srcoll">
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  //监听属性
  computed: {
    //可以把vuex中的carList映射到当前组件
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.srcoll.refresh();
  }
};
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>