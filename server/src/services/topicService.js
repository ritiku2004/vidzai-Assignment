// services/topicService.js
const Topic = require('../models/Topic');
const mongoose = require('mongoose');

/**
 * getAll(user) - returns topic list
 * Returns: [{ id, title, image, shortText, starsEarned }]
 */
async function getAll(user) {
  const topics = await Topic.find({}, { questions: 0 }).lean();

  const completedMap = {};
  if (user && Array.isArray(user.completed)) {
    user.completed.forEach(c => {
      completedMap[String(c.topicId)] = c.stars;
    });
  }

  return topics.map(t => {
    const firstText = t.content?.find(b => b.type === "text")?.value || "No description available.";
    const shortText = firstText.length > 120 ? firstText.slice(0, 120).trim() + "..." : firstText;

    return {
      id: String(t._id),
      title: t.title,
      image: t.image || null,
      shortText,
      starsEarned: completedMap[String(t._id)] ?? 0
    };
  });
}


/**
 * getById(id) - returns full topic for detail
 * Returns: { id, title, content[], questions[] }
 */
async function getById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) throw { status: 400, message: 'Invalid topic id' };

  const topic = await Topic.findById(id).lean();
  if (!topic) throw { status: 404, message: 'Topic not found' };

  const questionsSafe = Array.isArray(topic.questions)
    ? topic.questions.map(q => ({
        id: q._id,
        text: q.text,
        options: q.options || []
      }))
    : [];

  return {
    id: String(topic._id),
    title: topic.title,
    content: Array.isArray(topic.content) ? topic.content : [],
    questions: questionsSafe
  };
}


/**
 * submitQuiz(user, topicId, answers)
 * answers = { "<questionId>": <selectedIndex> }
 * returns { stars, bestStars }
 */
async function submitQuiz(user, topicId, answers = {}) {
  if (!mongoose.Types.ObjectId.isValid(topicId)) throw { status: 400, message: 'Invalid topic id' };

  const topic = await Topic.findById(topicId);
  if (!topic) throw { status: 404, message: 'Topic not found' };

  let correct = 0;
  const correctMap = {};
  topic.questions.forEach(q => {
    correctMap[String(q._id)] = q.answer;
  });

  for (const q of topic.questions) {
    const qid = String(q._id);
    const selected = answers?.[qid];
    if (typeof selected === "number" && selected === correctMap[qid]) correct++;
  }

  const maxStars = Math.min(3, topic.questions.length || 3);
  const stars = topic.questions.length ? Math.round((correct / topic.questions.length) * maxStars) : 0;

  const existingIndex = Array.isArray(user.completed)
    ? user.completed.findIndex(c => String(c.topicId) === String(topic._id))
    : -1;

  let bestStars = stars;

  if (existingIndex >= 0) {
    const prev = user.completed[existingIndex].stars || 0;
    if (stars > prev) {
      user.completed[existingIndex].stars = stars;
      await user.save();
      bestStars = stars;
    } else {
      bestStars = prev;
    }
  } else {
    user.completed = user.completed || [];
    user.completed.push({ topicId: topic._id, stars });
    await user.save();
  }

  return { stars, bestStars };
}

module.exports = { getAll, getById, submitQuiz };
