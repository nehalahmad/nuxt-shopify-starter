import { HOMEPAGE_QUERY } from "~/gql/queries/prismic/Homepage.js";
import { PRODUCT_QUERY } from "~/gql/queries/prismic/Product.js";
import { BLOG_QUERY } from "~/gql/queries/prismic/Blog.js";

export default ({ app }, inject) => {
  const cms = {
    fetchHomepage: async () => {
      const home = await app.$prismic.api.getSingle("homepage", {
        graphQuery: HOMEPAGE_QUERY,
      });
      return { home };
    },
    fetchProducts: async () => {
      const productList = await app.$prismic.api.query(
        app.$prismic.predicates.at("document.type", "product"),
        { pageSize: 50 }
      );
      const productsDocument = await app.$prismic.api.getSingle("products");

      return {
        productList: productList.results,
        productsDocument,
      };
    },
    fetchProduct: async uid => {
      const product = await app.$prismic.api.getByUID("product", uid, {
        graphQuery: PRODUCT_QUERY,
      });

      return { product };
    },
    fetchBlogs: async () => {
      const posts = await app.$prismic.api.query(
        app.$prismic.predicates.at("document.type", "blog_post"),
        { pageSize: 50 }
      );
      const blogHome = await app.$prismic.api.getSingle("blog_home");

      return {
        blogHome,
        posts: posts.results,
      };
    },
    fetchBlog: async uid => {
      const blogpost = await app.$prismic.api.getByUID("blog_post", uid, {
        graphQuery: BLOG_QUERY,
      });

      return { blogpost };
    },
  };

  inject("cmsPrismic", cms);
};
