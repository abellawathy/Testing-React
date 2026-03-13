import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../../states/threads/thunk';
import api from '../../utils/api';

jest.mock('../../utils/api');

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

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('should dispatch upvote action when upvote success', async () => {
    api.upVoteThread.mockResolvedValue({ status: 'success' });

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalled();
  });

  it('should dispatch downvote action when downvote success', async () => {
    api.downVoteThread.mockResolvedValue({ status: 'success' });

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalled();
  });
});
