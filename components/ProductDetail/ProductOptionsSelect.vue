<template>
  <div class="py-2">
    <label :for="name">{{ name }}</label>
    <select
      :id="name"
      v-model="selectedOption"
      class="form-select w-full"
      @change="changeOption"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import productOptions from "~/mixins/productOptions";

export default {
  name: "ProductOptionSelect",

  mixins: [productOptions],
};
</script>
