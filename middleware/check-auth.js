/**
 * This middleware function disaptch an action to reintialize application store whenever page reloads
 * This check-auth middleware will be called automatically if mentioned in component's config
 * It is called automatically before page rendering
 */
export default function(context) {
  context.store.dispatch("initAuth", context.req);
}
