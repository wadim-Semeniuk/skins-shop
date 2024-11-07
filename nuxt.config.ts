// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'CS:GO Skins Store',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap',
        },
      ],
      meta: [
        { name: 'description', content: 'Sell CS:GO skins easily' },
      ],
    },
  },

  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})
