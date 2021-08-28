// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'vue-ecommerce',
        // URL to the GraphQL API
        url: 'https://api-gateway-ecommerce.herokuapp.com/',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }