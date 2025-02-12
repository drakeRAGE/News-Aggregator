const rateLimit = require('express-rate-limit');

// Apply rate-limiting to routes
const createLimiter = (timeWindow, maxRequests) => {
  return rateLimit({
    windowMs: timeWindow, // e.g., 15 minutes
    max: maxRequests,     // e.g., 100 requests
    message: 'Too many requests, please try again later.',
  });
};

module.exports = createLimiter;
