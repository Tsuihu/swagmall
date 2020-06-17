<template>
  <div class="profile-nav">
    <nav-bar>
      <div slot="center">我的</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "ProFileNavBar",
  components: {
    NavBar
  }
};
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>