import React from 'react';

export default function ProgressBar({ completedCount, total }) {
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-3">
        <div className="h-3 rounded bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
