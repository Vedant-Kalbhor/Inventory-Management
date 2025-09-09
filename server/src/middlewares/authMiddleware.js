const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/env');

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);//user id=payload.sub
    
    const user = await User.findById(payload.sub).select('-passwordHash');
    if (!user) return res.status(401).json({ message: 'Invalid token user' });

    req.user = user;//user authenticated , success
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', detail: err.message });
  }
}

module.exports = { authMiddleware };
