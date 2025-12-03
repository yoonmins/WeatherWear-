const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

/**
 * 보안 헤더 설정 (Helmet)
 * XSS, Clickjacking, Content Security Policy 등 보안 헤더 설정
 */
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.openweathermap.org", "https://naveropenapi.apigw.ntruss.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000, // 1년
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny', // Clickjacking 방지
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

/**
 * CORS 설정
 * 허용된 출처에서만 API 접근 가능하도록 설정
 */
const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : [];
  
  // 개발 환경에서는 localhost 허용
  if (process.env.NODE_ENV === 'development') {
    origins.push('http://localhost:3000', 'http://localhost:5000');
  }
  
  return origins;
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    
    // origin이 없는 경우 (모바일 앱, Postman 등) 허용
    if (!origin || allowedOrigins.length === 0) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24시간
};

/**
 * Rate Limiting 설정
 * DDoS 공격 및 과도한 요청 방지
 */
const createRateLimiter = (windowMs = 15 * 60 * 1000, max = 100) => {
  return rateLimit({
    windowMs, // 시간 윈도우 (기본: 15분)
    max, // 최대 요청 수 (기본: 100)
    message: {
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(windowMs / 1000),
    },
    standardHeaders: true, // RateLimit-* 헤더 반환
    legacyHeaders: false, // X-RateLimit-* 헤더 비활성화
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        message: 'You have exceeded the request limit. Please try again later.',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    },
  });
};

// API별 Rate Limit 설정
const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15분
  parseInt(process.env.RATE_LIMIT_MAX) || 100
);

const strictApiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15분
  50 // 더 엄격한 제한
);

/**
 * 입력 검증 미들웨어
 * XSS 및 SQL Injection 방지를 위한 기본 검증
 */
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      // 기본적인 XSS 방지: HTML 태그 제거
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/<[^>]+>/g, '')
                .trim();
    }
    if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach(key => {
        obj[key] = sanitize(obj[key]);
      });
    }
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  
  next();
};

module.exports = {
  securityHeaders,
  corsOptions,
  apiLimiter,
  strictApiLimiter,
  sanitizeInput,
  cors: () => cors(corsOptions),
};
