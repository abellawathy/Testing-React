import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ThreadList from '../../components/ThreadList';
import store from '../../app/store';

test('should render list of threads', () => {
  const threads = [
    {
      id: 'thread-1',
      title: 'Thread Test',
      body: 'Isi thread',
      owner: { name: 'User' },
      category: 'general',
      createdAt: new Date().toISOString(),
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ThreadList threads={threads} />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('Thread Test')).toBeInTheDocument();
});