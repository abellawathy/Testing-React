import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../../states/threads/thunk';
import api from '../../utils/api';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../utils/api', () => ({
  upVoteThread: jest.fn(),
  downVoteThread: jest.fn(),
  neutralVoteThread: jest.fn(),
}));

delete window.location;
window.location = { href: '' };

describe('vote thread thunk', () => {
  const dispatch = jest.fn();

  const getState = () => ({
    auth: { id: 'user-1' },

    threads: [
      {
        id: 'thread-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ],

    threadDetail: null,
  });

  it('should dispatch action when upvote success', async () => {
    api.upVoteThread.mockResolvedValue();

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch action when downvote success', async () => {
    api.downVoteThread.mockResolvedValue();

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalled();
  });
});
