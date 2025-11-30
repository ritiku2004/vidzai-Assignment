const authService = require('../services/authService');

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.signup(email, password);
  res.status(201).json(result);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json(result);
};
