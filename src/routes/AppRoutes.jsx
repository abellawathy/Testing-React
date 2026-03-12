import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ThreadDetailPage = lazy(() => import('../pages/ThreadDetailPage'));
const CreateThreadPage = lazy(() => import('../pages/CreateThreadPage'));
const LeaderboardPage = lazy(() => import('../pages/LeaderboardPage'));

function AppRoutes() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading page...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/threads/:id" element={<ThreadDetailPage />} />
        <Route path="/create" element={<CreateThreadPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
