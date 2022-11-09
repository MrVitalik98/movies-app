require('dotenv').config({ path: '.env.local'})
const webpack = require('webpack')

module.exports = {
  images: {
    domains: [
      'image.tmdb.org'
    ]
  },
  webpack5: false,
  webpack: config => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
}
