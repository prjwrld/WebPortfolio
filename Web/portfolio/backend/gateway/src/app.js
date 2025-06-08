const express = require('express');
const httpProxy = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());

// Service proxies
const chatServiceProxy = httpProxy.createProxyMiddleware({
  target: 'http://chat-service:3001',
  changeOrigin: true
});

const portfolioServiceProxy = httpProxy.createProxyMiddleware({
  target: 'http://portfolio-service:3002',
  changeOrigin: true
});

// Routes
app.use('/api/chat', chatServiceProxy);
app.use('/api/portfolio', portfolioServiceProxy);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});