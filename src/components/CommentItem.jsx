import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
} from '../states/threadDetail/thunk';

function CommentItem({ comment, threadId }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const createdAt = new Date(comment.createdAt).toLocaleString();

  const isUpVoted = auth && comment.upVotesBy?.includes(auth.id);
  const isDownVoted = auth && comment.downVotesBy?.includes(auth.id);

  const onUpVote = () =>
    dispatch(asyncUpVoteComment({ threadId, commentId: comment.id }));

  const onDownVote = () =>
    dispatch(asyncDownVoteComment({ threadId, commentId: comment.id }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        {comment.owner?.avatar && (
          <img
            src={comment.owner.avatar}
            alt={comment.owner.name}
            className="w-8 h-8 rounded-full"
          />
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {comment.owner?.name || 'Anonymous'}
          </span>

          <span className="text-xs text-gray-500">{createdAt}</span>
        </div>
      </div>

      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />

      <div className="flex gap-4 mt-3">
        <button
          type="button"
          onClick={onUpVote}
          className={`flex items-center gap-1 ${
            isUpVoted ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <FiThumbsUp />
          {comment.upVotesBy?.length || 0}
        </button>

        <button
          type="button"
          onClick={onDownVote}
          className={`flex items-center gap-1 ${
            isDownVoted ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          <FiThumbsDown />
          {comment.downVotesBy?.length || 0}
        </button>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
