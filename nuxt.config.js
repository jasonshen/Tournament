module.exports = {
  /*
  ** Env variables
  */
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    headLightApiKey: 'gGQhTbt_O9wD2lFxRdbzPw',
    headLightApi: 'https://www.headlightlabs.com/api'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'keeper',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Safeguarding Gothic City through her citizens' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/element-ui'
  ],
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
