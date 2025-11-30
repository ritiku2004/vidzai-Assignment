const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'please-change';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

async function signup(email, password) {
  if (!email || !password) throw { status: 400, message: 'Email and password required' };
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'Email already registered' };

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash: hash });
  await user.save();

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user: { id: user._id, email: user.email } };
}

async function login(email, password) {
  if (!email || !password) throw { status: 400, message: 'Email and password required' };
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: 'Invalid credentials' };

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw { status: 401, message: 'Invalid credentials' };

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { token, user: { id: user._id, email: user.email } };
}

module.exports = { signup, login };
