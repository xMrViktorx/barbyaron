<template>
  <Navbar
    v-if="
      ['Home', 'Contact', 'Portfolio', 'PortfolioImages'].includes($route.name)
    "
  />
  <router-view />
  <Footer
    v-if="
      ['Home', 'Contact', 'Portfolio', 'PortfolioImages'].includes($route.name)
    "
  />
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
  methods: {},
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
</style>