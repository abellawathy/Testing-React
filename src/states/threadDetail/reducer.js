import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case 'UP_VOTE_THREAD':
      if (!threadDetail) return threadDetail;

      if (threadDetail.id === action.payload.threadId) {
        const isUpVoted = threadDetail.upVotesBy.includes(
          action.payload.userId
        );

        return {
          ...threadDetail,
          upVotesBy: isUpVoted
            ? threadDetail.upVotesBy.filter(
                (id) => id !== action.payload.userId
              )
            : threadDetail.upVotesBy.concat(action.payload.userId),

          downVotesBy: threadDetail.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }

      return threadDetail;

    case 'DOWN_VOTE_THREAD':
      if (!threadDetail) return threadDetail;

      if (threadDetail.id === action.payload.threadId) {
        const isDownVoted = threadDetail.downVotesBy.includes(
          action.payload.userId
        );

        return {
          ...threadDetail,
          downVotesBy: isDownVoted
            ? threadDetail.downVotesBy.filter(
                (id) => id !== action.payload.userId
              )
            : threadDetail.downVotesBy.concat(action.payload.userId),

          upVotesBy: threadDetail.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      }

      return threadDetail;

    case ActionType.UP_VOTE_COMMENT: {
      const { commentId, userId } = action.payload;

      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const isUpVoted = comment.upVotesBy.includes(userId);

          return {
            ...comment,
            upVotesBy: isUpVoted
              ? comment.upVotesBy.filter((id) => id !== userId)
              : comment.upVotesBy.concat(userId),

            downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
          };
        }),
      };
    }

    case ActionType.DOWN_VOTE_COMMENT: {
      const { commentId, userId } = action.payload;

      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const isDownVoted = comment.downVotesBy.includes(userId);

          return {
            ...comment,
            downVotesBy: isDownVoted
              ? comment.downVotesBy.filter((id) => id !== userId)
              : comment.downVotesBy.concat(userId),

            upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
          };
        }),
      };
    }

    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
