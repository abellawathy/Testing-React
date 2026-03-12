import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../states/auth/reducer';
import threadsReducer from '../states/threads/reducer';
import threadDetailReducer from '../states/threadDetail/reducer';
import usersReducer from '../states/users/reducer';
import leaderboardReducer from '../states/leaderboard/reducer';
import loadingReducer from '../states/loading/reducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    loading: loadingReducer,
  },
});

export default store;
