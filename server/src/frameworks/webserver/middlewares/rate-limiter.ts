import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many attempts. Please try again later.',
  });

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // maximum requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    keyGenerator: (req) => {
      const xRealIp = req.headers['x-real-ip'];
      return xRealIp ? String(xRealIp) : req.ip;
    }
  });