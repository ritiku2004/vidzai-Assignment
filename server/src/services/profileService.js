const Topic = require('../models/Topic');

async function getProfile(user) {
  // topicsBreakdown: [{ topicId, title, stars }]
  // we need to fetch titles for topics referenced
  const topicIds = (user.completed || []).map(c => c.topicId);
  const topics = await Topic.find({ _id: { $in: topicIds } }).lean();

  const titleMap = {};
  topics.forEach(t => { titleMap[String(t._id)] = t.title; });

  const topicsBreakdown = (user.completed || []).map(c => ({
    topicId: c.topicId,
    title: titleMap[String(c.topicId)] || null,
    stars: c.stars,
  }));

  return {
    email: user.email,
    stars: user.totalStars(),
    completedTopics: user.completedCount(),
    topicsBreakdown,
    totalTopics: await Topic.countDocuments(),
  };
}

module.exports = { getProfile };
