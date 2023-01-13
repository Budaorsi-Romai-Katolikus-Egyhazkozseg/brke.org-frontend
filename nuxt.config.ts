import { cmsURL } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss', 'bootstrap-icons/font/bootstrap-icons.css'],
  modules: ['@nuxtjs/strapi'],
  router: { options: { linkActiveClass: 'active' } },
  ssr: false,
  strapi: { url: cmsURL },
})
