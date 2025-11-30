import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopics } from "../api/topics";
import TopicCard from "../components/TopicCard";
import { motion } from "framer-motion";

export default function TopicsList() {
  const { data: topics = [], isLoading, error } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
  });

  // ---------- LOADING ----------
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h1
          className="
      text-3xl        /* mobile */
      sm:text-3xl     /* small tablets */
      lg:text-4xl     /* laptops/desktops */
      font-extrabold
      tracking-tight
      text-gray-900
    "
        >
          <span className="text-gray-700">
            Explore <span className="text-blue-500">AI Topics</span>
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="animate-pulse bg-white rounded-xl shadow-sm p-4 h-72 flex flex-col gap-3"
            >
              <div className="bg-gray-300 h-40 w-full rounded-lg" />
              <div className="bg-gray-300 h-5 w-2/3 rounded" />
              <div className="bg-gray-200 h-4 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-8 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Topics</h1>
        <p>Error loading topics. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="w-full text-center max-w-6xl mx-auto px-4 py-2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1
          className="
      text-3xl        /* mobile */
      sm:text-3xl     /* small tablets */
      lg:text-4xl     /* laptops/desktops */
      font-extrabold
      tracking-tight
      text-gray-900
    "
        >
          <span className="text-gray-700">
            Explore <span className="text-blue-500">AI Topics</span>
          </span>
        </h1>

        <p
          className="
      text-base     /* mobile */
      sm:text-lg    /* tablets */
      lg:text-xl    /* desktops */
      text-gray-600 
      mt-2
    "
        >
          Learn AI concepts step-by-step with simple explanations.
        </p>
      </motion.div>



      {topics.length === 0 && (
        <p className="text-gray-500">No topics found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </div>
  );
}
