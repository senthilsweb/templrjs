export default defineNuxtRouteMiddleware((to, from) => {
  if (!useSupabaseUser().value) {
    return navigateTo('/login');
  }
});
