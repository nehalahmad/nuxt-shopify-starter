export const BLOG_QUERY = `{
  blog_post {
    ...blog_postFields
    author {
      name
      bio
      picture
    }
  }
}`;
