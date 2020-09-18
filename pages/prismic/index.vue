<template>
  <div>
    <header class="homepage-header">
      <div class="l-wrapper">
        <cms-rich-text class="homepage-header-title" :field="home.data.title" />
      </div>
    </header>

    <section class="homepage-banner">
      <cms-image
        class="homepage-banner-image"
        :field="home.data.banner_image"
      />
      <div class="homepage-banner-box-wrapper">
        <cms-rich-text
          class="homepage-banner-box"
          :field="home.data.banner_text"
        />
      </div>
    </section>

    <div v-if="home.data.body" class="homepage-slices-wrapper">
      <div v-for="(slice, index) in home.data.body" :key="index">
        <div class="homepage-slice-wrapper">
          <component
            :is="currentComponent(slice.slice_type)"
            :slice="slice"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import map from "~/utils/prismic/component-mapper.js";

export default {
  async asyncData({ $cmsPrismic }) {
    return await $cmsPrismic.fetchHomepage();
  },
  methods: {
    currentComponent: sliceType => {
      if (map.has(sliceType)) {
        return map.get(sliceType);
      }
      return sliceType;
    },
  },
};
</script>
