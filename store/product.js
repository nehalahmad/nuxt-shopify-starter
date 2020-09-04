import Vue from "vue";
import { getSelectedVariant } from "~/utils/product";

import { ProductByHandle } from "~/gql/queries/Product.gql";

export const state = () => ({
  loading: false,
  products: [],
  product: {},
  selectedProductOptions: {},
});

export const mutations = {
  setProduct(state, product) {
    state.product = { ...product };
    state.loading = false;
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
  setLoading(state, loading) {
    state.loading = loading;
  },
  setError(state, error) {
    state.error = error;
    state.loading = false;
  },
};

export const actions = {
  async fetchProductByHandle({ commit }, handle) {
    try {
      commit("setLoading", true);

      let client = this.app.apolloProvider.clients.shopify;

      const response = await client.query({
        query: ProductByHandle,
        variables: {
          handle,
        },
      });
      if (response.networkStatus === 7) {
        commit("setProduct", response.data.productByHandle);
        commit("hydrateProductOptions");
      }
    } catch (err) {
      commit("setError", err);
    }
  },
};

export const getters = {
  product: (state) => state.product,
  selectedVariant: (state) =>
    getSelectedVariant(state.product.variants, state.selectedProductOptions),
};
