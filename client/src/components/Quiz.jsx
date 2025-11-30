import React, { useState } from 'react';

export default function Quiz({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  function select(qid, choice) {
    setAnswers(prev => ({ ...prev, [qid]: choice }));
  }

  async function handle(e) {
    e.preventDefault();
    await onSubmit(answers);
  }

  return (
    <form onSubmit={handle} className="space-y-4">
      {questions.map((q, idx) => (
        <div key={q.id} className="p-3 border rounded bg-white">
          <div className="font-medium">{idx + 1}. {q.text}</div>
          <div className="mt-2 flex flex-col gap-2">
            {q.options.map((opt, i) => (
              <label key={i} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  checked={answers[q.id] === i}
                  onChange={() => select(q.id, i)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Quiz</button>
      </div>
    </form>
  );
}
