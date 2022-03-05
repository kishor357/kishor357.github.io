const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api4', {
      target: 'https://devza.com', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/api4": "",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}