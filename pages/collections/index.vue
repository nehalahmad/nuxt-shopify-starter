<template>
  <div>
    <h1>Collection page</h1>
    <loading-icon v-if="$apollo.loading" />
    <pre v-else>{{ JSON.stringify(collections, null, 2) }}</pre>
  </div>
</template>

<script>
import _get from "lodash/get";

import { Collections } from "~/gql/queries/Collection.gql";

export default {
  data: () => ({
    count: 20
  }),
  apollo: {
    collections: {
      client: "shopify",
      query: Collections,
      variables() {
        return { first: this.count };
      },
      update(data) {
        return _get(data, "collections.edges", []);
      }
    }
  }
};
</script>
