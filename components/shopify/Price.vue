<template>
  <div :class="classes">
    <span v-if="formattedVariantPrice" class="price price-variant">
      <span v-if="formattedVariantSalePrice" class="sale">{{
        formattedVariantSalePrice
      }}</span>
      <span class="full-price">{{ formattedVariantPrice }}</span>
    </span>

    <span v-else-if="hasRange" class="price price-product price-range">
      <span class="min">{{ formattedPriceRange.min }}</span> -
      <span class="max">{{ formattedPriceRange.max }}</span>
    </span>

    <span v-else class="price price-product no-range">
      {{ formattedPriceRange.max }}
    </span>
  </div>
</template>

<script>
import { formatMoney } from "~/utils/Shopify.js";

export default {
  props: {
    priceRange: {
      type: Object,
      default: () => {},
    },
    variantPrice: {
      type: Object,
      default: () => {},
    },
    variantSalePrice: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    classes() {
      return [
        "shopify-price",
        { "on-sale": this.onSale },
        { "has-range": this.hasRange },
      ];
    },
    formattedPriceRange() {
      return {
        min: formatMoney(
          this.priceRange.minVariantPrice.amount,
          this.priceRange.minVariantPrice.currencyCode
        ),
        max: formatMoney(
          this.priceRange.maxVariantPrice.amount,
          this.priceRange.maxVariantPrice.currencyCode
        ),
      };
    },
    formattedVariantPrice() {
      let output = "";
      if (this.variantPrice) {
        output = formatMoney(
          this.variantPrice.amount,
          this.variantPrice.currencyCode
        );
      }
      return output;
    },
    formattedVariantSalePrice() {
      let output = "";
      if (this.variantSalePrice) {
        output = formatMoney(
          this.variantSalePrice.amount,
          this.variantSalePrice.currencyCode
        );
      }
      return output;
    },
    hasRange() {
      return this.formattedPriceRange.min !== this.formattedPriceRange.max;
    },
    onSale() {
      return Boolean(this.formattedVariantSalePrice);
    },
  },
};
</script>
