<template>
  <div>
    <header class="homepage-header">
      <div class="l-wrapper">
        <prismic-rich-text
          class="homepage-header-title"
          :field="home.data.title"
        />
      </div>
    </header>

    <section class="homepage-banner">
      <prismic-image
        class="homepage-banner-image"
        :field="home.data.banner_image"
      />
      <div class="homepage-banner-box-wrapper">
        <prismic-rich-text
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
export default {
  async asyncData({ $cmsPrismic }) {
    return await $cmsPrismic.fetchHomepage();
  },
  methods: {
    currentComponent: sliceType => {
      if (sliceType === "cta_banner") {
        return "cta-banner";
      } else if (sliceType === "featured_items") {
        return "products-grid";
      } else if (sliceType === "big_bullet_item") {
        return "numeroted-items";
      } else if (sliceType === "text_block") {
        return "text-block";
      }
      return sliceType;
    },
  },
};
</script>
