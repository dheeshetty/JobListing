
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware for user authorization
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the JWT token and decode user information
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid' });
  }
};

module.exports = authMiddleware;
