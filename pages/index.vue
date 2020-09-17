<template>
  <section class="home">
    <h2>Top Categories</h2>
    <ul>
      <li v-for="collection in topCollections" :key="collection.node.id">
        <h3>{{ collection.node.title }}</h3>
        <h2>{{ collection.node.description }}</h2>
        <img
          v-if="collection.node.image"
          :src="collection.node.image.originalSrc"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      topCollections: "collection/topCollections",
    }),
  },
  created() {
    this.$store.dispatch("collection/FETCH_TOP_COLLECTIONS", 4);
  },
  head: () => ({ title: "This is the title of the layout level title." }),
};
</script>
