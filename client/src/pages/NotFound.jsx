// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  const dots = [
    { top: "8%", left: "5%" },
    { top: "6%", left: "90%" },
    { top: "15%", left: "15%" },
    { top: "18%", left: "80%" },
    { top: "50%", left: "3%" },
    { top: "48%", left: "95%" },
    { top: "85%", left: "8%" },
    { top: "88%", left: "88%" },
  ];



  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">

      {dots.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-blue-500"
          style={{ top: pos.top, left: pos.left }}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}


      {/* 404 Heading */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-7xl sm:text-8xl font-extrabold text-gray-800 relative z-10"
      >
        404
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="text-gray-600 text-lg sm:text-xl mt-3 max-w-md text-center relative z-10"
      >
        Looks like this page wandered off. Let’s bring you back.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="mt-6 relative z-10"
      >
        <Link
          to="/topics"
          className="
            px-7 py-3 rounded-full
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-medium shadow-lg
            hover:shadow-xl hover:scale-[1.05]
            transition-all duration-300
            active:scale-95
          "
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
