import api from './axios';

export async function fetchProfile() {
  const res = await api.get('/profile');
  return res.data;
}
