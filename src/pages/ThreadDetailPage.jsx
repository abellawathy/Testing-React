import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncClearThreadDetail,
  asyncCreateComment,
} from '../states/threadDetail/thunk';
import CommentItem from '../components/CommentItem';
import ThreadItem from '../components/ThreadItem';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.threadDetail);
  const loading = useSelector((state) => state.loading);
  const [content, setContent] = useState('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => dispatch(asyncClearThreadDetail());
  }, [id, dispatch]);

  const onSubmitComment = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    dispatch(
      asyncCreateComment({
        threadId: id,
        content,
      })
    );

    setContent('');
  };

  if (loading || !thread) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <ThreadItem thread={thread} preview={false} />

      <h3 className="text-xl font-semibold mb-2">Add Comment</h3>
      <form onSubmit={onSubmitComment} className="flex gap-2 mb-6">
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Write comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          type="submit"
        >
          Send
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">
        Comments ({thread.totalComments || 0})
      </h3>
      <div className="space-y-4">
        {thread.comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            threadId={thread.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
