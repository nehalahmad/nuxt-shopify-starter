<template>
  <prismic-link class="cta-banner-link" :field="field">
    {{ $slots.default }}
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
