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

