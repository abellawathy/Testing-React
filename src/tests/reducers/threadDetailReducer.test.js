import threadDetailReducer from '../../states/threadDetail/reducer';
import { ActionType } from '../../states/threadDetail/action';

describe('threadDetailReducer', () => {
  const mockThread = {
    id: 'thread-1',
    title: 'Test Thread',
    body: 'Thread content',
    upVotesBy: [],
    downVotesBy: [],
    comments: [{ id: 'comment-1', upVotesBy: [], downVotesBy: [] }],
  };

  it('should return initial state (null) when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should set thread detail correctly when SET_THREAD_DETAIL', () => {
    const action = {
      type: ActionType.SET_THREAD_DETAIL,
      payload: { threadDetail: mockThread },
    };

    const nextState = threadDetailReducer(null, action);
    expect(nextState).toEqual(mockThread);
  });

  it('should clear thread detail when CLEAR_THREAD_DETAIL', () => {
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(mockThread, action);
    expect(nextState).toBeNull();
  });

  it('should handle UP_VOTE_THREAD correctly (add vote)', () => {
    const stateWithVotes = {
      ...mockThread,
      upVotesBy: [],
      downVotesBy: ['user-2'],
    };

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadDetailReducer(stateWithVotes, action);
    expect(nextState.upVotesBy).toContain('user-1');
    expect(nextState.downVotesBy).not.toContain('user-1');
  });

  it('should handle DOWN_VOTE_THREAD correctly (remove upvote, add downvote)', () => {
    const stateWithVotes = {
      ...mockThread,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: { threadId: 'thread-1', userId: 'user-1' },
    };

    const nextState = threadDetailReducer(stateWithVotes, action);
    expect(nextState.downVotesBy).toContain('user-1');
    expect(nextState.upVotesBy).not.toContain('user-1');
  });

  it('should handle UP_VOTE_COMMENT correctly', () => {
    const stateWithCommentVote = {
      ...mockThread,
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: ['user-2'],
        },
      ],
    };

    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const nextState = threadDetailReducer(stateWithCommentVote, action);
    expect(nextState.comments[0].upVotesBy).toContain('user-1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-1');
  });
});
