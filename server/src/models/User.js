const mongoose = require('mongoose');

const CompletedTopicSchema = new mongoose.Schema({
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
  stars: { type: Number, required: true, min: 0, max: 3 },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  completed: { type: [CompletedTopicSchema], default: [] },
}, { timestamps: true });

// helper: get total stars
UserSchema.methods.totalStars = function () {
  return this.completed.reduce((s, c) => s + (c.stars || 0), 0);
};

UserSchema.methods.completedCount = function () {
  return this.completed.length;
};

module.exports = mongoose.model('User', UserSchema);
