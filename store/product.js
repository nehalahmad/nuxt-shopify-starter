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
  SET_PRODUCT(state, product) {
    state.product = { ...product };
    state.loading = false;
  },
  SET_PRODUCT_OPTIONS(state, { key, value }) {
    Vue.set(state.selectedProductOptions, key, value);
  },
  HYDRATE_PRODUCT_OPTIONS(state) {
    // When using the nuxt-link tags, vuex store is persisted across
    // page loads.  We need to clear it first.
    state.selectedProductOptions = {};

    // Load variant.selectedOptions
    let variant = state.product.variants[0];

    variant.selectedOptions.forEach(field => {
      Vue.set(state.selectedProductOptions, field.name, field.value);
    });
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.loading = false;
  },
};

export const actions = {
  async FETCH_PRODUCT_BY_HANDLE({ commit }, handle) {
    try {
      commit("SET_LOADING", true);

      let client = this.app.apolloProvider.clients.shopify;

      const response = await client.query({
        query: ProductByHandle,
        variables: {
          handle,
        },
      });
      if (response.networkStatus === 7) {
        commit("SET_PRODUCT", response.data.productByHandle);
        commit("HYDRATE_PRODUCT_OPTIONS");
      }
    } catch (err) {
      commit("SET_ERROR", err);
    }
  },
};

export const getters = {
  product: state => state.product,
  selectedVariant: state =>
    getSelectedVariant(state.product.variants, state.selectedProductOptions),
};
