import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiThumbsUp, FiThumbsDown, FiShare2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '../states/threads/thunk';

function ThreadItem({ thread, preview = false }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onUpVote = () => dispatch(asyncUpVoteThread(thread.id));
  const onDownVote = () => dispatch(asyncDownVoteThread(thread.id));

  const onShare = async () => {
    const url = `${window.location.origin}/threads/${thread.id}`;
    const text = encodeURIComponent(thread.title);

    if (navigator.share) {
      await navigator.share({
        title: thread.title,
        url,
      });
      return;
    }

    Swal.fire({
      title: 'Share Thread',
      width: 400,
      showConfirmButton: false,
      html: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:15px">

        <a href="https://wa.me/?text=${text}%20${url}" target="_blank"
          style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:10px;background:#25D366;color:white;text-decoration:none;font-weight:600">
          <span style="font-size:22px">📱</span>
          WhatsApp
        </a>

        <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank"
          style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:10px;background:#1DA1F2;color:white;text-decoration:none;font-weight:600">
          <span style="font-size:22px">🐦</span>
          Twitter / X
        </a>

        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank"
          style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:10px;background:#1877F2;color:white;text-decoration:none;font-weight:600">
          <span style="font-size:22px">📘</span>
          Facebook
        </a>

        <button id="copyLink"
          style="display:flex;flex-direction:column;align-items:center;padding:12px;border-radius:10px;border:none;background:#6B7280;color:white;font-weight:600;cursor:pointer">
          <span style="font-size:22px">📋</span>
          Copy Link
        </button>

      </div>
    `,
      didOpen: () => {
        document.getElementById('copyLink').onclick = async () => {
          await navigator.clipboard.writeText(url);
          Swal.fire({
            icon: 'success',
            title: 'Copied!',
            text: 'Link berhasil disalin',
            timer: 1500,
            showConfirmButton: false,
          });
        };
      },
    });
  };
  const isUpVoted = auth && thread.upVotesBy?.includes(auth.id);
  const isDownVoted = auth && thread.downVotesBy?.includes(auth.id);

  const bodyPreview = preview
    ? `${thread.body.replace(/<[^>]+>/g, '').slice(0, 100)}...`
    : thread.body;

  const createdAt = new Date(thread.createdAt).toLocaleString();

  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-md border border-secondary">
      <div className="flex items-center mb-2 gap-2">
        {thread.owner?.avatar && (
          <img
            src={thread.owner.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="font-semibold">
          {thread.owner?.name || 'Anonymous'}
        </span>
        <span className="text-gray-400 text-sm ml-auto">{createdAt}</span>
      </div>

      <h3 className="text-xl font-bold text-accent mb-2">
        <Link data-testid="thread-title" to={`/threads/${thread.id}`}>
          {thread.title}
        </Link>
      </h3>

      <div className="text-gray-700 mb-4">
        {preview ? (
          <>
            <p>{bodyPreview}</p>
            <Link
              to={`/threads/${thread.id}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </>
        ) : (
          <div
            /* eslint-disable react/no-danger */
            dangerouslySetInnerHTML={{ __html: thread.body }}
          />
        )}
      </div>

      {preview ? (
        <div className="text-gray-500 text-sm">
          {thread.totalComments || 0} comments
        </div>
      ) : (
        <div className="flex gap-3">
          <button
            data-testid="upvote-button"
            type="button"
            onClick={onUpVote}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg transition text-white ${
              isUpVoted ? 'bg-accent' : 'bg-primary hover:bg-accent'
            }`}
          >
            <FiThumbsUp /> {thread.upVotesBy?.length || 0}
          </button>

          <button
            data-testid="downvote-button"
            type="button"
            onClick={onDownVote}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg transition text-white ${
              isDownVoted ? 'bg-red-700' : 'bg-red-400 hover:bg-red-600'
            }`}
          >
            <FiThumbsDown /> {thread.downVotesBy?.length || 0}
          </button>

          <button
            data-testid="share-button"
            type="button"
            onClick={onShare}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-lg transition"
          >
            <FiShare2 /> Share
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(ThreadItem);
