/**
 * This middleware function works as a navigation guards for authenticated pages
 * This auth middleware will be called automatically if mentioned in component's config
 * It is called automatically before page rendering
 */
export default function({ app, error }) {
  const hasToken = !!app.$apolloHelpers.getToken();
  if (!hasToken) {
    error({ errorCode: 403, message: "You are not allowed to see this" });
  }
}
