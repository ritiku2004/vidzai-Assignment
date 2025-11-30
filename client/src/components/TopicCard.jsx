import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function TopicCard({ topic }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleOpen() {
    if (!user) {
      toast.info("Please login to open this topic");
      return navigate("/login");
    }
    navigate(`/topics/${topic.id}`);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col">
      
      {topic.image && (
        <img
          src={topic.image}
          alt={topic.title}
          className="w-full h-44 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3 flex-grow">
        <h2 className="text-xl font-semibold text-gray-900">
          {topic.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {topic.shortText}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          
          <span className="text-yellow-600 font-semibold text-sm bg-yellow-100 px-2 py-1 rounded-md">
            ⭐ {topic.starsEarned}
          </span>

          <button
            onClick={handleOpen}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 
                       text-white font-medium shadow hover:shadow-md 
                       transition-all hover:scale-[1.02] active:scale-95"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
