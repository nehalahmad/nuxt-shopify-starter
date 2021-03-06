<template>
  <div>
    <separator />
    <div class="product-sections-wrapper">
      <section>
        <div class="l-wrapper">
          <div class="product-hero-inner">
            <cms-image
              class="product-hero-image"
              :field="product.data.product_image"
            />
            <div class="product-hero-content">
              <cms-rich-text
                class="product-hero-name"
                :field="product.data.product_name"
              />
              <cms-rich-text
                class="product-hero-rich-content"
                :field="product.data.rich_content"
              />
              <div class="product-hero-button-wrapper">
                <cms-link
                  class="a-button a-button--filled"
                  :field="product.data.button_link"
                  :content="$prismic.asText(product.data.button_label)"
                  @click.prevent="handleClickAddCart"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="product-description">
        <div class="l-wrapper">
          <cms-rich-text
            class="product-description-title"
            :field="product.data.title"
          />
          <cms-rich-text
            class="product-description-content"
            :field="product.data.product_description"
          />
        </div>
      </section>
      <div class="product-separator-wrapper">
        <separator />
      </div>
      <section>
        <div class="l-wrapper">
          <header class="products-grid-header">
            <cms-rich-text
              class="products-grid-header-title"
              :field="product.data.related_products_title"
            />
          </header>
        </div>
        <div class="products-grid-items-wrapper">
          <div
            v-for="(item, index) in product.data.related_products"
            :key="index"
            class="products-grid-item-wrapper"
          >
            <prismic-link :field="item.product1">
              <cms-image
                class="products-grid-item-image"
                :field="item.product1.data.product_image"
              />
              <p class="products-grid-item-name">
                {{ $prismic.asText(item.product1.data.product_name) }}
              </p>
            </prismic-link>
            <p class="products-grid-item-subtitle">
              {{ $prismic.asText(item.product1.data.sub_title) }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $cmsPrismic }) {
    return $cmsPrismic.fetchProduct(params.uid);
  },
  data: () => ({
    product: null,
  }),
  methods: {
    handleClickAddCart() {
      window.alert(
        "No. Not today.\nWe're integrating the GraphQL API at the moment, so coffee delivery is temporarily unavailable."
      );
    },
  },
  head() {
    return {
      title: this.$prismic.asText(this.product.data.product_name),
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.$prismic
            .asText(this.product.data.product_description)
            .substring(0, 158),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.product-sections-wrapper {
  padding: 70px 0 130px;
}

.product-separator-wrapper {
  margin: 130px 0 70px;
}

/**
 * Hero
 */

.product-hero-inner {
  display: flex;
  justify-content: space-between;

  @media (max-width: 1190px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

.product-hero-image {
  max-width: 565px;
  width: 100%;
  max-height: 565px;
  height: 100%;
  object-fit: cover;
  background-color: #f6f6f6;
}

.product-hero-content {
  max-width: 565px;
  width: 100%;

  @media (max-width: 1190px) {
    margin-top: 30px;
  }
}

.product-hero-name {
  font-family: "PT Mono", monospace;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.786;
}

.product-hero-rich-content {
  margin-top: 20px;
  font-family: "PT Mono", monospace;
  font-size: 16px;
  line-height: 2.5;

  h2 {
    &:not(:first-child) {
      margin-top: 20px;
    }

    font-size: 22px;
    font-weight: 700;
    line-height: 1.818;
  }

  p:not(:first-child) {
    margin-top: 10px;
  }

  ul {
    &:not(:first-child) {
      margin-top: 10px;
    }

    padding-left: 30px;
  }
}

.product-hero-button-wrapper {
  margin-top: 40px;
}

/**
 * Description
 */

.product-description-title {
  margin-top: 130px;
  font-family: "PT Mono", monospace;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.786;
}

.product-description-content {
  margin-top: 30px;
  font-family: "PT Mono", monospace;
  font-size: 17px;
  line-height: 2.353;

  p:not(:first-child) {
    margin-top: 20px;
  }
}

.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.active {
    .overlay {
      opacity: 1;
    }
    .popup {
      opacity: 1;
    }
  }

  .overlay {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .popup {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    position: absolute;
    z-index: 2;
    padding: 50px;
    border-radius: 3px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 50px 0;

    .head {
      background: grey;
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 40px;
    }
    .body {
      font-size: 24px;
      padding: 0 50px;
    }
  }
}
</style>
