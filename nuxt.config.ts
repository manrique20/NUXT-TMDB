// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-primevue',
    'nuxt-windicss',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      apiKey: process.env.NUXT_API_KEY,
      imgBaseUrl: process.env.NUXT_IMG_BASE_URL,
    },
    // apiKey: process.env.NUXT_API_KEY, // Solo estará disponible en el servidor
  }
})
