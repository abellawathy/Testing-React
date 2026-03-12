import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from './components/Navbar';
import Loading from './components/Loading';
import AppRoutes from './routes/AppRoutes';

import { asyncPreloadProcess } from './states/auth/thunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Loading />
      <Navbar />
      <div className="pt-20">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
