import { cmsURL } from "./utils/constants";

export default defineNuxtConfig({
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/strapi"],
  router: {
    options: {
      linkActiveClass: "active",
    },
  },
  ssr: false,
  strapi: {
    url: cmsURL,
    prefix: "/api",
    version: "v4",
  },
  target: "static",
});
