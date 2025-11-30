import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TopicsList from './pages/TopicsList';
import TopicDetail from './pages/TopicDetail';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';
import NotFound from './pages/NotFound';

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen body-bg">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/topics" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/topics" element={<TopicsList />} />
          <Route
            path="/topics/:id"
            element={
              <Protected>
                <TopicDetail />
              </Protected>
            }
          />
          <Route path="/profile" element={
            <Protected>
              <Profile />
            </Protected>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}
