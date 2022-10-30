export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath.startsWith("/#!")) {
    return navigateTo({ path: to.fullPath.slice(3) });
  }
});
