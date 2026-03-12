import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import CommentItem from '../../components/CommentItem';
import store from '../../app/store';

test('should render comment content', () => {
  const comment = {
    id: 'comment-1',
    content: 'Test comment',
    owner: { name: 'User' },
    createdAt: new Date(),
    upVotesBy: [],
    downVotesBy: [],
  };

  render(
    <Provider store={store}>
      <CommentItem comment={comment} />
    </Provider>
  );

  expect(screen.getByText('Test comment')).toBeInTheDocument();
});

test('should render owner name', () => {
  const comment = {
    id: 'comment-1',
    content: 'Test comment',
    owner: { name: 'Dicoding User' },
    createdAt: new Date(),
    upVotesBy: [],
    downVotesBy: [],
  };

  render(
    <Provider store={store}>
      <CommentItem comment={comment} />
    </Provider>
  );

  expect(screen.getByText('Dicoding User')).toBeInTheDocument();
});
