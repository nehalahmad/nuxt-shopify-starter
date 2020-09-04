import Vue from "vue";
import { getSelectedVariant } from "~/utils/product";

import { ProductByHandle } from "~/gql/queries/Product.gql";

export const state = () => ({
  products: [],
  product: {},
  selectedProductOptions: {},
});

export const mutations = {
  setProduct(state, product) {
    state.product = { ...product };
  },

  setProductOptions(state, { key, value }) {
    Vue.set(state.selectedProductOptions, key, value);
  },

  hydrateProductOptions(state) {
    // When using the nuxt-link tags, vuex store is persisted across
    // page loads.  We need to clear it first.
    state.selectedProductOptions = {};

    // Load variant.selectedOptions
    let variant = state.product.variants[0];

    variant.selectedOptions.forEach((field) => {
      Vue.set(state.selectedProductOptions, field.name, field.value);
    });
  },
};

export const actions = {
  getProductByHandle({ commit }, handle) {},
};

export const getters = {
  product: (state) => state.product,

  selectedVariant: (state) =>
    getSelectedVariant(state.product.variants, state.selectedProductOptions),
};
