// eslint-disable-next-line @typescript-eslint/no-var-requires
const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/user', {
      target: 'https://api.github.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/repos', {
      target: 'https://api.github.com',
      changeOrigin: true,
    })
  );
};
