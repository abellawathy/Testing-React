import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import ThreadSkeleton from '../components/ThreadSkeleton';
import { asyncPopulateThreads } from '../states/threads/thunk';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const loading = useSelector((state) => state.loading);

  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateThreads());
  }, [dispatch]);

  const categories = useMemo(
    () => [...new Set(threads.map((thread) => thread.category))],
    [threads]
  );

  const filteredThreads = category
    ? threads.filter((thread) => thread.category === category)
    : threads;

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <h2 className="text-2xl text-primary font-bold mb-4">Forum Threads</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setCategory('')}
          className={`px-3 py-1 rounded-full border ${
            category === '' ? 'bg-primary text-white' : 'bg-white'
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-full border ${
              category === cat ? 'bg-primary text-white' : 'bg-white'
            }`}
          >
            #{cat}
          </button>
        ))}
      </div>

      {loading ? (
        ['s1', 's2', 's3'].map((id) => <ThreadSkeleton key={id} />)
      ) : (
        <ThreadList threads={filteredThreads} />
      )}
    </div>
  );
}

export default HomePage;
