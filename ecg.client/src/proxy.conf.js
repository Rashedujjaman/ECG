const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7261';

const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "https://localhost:7261",
    //target: "http://comfortgreentyre.com.my:3306",
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
