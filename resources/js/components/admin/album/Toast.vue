<template>
  <div class="toast-wrapper">
    <div class="toast" :class="{ error: error2 }">{{ text }}</div>
  </div>
</template>

<script>
export default {
  props: ["toastText", "error"],
  data() {
    return {
      text: this.toastText,
      error2: this.error,
    };
  },
};
</script>

<style>
.toast-wrapper {
  position: fixed;
  top: 80px;
  width: auto;
  right: 20px;
  z-index: 999;
}
.toast {
  padding: 20px;
  color: #000;
  background: #1bfaad;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  font-size: 18px;
}

.error {
  background: #FA461B;
  color: #fff;
}
</style>
