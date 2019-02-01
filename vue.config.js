module.exports = {
    publicPath: process.env.NODE_ENV === 'test'
      ? '/build/'
      : '/',
      publicPath: process.env.NODE_ENV === 'production'
      ? '/CampusBuddy/'
      : '/'
  } 