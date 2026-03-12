import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from '../../components/ThreadItem';
import store from '../../app/store';

test('should display thread title', () => {
  const thread = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'Body',
    createdAt: new Date(),
    owner: { name: 'User' },
    upVotesBy: [],
    downVotesBy: [],
  };

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThreadItem thread={thread} />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('Test Thread')).toBeInTheDocument();
});
