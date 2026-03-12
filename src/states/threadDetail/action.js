const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',

  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

function setThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.SET_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

export {
  ActionType,
  setThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
};
