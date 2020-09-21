import bodyParser from "body-parser";

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        href: "https://fonts.googleapis.com/css?family=PT+Mono",
        rel: "stylesheet",
      },
    ],
  },
  components: [{ path: "~/components/Global/" }],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/scss/reset.scss",
    "~/assets/scss/main.scss",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/bus", // register event bus for cross component communication
    "~/plugins/global-component-loader" /* script to register all global components */,
    "~/plugins/cms-prismic" /* register cms prismic plugin  */,
    "~/plugins/global-filters" /* register cms prismic plugin  */,
    { src: "~/plugins/google-gtag.client", mode: "client" },
  ],
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/,
        });
      }
    },
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "~/modules/crawler",
    "~/modules/static",
    "@nuxtjs/tailwindcss",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo",
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["shopify"],
        mode: "debug",
      },
    ],
    "@nuxtjs/prismic",
  ],
  /*
   ** Apollo options. Used for Graph QL queries
   ** See: https://www.apollographql.com/docs/link/links/http.html#options
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HTTP_END_POINT,
        httpLinkOptions: {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.SHOPIFY_ACCESS_TOKEN,
            Accept: "application/json",
          },
        },
        persist: false,
      },
      shopify: {
        httpEndpoint: process.env.HTTP_END_POINT,
        httpLinkOptions: {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.SHOPIFY_ACCESS_TOKEN,
          },
        },
        persisting: false,
      },
    },
  },
  prismic: {
    // endpoint: "https://nagarro.cdn.prismic.io/api/v2",
    // htmlSerializer: "~/plugins/html-serializer",
    endpoint: "https://prismic-vuejs-showcase.prismic.io/api/v2",
    linkResolver: "~/plugins/link-resolver",
    htmlSerializer: "~/plugins/html-serializer",
    // preview: "/preview/", // because we use nuxt generate
  },
  pageTransition: { name: "fade", mode: "out-in" },
  serverMiddleware: [bodyParser.json(), "@api"],
  /*
   ** Customize router
   */
  router: {
    linkExactActiveClass: "exact-active-link",
    linkActiveClass: "active-link",
    extendRoutes(routes, resolve) {
      routes.push({
        path: "*",
        component: resolve(__dirname, "pages/index.vue"),
      });
    },
  },
};
