const jwt = require('jsonwebtoken');

// Authentication middleware 
const authMiddleware = (req, res, next) => {
  console.log("Token verification in progress...");

  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode the token and attach user data to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Allow the request to proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
