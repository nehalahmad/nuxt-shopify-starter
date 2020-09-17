import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";

import {
  homeContentDto,
  blogDto,
  headerDto,
  footerDto,
  buttons,
  links,
} from "../models/models";
// import { FieldsOnCorrectTypeRule } from "graphql";

const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://nagarro.cdn.prismic.io/graphql",
  }),
  cache: new InMemoryCache(),
});

const cms = {
  async fetchObj() {
    let obj = await client.query({
      query: gql`
        query {
          allHomepagecontents {
            edges {
              node {
                title
                body
                price
                image
              }
            }
          }
        }
      `,
    });
    let temp = obj.data.allHomepagecontents.edges[0].node;
    obj = JSON.parse(JSON.stringify(homeContentDto));
    obj.title = temp.title[0].text;
    obj.body = temp.body[0].text;
    obj.price = temp.price[0].text;
    obj.image.url = temp.image.url;
    obj.image.alt = temp.title[0].text;
    return obj;
  },

  async fetchHomepage() {
    let obj = await client.query({
      query: gql`
        query {
          allCommonComponentss {
            edges {
              node {
                title
                body
                price
                image
              }
            }
          }
        }
      `,
    });
    let temp = obj.data.allHomepagecontents.edges[0].node;
    console.log(temp);
    // obj = JSON.parse(JSON.stringify(homeContentDto));
    // obj.title = temp.title[0].text;
    // obj.body = temp.body[0].text;
    // obj.price = temp.price[0].text;
    // obj.image.url = temp.image.url;
    // obj.image.alt = temp.title[0].text;
    // return obj;
  },

  async fetchHeader() {
    let res = await client.query({
      query: gql`
        query {
          allHeaders {
            edges {
              node {
                title
                homepage
                blogs
                logo
              }
            }
          }
        }
      `,
    });
    res = res.data.allHeaders.edges[0].node;
    let header = JSON.parse(JSON.stringify(headerDto));
    header.title = res.title[0].text;
    header.logo.url = res.logo.url;
    header.logo.alt = res.logo.alt;
    let button = { ...buttons };
    button.text = "Homepage";
    button.route = res.homepage;
    header.buttons.push(button);
    button = { ...buttons };
    button.text = "Blogs";
    button.route = res.blogs;
    header.buttons.push(button);
    return header;
  },

  async fetchFooter() {
    let res = await client.query({
      query: gql`
        query {
          allFooters {
            edges {
              node {
                title
                twitter {
                  ... on _ExternalLink {
                    url
                  }
                }
                facebook {
                  ... on _ExternalLink {
                    url
                  }
                }
                instagram {
                  ... on _ExternalLink {
                    url
                  }
                }
                linkedin {
                  ... on _ExternalLink {
                    url
                  }
                }
              }
            }
          }
        }
      `,
    });
    res = res.data.allFooters.edges[0].node;
    let footer = JSON.parse(JSON.stringify(footerDto));
    footer.title = res.title[0].text;
    let link = { ...links };
    link.text = "Linkedin";
    link.url = res.linkedin.url;
    footer.links.push(link);
    link = { ...links };
    link.text = "Instagram";
    link.url = res.instagram.url;
    footer.links.push(link);
    link = { ...links };
    link.text = "Twitter";
    link.url = res.twitter.url;
    footer.links.push(link);
    link = { ...links };
    link.text = "Facebook";
    link.url = res.facebook.url;
    footer.links.push(link);
    return footer;
  },

  async fetchBlogs() {
    const blogs = await client.query({
      query: gql`
        query {
          allBlog1s {
            edges {
              node {
                title
                body
                image
              }
            }
          }
        }
      `,
    });
    return blogs.data.allBlog1s.edges.map(({ node }) => {
      const b = JSON.parse(JSON.stringify(blogDto));
      b.title = node.title[0].text;
      b.body = node.body[0].text;
      b.image.url = node.image.url;
      return b;
    });
  },
};

export default cms;
