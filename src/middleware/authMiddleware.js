const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    // return res.status(401).json({ message: 'Unauthorized - No token provided' });
    return next({status: 401});
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next({status: 401});
  }
};

module.exports = authMiddleware;
