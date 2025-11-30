import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/topics";

  async function submit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      nav(from);
    } catch {}
  }

  return (
    <div className="px-4 py-10 bg-gray-50 min-h-[60vh] flex justify-center">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full 
          md:max-w-lg 
          md:bg-white 
          md:border 
          md:border-gray-200 
          md:rounded-2xl 
          md:shadow-xl 
          md:p-10 
          p-0
        "
      >
        {/* Header */}
        <div className="text-center mb-8 px-2">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-1">
            Log in to continue exploring AI concepts
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6 px-2 md:px-0">

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="
                w-full mt-1 p-3 border rounded-xl 
                focus:ring-2 focus:ring-blue-500 outline-none
              "
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="
                w-full mt-1 p-3 border rounded-xl
                focus:ring-2 focus:ring-blue-500 outline-none
              "
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="
              w-full py-3 text-white font-semibold rounded-xl
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:opacity-90 transition
            "
          >
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
