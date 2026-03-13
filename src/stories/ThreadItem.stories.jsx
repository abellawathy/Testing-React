import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThreadItem from '../components/ThreadItem';
import authReducer from '../states/auth/reducer';
import threadsReducer from '../states/threads/reducer';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => {
      const store = configureStore({
        reducer: {
          authUser: authReducer,
          threads: threadsReducer,
        },
      });

      return (
        <Provider store={store}>
          <div className="p-8 bg-gray-100 min-h-screen">
            <Story />
          </div>
        </Provider>
      );
    },
  ],
};

export const Default = {
  args: {
    thread: {
      id: 'thread-1',
      title: 'Contoh Thread',
      body: 'Ini adalah contoh thread lengkap dengan konten.',
      createdAt: '2026-03-13T22:00:00Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/32',
      },
      category: 'general',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 5,
    },
    preview: false,
  },
};

export const PreviewMode = {
  args: {
    ...Default.args,
    preview: true,
  },
};
