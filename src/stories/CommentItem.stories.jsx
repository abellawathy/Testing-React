import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CommentItem from '../components/CommentItem';
import authReducer from '../states/auth/reducer';
import threadDetailReducer from '../states/threadDetail/reducer';

const mockStore = configureStore({
  reducer: {
    authUser: authReducer,
    threadDetail: threadDetailReducer,
  },
  preloadedState: {
    authUser: { id: 'user-1' },
    threadDetail: {
      id: 'thread-1',
      title: 'Mock Thread',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    },
  },
});

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div className="p-8 bg-gray-100">
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export const Default = {
  args: {
    comment: {
      id: 'comment-1',
      content: 'Komentar test Storybook',
      owner: { name: 'User' },
      createdAt: new Date().toISOString(),
      upVotesBy: [],
      downVotesBy: [],
    },
  },
};
