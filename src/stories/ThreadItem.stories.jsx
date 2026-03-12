import ThreadItem from '../components/ThreadItem';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
};

export function Default() {
  return (
    <ThreadItem
      thread={{
        id: 'thread-1',
        title: 'Contoh Thread',
        body: 'Ini adalah contoh thread',
        createdAt: new Date(),
        owner: { name: 'User' },
        upVotesBy: [],
        downVotesBy: [],
      }}
    />
  );
}
