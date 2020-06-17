<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      isShow: false,
      message: ""
    };
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  width: 85%;
  text-align: center;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 8px 8px;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>