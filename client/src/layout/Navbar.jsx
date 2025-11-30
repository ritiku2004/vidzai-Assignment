import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const isProfilePage = location.pathname === "/profile";
  const isTopicsPage = location.pathname.startsWith("/topics");
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  return (
    <nav className="bg-white shadow-sm h-16 sticky top-0 z-50 flex items-center">
      <div className="max-w-6xl w-full mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/topics"
          className="
    font-extrabold text-2xl 
    bg-gradient-to-r from-blue-600 to-purple-600 
    bg-clip-text text-transparent 
    tracking-tight
  "
        >
          Learnify
        </Link>


        {/* ==========DESKTOP MENU =========== */}
        <div className="hidden md:flex items-center justify-end gap-8 w-40">

          {user ? (
            <>
              {isProfilePage ? (
                <Link className="hover:text-blue-600 text-lg font-medium" to="/topics">
                  Topics
                </Link>
              ) : (
                <Link className="hover:text-blue-600 flex items-center" to="/profile">
                  <FaUserCircle size={32} className="text-blue-500" />
                </Link>
              )}
            </>
          ) : (
            <>
              <Link className="hover:text-blue-600" to="/topics">Topics</Link>
              <Link className="text-blue-600" to="/login">Login</Link>
            </>
          )}
        </div>

        {/* ==========MOBILE SMART BUTTONS=========== */}
        <div className="md:hidden">

          {!user && (
            <>
              {(isLoginPage || isSignupPage) && (
                <Link to="/topics" className="text-blue-600 font-medium">
                  Topics
                </Link>
              )}

              {(!isLoginPage && !isSignupPage && isTopicsPage) && (
                <Link to="/login" className="text-blue-600 font-medium">
                  Login
                </Link>
              )}
            </>
          )}

          {user && (
            <>
              {isTopicsPage && !isProfilePage && (
                <Link to="/profile">
                  <FaUserCircle size={28} className="text-blue-500" />
                </Link>
              )}

              {isProfilePage && (
                <Link to="/topics" className="text-blue-600 font-medium">
                  Topics
                </Link>
              )}

              {(isLoginPage || isSignupPage) && (
                <Link to="/topics" className="text-blue-600 font-medium">
                  Topics
                </Link>
              )}
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
