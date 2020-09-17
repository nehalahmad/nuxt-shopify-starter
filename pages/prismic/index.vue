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
        <div
          v-if="slice.slice_type === 'cta_banner'"
          class="homepage-slice-wrapper"
        >
          <cta-banner :slice="slice" />
        </div>
        <div
          v-if="slice.slice_type === 'featured_items'"
          class="homepage-slice-wrapper"
        >
          <products-grid :slice="slice" />
        </div>
        <div
          v-if="slice.slice_type === 'big_bullet_item'"
          class="homepage-slice-wrapper"
        >
          <numeroted-items :slice="slice" />
        </div>
        <div
          v-if="slice.slice_type === 'separator'"
          class="homepage-slice-wrapper"
        >
          <separator />
        </div>
        <div
          v-if="slice.slice_type === 'text_block'"
          class="homepage-slice-wrapper"
        >
          <text-block :slice="slice" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsGrid from "~/components/slices/ProductsGrid.vue";
import CtaBanner from "~/components/slices/CtaBanner.vue";
import NumerotedItems from "~/components/slices/NumerotedItems.vue";
import TextBlock from "~/components/slices/TextBlock.vue";

const graphQuery = `
{
  homepage {
    ...homepageFields
    body {
      ... on text_block {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on separator {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on cta_banner {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on big_bullet_item {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          ...repeatFields
        }
      }
      ... on featured_items {
        non-repeat {
          ...non-repeatFields
        }
        repeat {
          link_to_product {
            product_image
            product_name
            sub_title
          }
        }
      }
    }
  }
}
`;

// import { blogDto } from "~/models/models";

export default {
  components: {
    ProductsGrid,
    CtaBanner,
    NumerotedItems,
    TextBlock,
  },
  data: () => ({}),
  async asyncData({ $prismic }) {
    const home = await $prismic.api.getSingle("homepage", { graphQuery });
    console.log("[index]: line #68");
    console.log(home);
    return { home };
  },
};
</script>
