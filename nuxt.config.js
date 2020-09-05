const bodyParser = require("body-parser");

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
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~assets/css/tailwind.css"],
  /*
   ** Plugins to load before mounting the App
   */
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/global-component-loader.js" },
    { src: "~/plugins/google-gtag.client.js", mode: "client" }
    //{ src: "~/plugins/shopify.js", mode: "client" }
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
          exclude: /(node_modules)/
        });
      }
    }
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/tailwindcss"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo",
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["shopify"],
        mode: "debug"
      }
    ]
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
            Accept: "application/json"
          }
        },
        persist: false
      },
      shopify: {
        httpEndpoint: process.env.HTTP_END_POINT,
        httpLinkOptions: {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.SHOPIFY_ACCESS_TOKEN
          }
        },
        persisting: false
      }
    }
  },
  pageTransition: { name: "fade", mode: "out-in" },
  serverMiddleware: [bodyParser.json(), "@api"],
  /*
   ** Customize router
   */
  router: {
    linkExactActiveClass: "exact-active-link",
    linkActiveClass: "active-link"
  }
};
