import React, { createContext, useContext, useEffect, useState } from 'react';
import { saveAuth, getUserFromStorage, logout as storageLogout } from '../api/authClient';
import { loginApi, signupApi } from '../api/auth';
import api from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserFromStorage());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // no-op: axios adds token via authClient getToken
  }, []);

  async function login(email, password) {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      saveAuth(data.token, data.user);
      setUser(data.user);
      toast.success('Logged in');
      return data.user;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function signup(email, password) {
    setLoading(true);
    try {
      const data = await signupApi(email, password);
      saveAuth(data.token, data.user);
      setUser(data.user);
      toast.success('Account created');
      return data.user;
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    storageLogout();
    setUser(null);
    toast.info('Logged out');
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
