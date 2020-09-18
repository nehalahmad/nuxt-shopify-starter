<template>
  <prismic-rich-text class="homepage-header-title" :field="field" />
</template>

<script>
export default {
  props: { field: { type: Array, default: () => {} } },
};
</script>
