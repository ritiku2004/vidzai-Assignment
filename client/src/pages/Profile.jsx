import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/profile";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Profile() {
  const { logout } = useAuth();

  const { data: p, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return <div className="p-10 text-center">Loading profile...</div>;
  if (error) return <div className="p-10 text-center text-red-600">Error loading profile</div>;

  const completed = p.completedTopics;
  const total = p.totalTopics;
  const hasNoProgress = completed === 0;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold mb-2">Your Profile</h2>

      <div className="text-gray-700 mb-6">
        <span className="font-medium">Email:</span> {p.email}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border rounded-xl p-5 bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Total Stars</div>
          <div className="text-3xl font-bold">{p.stars}</div>
        </div>

        <div className="border rounded-xl p-5 bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Completed Topics</div>
          <div className="text-3xl font-bold">{completed} / {total}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 font-semibold text-gray-700">Progress</div>
        <ProgressBar completedCount={completed} total={total} />
      </div>

      {/* Breakdown */}
      <h3 className="font-semibold text-lg mb-3">Topic Breakdown</h3>

      {hasNoProgress ? (
        <div className="p-5 bg-gray-50 border rounded-xl text-center text-gray-600">
          ⭐ You haven’t completed any topics yet.  
          <br />
          Start learning from the <Link to="/topics" className="font-semibold text-blue-600">Topics</Link> page!
        </div>
      ) : (
        <ul className="space-y-2">
          {p.topicsBreakdown?.map((t) => (
            <li
              key={t.topicId}
              className="p-4 rounded-xl border bg-gray-50 flex justify-between hover:bg-gray-100 transition"
            >
              <span>{t.title}</span>
              <span className="font-semibold text-yellow-600">{t.stars} ⭐</span>
            </li>
          ))}
        </ul>
      )}

      {/* Logout Button */}
      <div className="flex justify-end mt-10">
        <button
          onClick={logout}
          className="
            px-5 py-2
            rounded-full
            bg-gradient-to-r from-red-500 to-red-600
            text-white
            font-medium
            shadow-md
            hover:shadow-lg hover:scale-[1.03]
            transition-all duration-200
          "
        >
          Logout
        </button>
      </div>

    </div>
  );
}
