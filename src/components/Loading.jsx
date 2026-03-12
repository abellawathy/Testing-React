import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

function Loading() {
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (loading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [loading]);

  return null;
}

export default Loading;
