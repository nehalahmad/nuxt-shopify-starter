<template>
  <div class="flex">
    <nuxt-link
      v-if="$i18n.locale !== 'en'"
      :to="switchLocalePath('en')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
    >
      English
    </nuxt-link>

    <nuxt-link
      v-if="$i18n.locale !== 'es'"
      :to="switchLocalePath('es')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
    >
      Español
    </nuxt-link>
    <nuxt-link
      :to="localePath('/')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
      exact
    >
      Home
    </nuxt-link>
    <nuxt-link
      :to="localePath('/shop')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
      exact
    >
      Shop
    </nuxt-link>
    <nuxt-link
      :to="localePath('/products')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
      exact
    >
      Products
    </nuxt-link>
    <nuxt-link
      :to="localePath('/collections')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
      exact
    >
      Collections
    </nuxt-link>
    <nuxt-link
      :to="localePath('/articles')"
      class="ml-4 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
      exact
    >
      Blog
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},

  data() {
    return {};
  },

  computed: {},

  methods: {},
};
</script>
