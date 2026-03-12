import React from 'react';
import ThreadItem from './ThreadItem';

function ThreadList({ threads, preview = false }) {
  return (
    <>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} preview={preview} />
      ))}
    </>
  );
}

export default React.memo(ThreadList);
