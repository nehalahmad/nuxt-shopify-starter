<template lang="jade">
  div
    p {{greeting}} World!
</template>

<script>
export default {
  props: { field: { type: Array, default: () => {} } },
  data: () => ({
    greeting: "World!",
  }),
};
</script>
