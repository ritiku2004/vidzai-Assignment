// controllers/topicController.js
const topicService = require('../services/topicService');

exports.getAll = async (req, res) => {
  try {
    const user = req.user;
    const topics = await topicService.getAll(user);
    res.json(topics);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Error fetching topics' });
  }
};

exports.getById = async (req, res) => {
  try {
    const topic = await topicService.getById(req.params.id);
    res.json(topic);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Error fetching topic' });
  }
};

exports.submit = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Auth required' });

    const topicId = req.params.id;
    const { answers } = req.body;
    const data = await topicService.submitQuiz(user, topicId, answers);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || 'Submit failed' });
  }
};
