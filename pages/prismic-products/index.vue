<template>
  <div>
    <separator />
    <section class="products-section">
      <div class="l-wrapper">
        <header class="products-grid-header">
          <cms-rich-text
            class="products-grid-header-title"
            :field="productsDocument.data.title"
          />
        </header>
      </div>
      <div class="products-grid-items-wrapper">
        <div
          v-for="product in productList"
          :key="product.uid"
          class="products-grid-item-wrapper"
        >
          <nuxt-link
            class="product"
            :to="{ name: 'prismic-products-uid', params: { uid: product.uid } }"
          >
            <cms-image
              class="products-grid-item-image"
              :field="product.data.product_image"
            />
            <p class="products-grid-item-name">
              {{ $prismic.asText(product.data.product_name) }}
            </p>
          </nuxt-link>
          <p class="products-grid-item-subtitle">
            {{ $prismic.asText(product.data.sub_title) }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $cmsPrismic }) {
    return await $cmsPrismic.fetchProducts();
  },
  head() {
    return {
      title: "Products",
    };
  },
};
</script>

<style lang="scss">
.products-section {
  padding: 70px 0 130px;
}
.products-grid-header {
  display: flex;
  justify-content: space-between;

  @media (max-width: 774px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.products-grid-header-title {
  max-width: 592px;
  font-family: "PT Mono", monospace;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.786;
}

.products-grid-header-button-wrapper {
  @media (min-width: 775px) {
    margin-left: 30px;
  }

  @media (max-width: 774px) {
    margin-top: 30px;
  }
}

/**
 * Items
 */

.products-grid-items-wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 1190px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1189px) {
    max-width: 792px;
  }

  @media (max-width: 791px) {
    max-width: 396px;
  }
}

.products-grid-item-wrapper {
  max-width: 366px;
  margin: 70px 15px 0;
}

.products-grid-item-image {
  width: 100%;
  max-height: 340px;
  object-fit: cover;
}

.products-grid-item-name {
  margin-top: 30px;
  color: #001000;
  font-family: "PT Mono", monospace;
  font-size: 18px;
  font-weight: 700;
  text-align: center;

  &::before {
    content: "⇥";
  }

  a {
    text-decoration: underline;
  }
}

.products-grid-item-subtitle {
  margin-top: 10px;
  color: #7f7d7c;
  text-align: center;
}
</style>
