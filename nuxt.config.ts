import { cmsURL } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          defer: true,
          'data-domain': 'brke.org',
          src: 'https://analytics.brke.donko.hu/js/script.js',
        },
      ],
    },
  },
  css: ['~/assets/scss/main.scss', 'bootstrap-icons/font/bootstrap-icons.css'],
  modules: ['@nuxtjs/strapi', 'nuxt-purgecss'],
  purgecss: { enabled: false, safelist: ['collapsing'] },
  router: { options: { linkActiveClass: 'active' } },
  ssr: false,
  strapi: { url: cmsURL },
})
