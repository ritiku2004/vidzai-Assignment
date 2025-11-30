import api from './axios';

export async function signupApi(email, password) {
  const res = await api.post('/auth/signup', { email, password });
  return res.data;
}

export async function loginApi(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}
