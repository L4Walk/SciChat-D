import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch, { Headers } from 'node-fetch';

export default async (req: VercelRequest, res: VercelResponse) => {
  const targetUrl = 'http://47.113.149.222:8080/chat/pub_chat/createAccountByEmail'; // 目标 HTTP 服务器的 URL

  try {
    const headers = { "Content-Type": "application/x-www-form-urlencoded" }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.body,
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
