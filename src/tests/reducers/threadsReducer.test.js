import threadsReducer from '../../states/threads/reducer';
import { ActionType } from '../../states/threads/action';

describe('threadsReducer', () => {
  it('should set threads correctly', () => {
    const action = {
      type: ActionType.SET_THREADS,
      payload: {
        threads: [{ id: 'thread-1', upVotesBy: [], downVotesBy: [] }],
      },
    };

    const nextState = threadsReducer([], action);

    expect(nextState).toEqual(action.payload.threads);
  });

  it('should handle UP_VOTE_THREAD correctly', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('user-1');
  });

  it('should handle DOWN_VOTE_THREAD correctly', () => {
    const initialState = [
      { id: 'thread-1', upVotesBy: [], downVotesBy: [] },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toContain('user-1');
  });
});