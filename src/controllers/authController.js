const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

/**
 * @desc Login a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - token
 */
const login = (req, res) => {
  // authentication logic here, yet to be decided
  const token = jwt.sign({ userId: 'Deepak' }, JWT_SECRET, { expiresIn: '100h' });
  res.json({ token });
};

module.exports = {
  login,
};
