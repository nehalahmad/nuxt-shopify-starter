<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="site-name-text">
            <nuxt-link
              :to="{ name: 'index' }"
              class="outline-none"
              active-class=""
              exact
            >
              {{ shop.name }}
            </nuxt-link>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <app-navigation />
          </div>
        </div>
        <div class="ml-auto sm:ml-6 sm:block">
          <div class="flex items-center">
            <!-- <cart-icon /> -->
          </div>
        </div>
        <!-- <site-navigation-button /> -->
      </div>
    </div>
    <!-- <site-navigation-dropdown /> -->
  </nav>
</template>

<script>
import { Shop } from "~/gql/queries/Shop.gql";

const AppNavigationLinks = () =>
  import("~/components/navigation/AppNavigationLinks");

export default {
  components: {
    appNavigation: AppNavigationLinks,
  },
  apollo: {
    shop: {
      client: "shopify",
      query: Shop,
    },
  },
};
</script>

<style scoped lang="scss">
.site-name-text {
  @apply .text-white .flex-shrink-0 .capitalize;
}
</style>
