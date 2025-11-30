const profileService = require('../services/profileService');

exports.getProfile = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Auth required' });
  const profile = await profileService.getProfile(user);
  res.json(profile);
};
