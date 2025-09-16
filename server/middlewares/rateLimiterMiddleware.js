import rateLimit from "express-rate-limit";

const rateLimiterMiddleware = ()=> rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { status: false, message: "Çok fazla istek, lütfen daha sonra tekrar deneyin." },
});

export default rateLimiterMiddleware