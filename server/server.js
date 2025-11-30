require('dotenv').config();
require('express-async-errors'); // capture async errors
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const topicsRoutes = require('./src/routes/topicsRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/profile', profileRoutes);

// health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// error handler
app.use(errorHandler);

// start
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect DB', err);
  process.exit(1);
});
