<template>
  <div class="profie">
    <pro-file-nav-bar></pro-file-nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <normal-list-view :list-data="orderList" />
    <normal-list-view :list-data="serviceList" />
  </div>
</template>

<script>
import ProFileNavBar from "./childComponents/ProFileNavBar";
import UserInfo from "./childComponents/UserInfo";
import AccountInfo from "./childComponents/AccountInfo";
import NormalListView from "./childComponents/NormalListView";
export default {
  name: "Profile",
  components: {
    ProFileNavBar,
    UserInfo,
    AccountInfo,
    NormalListView
  },
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style>
</style>