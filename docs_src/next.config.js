
module.exports = {
  webpack(config) {
    // Workaround for build error caused by UglifyJs.
    // See https://github.com/zeit/next.js/issues/1253
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'UglifyJsPlugin') {
        return false;
      }
      return true;
    });
    return config;
  },
  exportPathMap() {
    return {
      '/': { page: '/' },
    };
  },
};
