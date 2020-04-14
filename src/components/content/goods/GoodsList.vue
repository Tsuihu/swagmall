<template>
  <div class="goods">
    <goods-list-item class="goods-item" v-for="(item,index) in goods" :key="index" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  /* 根据宽度决定一行当中显示多少元素 */
  flex-wrap: wrap;
  /* 使元素中间均等分(左右两边的距离等于中间的距离) */
  justify-content: space-around;
  padding: 3px;
}
</style>