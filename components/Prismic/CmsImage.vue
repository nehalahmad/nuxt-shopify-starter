<template>
  <prismic-image class="homepage-banner-image" :field="field" />
</template>

<script>
export default {
  props: { field: { type: Object, default: null } },
};
</script>
