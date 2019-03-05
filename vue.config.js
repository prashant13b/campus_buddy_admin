module.exports = {
    publicPath: process.env.NODE_ENV === 'test'
      ? '/'
      : '/',
      publicPath: process.env.NODE_ENV === 'production'
      ? '/CampusBuddy/'
      : '/'
  } 