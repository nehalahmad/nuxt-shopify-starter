import { Collections } from "~/gql/queries/Collection.gql";

export const state = () => ({
  topCollections: [],
  loading: false,
  error: "",
});

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
    state.loading = false;
  },
  SET_TOP_COLLECTIONS(state, collections) {
    state.topCollections = collections;
  },
};

export const actions = {
  async FETCH_TOP_COLLECTIONS({ commit }, first) {
    try {
      commit("SET_LOADING", true);

      let client = this.app.apolloProvider.clients.shopify;
      const response = await client.query({
        query: Collections,
        variables: { first },
      });

      if (response.networkStatus === 7) {
        commit("SET_TOP_COLLECTIONS", response.data.collections.edges);
      }
    } catch (err) {
      console.error(err);
      commit("SET_ERROR", err);
    }
  },
};

export const getters = {
  error: state => state.error,
  collectionLoading: state => state.loading,
  topCollections: state => state.topCollections,
};
