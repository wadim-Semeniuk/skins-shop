// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'CS2 Skins Store',
      meta: [
        { name: 'description', content: 'Buy and sell CS2 skins easily.' }
      ],
    }
  },

  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
