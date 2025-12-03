const express = require('express');
const path = require('path');
require('dotenv').config();

// 보안 미들웨어 import
const {
    securityHeaders,
    cors,
    apiLimiter,
    sanitizeInput,
} = require('../middleware/security');

const app = express();

// 보안 미들웨어 적용
app.use(securityHeaders);
app.use(cors());
app.use(apiLimiter); // Rate limiting

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput); // 입력 검증

// 정적 파일 제공 - 옷 이미지
// Vercel에서는 상대 경로로 조정
const imgPath = path.join(__dirname, '..', 'backend', 'img');
app.use('/api/images', express.static(imgPath));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'WeatherWear API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Welcome endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to WeatherWear API',
        version: '1.0.0',
        endpoints: [
            '/api/health',
            '/api/weather/city/:city',
            '/api/weather/coords',
            '/api/weather/korea',
            '/api/weather/weekly/coords',
            '/api/weather/weekly/:city'
        ]
    });
});

// Weather API routes
const weatherRoutes = require('../backend/routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    // CORS 에러 처리
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            error: 'CORS Error',
            message: 'This origin is not allowed to access this resource.'
        });
    }

    // 일반 에러 처리
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production'
            ? 'Something went wrong!'
            : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path
    });
});

// Vercel Serverless Function export
module.exports = app;
