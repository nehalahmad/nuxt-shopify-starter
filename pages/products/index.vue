<template>
  <loading-icon v-if="$apollo.loading" />
  <div v-else>
    <h1>Product List page</h1>
    <ul class="mt-4 text-center">
      <li v-for="product in products" :key="product.node.id">
        <nuxt-link
          :to="{
            name: 'products-handle',
            params: { handle: product.node.handle },
          }"
        >
          {{ product.node.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import _get from "lodash/get";

import { Products } from "~/gql/queries/Product.gql";

export default {
  head: () => ({
    title: "This is the title of the products page.",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Lorem ipsum doler sit amet description in product listing page",
      },
    ],
  }),
  apollo: {
    products: {
      client: "shopify",
      query: Products,
      update(data) {
        return _get(data, "products.edges", []);
      },
    },
  },
};
</script>
