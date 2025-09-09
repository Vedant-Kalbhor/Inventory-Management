const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret, jwtExpires } = require('../config/env');

function signToken(user) {
  const payload = { sub: user._id.toString(), role: user.role };
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpires });
}

async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email, password required' });
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const user = new User({ name, email, role });
  user.password = password; // virtual sets hash
  await user.save();

  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function profile(req, res) {
  const user = await User.findById(req.user._id).select('-passwordHash');//excludes the hashed password from the response.
  res.json({ user });
}

module.exports = { register, login, profile };
