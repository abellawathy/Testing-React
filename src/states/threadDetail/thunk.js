import Swal from 'sweetalert2';
import api from '../../utils/api';
import {
  setThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
} from './action';

import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loading/action';

function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());

    try {
      const thread = await api.getThreadDetail(id);

      dispatch(setThreadDetailActionCreator(thread));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal memuat thread',
        text: error.message,
      });
    }

    dispatch(hideLoadingActionCreator());
  };
}

function asyncClearThreadDetail() {
  return (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      await api.createComment({ threadId, content });

      dispatch(asyncReceiveThreadDetail(threadId));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal membuat komentar',
        text: error.message,
      });
    }
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { auth, threadDetail } = getState();

    const comment = threadDetail.comments.find((c) => c.id === commentId);

    const isUpVoted = comment.upVotesBy.includes(auth.id);

    dispatch(
      upVoteCommentActionCreator({
        commentId,
        userId: auth.id,
      })
    );

    try {
      if (isUpVoted) {
        await api.neutralVoteComment(threadId, commentId);
      } else {
        await api.upVoteComment(threadId, commentId);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Vote gagal',
        text: error.message,
      });
    }
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { auth, threadDetail } = getState();

    const comment = threadDetail.comments.find((c) => c.id === commentId);

    const isDownVoted = comment.downVotesBy.includes(auth.id);

    dispatch(
      downVoteCommentActionCreator({
        commentId,
        userId: auth.id,
      })
    );

    try {
      if (isDownVoted) {
        await api.neutralVoteComment(threadId, commentId);
      } else {
        await api.downVoteComment(threadId, commentId);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Dislike gagal',
        text: error.message,
      });
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncClearThreadDetail,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
};
