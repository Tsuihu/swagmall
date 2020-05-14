<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
//子组件
import NavBar from "components/common/navbar/NavBar";
//这个mapGetters可以直接把getters中的方法变成计算属性，直接在当前组件中使用
import { mapGetters } from "vuex";
export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["cartLength"])
    // ...mapGetters({
    //     'length':'cartLength',
    // })
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
}
</style>