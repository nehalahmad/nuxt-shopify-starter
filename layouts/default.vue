<!-- This will be our App.vue -->
<template>
  <div class="flex min-h-screen flex-col">
    <site-header />
    <!-- <shopify-mini-cart /> -->
    <nuxt class="flex-1" />
    <!-- <notifications /> -->
    <site-footer class="mt-auto" />
  </div>
</template>

<script>
// Components
// import shopifyMiniCart from "~/components/shopify/MiniCart";

export default {
  components: {
    // shopifyMiniCart
  },
  mounted() {
    // Check that our checkout hasn't completed
    this.$store.dispatch("shopify/GET_CHECKOUT");
  },
};
</script>

<style lang="scss">
.container {
  color: black;

  a {
    color: black;
  }
}
</style>
