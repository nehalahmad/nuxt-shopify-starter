<template>
  <prismic-link class="cta-banner-link" :field="field">
    {{ content }}
  </prismic-link>
</template>

<script>
export default {
  props: {
    field: { type: Object, default: null },
    content: { type: String, default: "" },
  },
};
</script>
