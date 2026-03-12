const ActionType = {
  SET_THREADS: 'SET_THREADS',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
};

function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export {
  ActionType,
  setThreadsActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
};
