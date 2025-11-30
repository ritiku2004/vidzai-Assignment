const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/topics  (if token present, user attached)
router.get('/', authMiddlewareOptional, topicsController.getAll);

// GET /api/topics/:id
router.get('/:id', topicsController.getById);

// POST /api/topics/:id/submit  (requires auth)
router.post('/:id/submit', authMiddleware, topicsController.submit);

module.exports = router;

/**
 * helper: optional auth middleware (attach user if token present)
 * implemented inline to keep routes file tidy
 */
function authMiddlewareOptional(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  // reuse authMiddleware logic but without returning 401
  const jwt = require('jsonwebtoken');
  const User = require('../models/User');
  const JWT_SECRET = process.env.JWT_SECRET || 'please-change';
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
  if (!token) return next();
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    User.findById(payload.userId).then(user => {
      if (user) req.user = user;
      next();
    }).catch(() => next());
  } catch (err) {
    return next();
  }
}
