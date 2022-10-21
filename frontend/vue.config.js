const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: process.env.NODE_ENV === 'production' ? 'https://cardist.azurewebsites.net' : 'http://localhost:8081/'
})
