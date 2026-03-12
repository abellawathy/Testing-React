import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import asyncReceiveLeaderboard from '../states/leaderboard/thunk';

function LeaderboardSkeleton() {
  return (
    <div className="flex items-center justify-between border p-3 rounded animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="h-4 bg-gray-300 rounded w-24" />
      </div>
      <div className="h-4 bg-gray-300 rounded w-8" />
    </div>
  );
}

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((state) => state.leaderboard);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      await dispatch(asyncReceiveLeaderboard());
      setLoading(false);
    };
    fetchLeaderboard();
  }, [dispatch]);

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h2 className="text-2xl text-primary font-bold mb-6">Leaderboard</h2>

      <div className="space-y-3 bg-white rounded-xl p-5 mb-5 shadow-md border border-secondary">
        {loading
          ? ['s1', 's2', 's3', 's4', 's5'].map((id) => (
              <LeaderboardSkeleton key={id} />
            ))
          : leaderboard.map((item) => (
              <div
                key={item.user.id}
                className="flex items-center justify-between border p-3 rounded"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.user.avatar}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span>{item.user.name}</span>
                </div>
                <b>{item.score}</b>
              </div>
            ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
