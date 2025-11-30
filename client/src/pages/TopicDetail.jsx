import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTopic, submitQuiz } from "../api/topics";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

export default function TopicDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const qc = useQueryClient();
  const { user } = useAuth();

  const { data: topic, isLoading, error } = useQuery({
    queryKey: ["topic", id],
    queryFn: () => fetchTopic(id),
    enabled: !!id,
  });

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setStep(0);
    setSelected(null);
    setAnswers({});
    setResult(null);
  }, [topic?.id]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error loading topic</div>;
  if (!topic) return <div className="text-center py-10">Topic not found</div>;

  const content = Array.isArray(topic.content) ? topic.content : [];
  const questions = Array.isArray(topic.questions) ? topic.questions : [];
  const total = questions.length;
  const isLast = step === total;
  const currentQ = questions[step - 1];

  async function handleSubmit() {
    if (!user) {
      toast.error("Login required");
      return nav("/login");
    }
    try {
      const res = await submitQuiz(id, answers);
      setResult(res);
      qc.invalidateQueries(["topics"]);
      qc.invalidateQueries(["profile"]);
    } catch {
      toast.error("Submit failed");
    }
  }

  function handleNext() {
    if (!currentQ) return;
    if (selected === null) return toast.info("Select an option");

    const qId = String(currentQ.id ?? currentQ._id);
    setAnswers(prev => ({ ...prev, [qId]: selected }));

    setSelected(null);
    setStep(s => Math.min(s + 1, total));
  }

  function handlePrev() {
    if (step <= 1) {
      setStep(0);
      setSelected(null);
      return;
    }

    const prevQ = questions[step - 2];
    const prevQid = String(prevQ.id ?? prevQ._id);
    setSelected(answers[prevQid] ?? null);

    setStep(s => Math.max(s - 1, 1));
  }

  return (
    <div className="relative w-full">

      <button
  onClick={() => nav("/topics")}
  className="absolute top-3 left-3 sm:p-3 rounded-full hover:bg-gray-200 
             active:bg-gray-300 transition z-30 sm:top-4 sm:left-4"
>
  <FiArrowLeft size={22} className="sm:size-26" />
</button>


      <div className="max-w-3xl mx-auto px-4 py-12">

        <AnimatePresence mode="wait">

          {/* -------------------- EXPLANATION SCREEN -------------------- */}
          {step === 0 && !result && (
            <motion.div
              key="explain"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <h2 className="text-3xl font-bold mb-6">{topic.title}</h2>

              <div className="space-y-6 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed sm:leading-loose">
                {content.length === 0 && (
                  <p className="text-gray-500">No content available.</p>
                )}

                {content.map((block, i) => (
                  <div key={i}>
                    {block.type === "text" && (
                      <p className="whitespace-pre-line">{block.value}</p>
                    )}

                    {block.type === "image" && (
                      <img
                        src={block.value}
                        alt=""
                        className="w-full sm:w-[70%] mx-auto rounded-xl shadow-sm my-5 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>


              {total > 0 ? (
                <button
                  onClick={() => setStep(1)}
                  className="mt-10 w-full py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition font-semibold"
                >
                  Start Quiz 🚀
                </button>
              ) : (
                <div className="text-gray-600 mt-10 text-center">
                  No quiz available for this topic.
                </div>
              )}
            </motion.div>
          )}

          {/* -------------------- QUESTION SCREEN -------------------- */}
          {!result && step > 0 && step <= total && currentQ && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-gray-600 text-sm mb-3">
                Question {step} of {total}
              </div>

              <h3 className="text-2xl font-semibold mb-6">{currentQ.text}</h3>

              <div className="flex flex-col gap-4">
                {currentQ.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(idx)}
                    className={`p-4 rounded-xl border text-left transition 
                    ${selected === idx
                        ? "bg-blue-600 text-white border-blue-700 shadow"
                        : "bg-gray-100 hover:bg-gray-200 border-gray-300"
                      }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  className={`px-5 py-2 rounded-lg border font-medium 
                  ${step <= 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  ← Previous
                </button>

                {!isLast ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
                  >
                    Submit Quiz 🎉
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* -------------------- RESULT SCREEN -------------------- */}
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center px-4 mt-10"
            >
              <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-2">
                  Quiz Completed 🎉
                </h2>
                <p className="text-gray-600 mb-6">
                  Great job! Here’s how you performed:
                </p>

                <div className="bg-gray-100 rounded-xl py-5 px-6 mb-6">
                  <p className="text-5xl font-extrabold text-green-600">
                    {result.stars}
                  </p>
                  <p className="text-gray-700 font-medium text-lg mt-1">
                    out of {total}
                  </p>
                </div>

                <p className="text-lg text-gray-700 mb-6">
                  Best Score:
                  <span className="font-semibold text-gray-900"> {result.bestStars} ⭐</span>
                </p>

                <div className="h-px bg-gray-200 my-6"></div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => nav("/topics")}
                    className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Back to Topics
                  </button>

                  <button
                    onClick={() => nav("/profile")}
                    className="w-full py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          )}



        </AnimatePresence>

      </div>
    </div>
  );
}
