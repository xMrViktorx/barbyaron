<template>
  <footer>
    <span
      ><i class="far fa-copyright"></i> {{ new Date().getFullYear() }} | Molnár
      Viktor</span
    >
  </footer>
</template>

<script>
export default {

};
</script>

<style scoped>
footer {
  /*background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 1) 49%,
    rgba(0, 0, 0, 0.2) 100%
  );*/
  font-family: "Montserrat", sans-serif;
  color: #fff;
  padding: 20px 18px 15px 0;
  font-size: 14px;
  width: 100%;
  text-align: right;
  bottom: 0;
  position: fixed;
  z-index: 101;
  /* transition: 0.4s;
  transform: translateY(0px);*/
}
/*
.showFooter {
   transform: translateY(50px);
  transition: 0.4s;
}*/
</style>