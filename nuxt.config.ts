// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/strapi"],
  router: {
    options: {
      linkActiveClass: "active",
    },
  },
  strapi: {
    url: "https://cms.brke.banti.hu",
    prefix: "/api",
    version: "v4",
  },
  target: "static",
});
