<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
//公共组件
// import Scroll from "../../../components/common/scroll/Scroll"
import { mapGetters } from "vuex";
//子组件
import CartNavBar from "./childComponments/CartNavBar";
import CartList from "./childComponments/CartList";
import CartBottomBar from "./childComponments/CartBottomBar";
export default {
  name: "Cart",
  components: {
    CartNavBar,
    // Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    //可以把vuex中的carList映射到当前组件
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
  padding-bottom: 49px;
}
</style>