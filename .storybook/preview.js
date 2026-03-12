import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

const mockThread = {
  id: 'thread-1',
  title: 'Mock Thread',
  body: 'Ini thread mock',
  createdAt: new Date().toISOString(),
  owner: {
    id: 'user-1',
    name: 'Storybook User',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini komentar contoh',
      createdAt: new Date().toISOString(),
      owner: {
        id: 'user-1',
        name: 'Storybook User',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const store = configureStore({
  reducer: {
    auth: () => ({
      id: 'user-1',
      name: 'Storybook User',
    }),
    threads: () => [mockThread],
    threadDetail: () => mockThread,
    users: () => [],
    leaderboard: () => [],
    loading: () => false,
  },
});

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default preview;
