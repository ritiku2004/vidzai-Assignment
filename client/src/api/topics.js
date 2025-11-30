import api from './axios';

export async function fetchTopics() {
  const res = await api.get('/topics');
  return res.data;
}

export async function fetchTopic(id) {
  const res = await api.get(`/topics/${id}`);
  return res.data;
}

export async function submitQuiz(topicId, answers) {
  const res = await api.post(`/topics/${topicId}/submit`, { answers });
  return res.data;
}
