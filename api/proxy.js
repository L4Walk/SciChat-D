{/*
const fetch = require('node-fetch');

module.exports = async(req, res) => {
    const targetUrl = 'http://47.113.149.222:8080/chat/pub_chat/createAccountByEmail';

     // 在这里进行请求转发
    const response = await fetch(targetUrl, {
        method: req.method,
        headers: req.headers,
        body: req.body
    });

     // 返回目标服务器的响应
    res.status(response.status).send(await response.text());
}
*/}

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = ''

  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  if (req.url.startsWith('/chat')) {
    target = 'http://47.113.149.222:8080/chat/pub_chat/createAccountByEmail'
  }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      //'^/backend/': '/'
    }
  })(req, res)
}

