<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-check="allCheck" @click.native="checkAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">总价：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick()">付款:({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    allCheck() {
      if (this.$store.state.cartList.length === 0) return false;
      //1.使用filter,过滤要遍历全部的数据，可能效率比较低
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      //2.使用find，找到一个就结束，效率比较高
      return !this.$store.state.cartList.find(item => !item.checked);
      //3.普通遍历
      // for(let item of this.$store.state.cartList){
      //         if(!item.checked){
      //             return false
      //         }
      // }
      // return true
    }
  },
  methods: {
    checkAll() {
      if (this.allCheck) {
        //单选全部选中时
        this.$store.state.cartList.forEach(item => (item.checked = false));
      } else {
        //单选部分选中或者没有选中
        this.$store.state.cartList.forEach(item => (item.checked = true));
      }
    },
    calcClick() {
      if(!this.allCheck) {
        this.$toast.show("请选择购买商品",1500);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 100px;
  background-color: orangered;
  color: white;
  text-align: center;
}
</style>