import Swal from 'sweetalert2';
import api from '../../utils/api';

import {
  setThreadsActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
} from './action';

import {
  showLoadingActionCreator,
  hideLoadingActionCreator,
} from '../loading/action';

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());

    try {
      const threads = await api.getThreads();
      const users = await api.getUsers();

      const threadsWithOwner = threads.map((thread) => ({
        ...thread,
        owner: users.find((user) => user.id === thread.ownerId),
      }));

      dispatch(setThreadsActionCreator(threadsWithOwner));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }

    dispatch(hideLoadingActionCreator());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { auth, threads, threadDetail } = getState();

    if (!auth) {
      await Swal.fire({
        icon: 'warning',
        title: 'Belum Login',
        text: 'Silakan login terlebih dahulu',
      });

      window.location.href = '/login';
      return;
    }

    const thread = threads.find((t) => t.id === threadId) || threadDetail;

    if (!thread) return;

    const isUpVoted = thread.upVotesBy.includes(auth.id);

    dispatch(
      upVoteThreadActionCreator({
        threadId,
        userId: auth.id,
      })
    );

    try {
      if (isUpVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
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

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { auth, threads, threadDetail } = getState();

    if (!auth) {
      await Swal.fire({
        icon: 'warning',
        title: 'Belum Login',
        text: 'Silakan login terlebih dahulu',
      });

      window.location.href = '/login';
      return;
    }

    const thread = threads.find((t) => t.id === threadId) || threadDetail;

    if (!thread) return;

    const isDownVoted = thread.downVotesBy.includes(auth.id);

    dispatch(
      downVoteThreadActionCreator({
        threadId,
        userId: auth.id,
      })
    );

    try {
      if (isDownVoted) {
        await api.neutralVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
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

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());

    try {
      await api.createThread({ title, body, category });

      dispatch(asyncPopulateThreads());
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal membuat thread',
        text: error.message,
      });
    }

    dispatch(hideLoadingActionCreator());
  };
}

export {
  asyncPopulateThreads,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncCreateThread,
};
