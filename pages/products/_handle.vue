<template>
  <div class="grid grid-rows-2 md:grid-rows-1 md:grid-cols-4 p-4">
    <!-- <pre>
      {{ product }}
    </pre> -->
    <div class="col-span-2 col-span-2">
      <product-gallery />
    </div>

    <div class="col-span-2">
      <div>
        <h1 class="text-4xl font-bold">
          {{ product.title }}
        </h1>
        <p>{{ product.description }}</p>
      </div>

      <product-pricing />

      <!-- <product-options :options="product.options" class="md:w-1/2" /> -->
      <add-to-cart />
    </div>
  </div>
</template>

<script>
const AddToCart = () => import("~/components/ProductDetail/AddToCartButton");
const ProductOptions = () =>
  import("~/components/ProductDetail/ProductOptions");
const ProductGallery = () =>
  import("~/components/ProductDetail/ProductGallery");
const ProductPricing = () =>
  import("~/components/ProductDetail/ProductPricing");

export default {
  name: "ProductPage",

  components: { AddToCart, ProductGallery, ProductPricing, ProductOptions },

  computed: {
    product() {
      return this.$store.getters["product/product"];
    },
    selectedVariant() {
      return this.$store.getters["product/selectedVariant"];
    }
  },

  created() {
    this.$store.dispatch(
      "product/fetchProductByHandle",
      this.$route.params.handle
    );
  }
};
</script>
