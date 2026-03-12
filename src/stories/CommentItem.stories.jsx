import CommentItem from '../components/CommentItem';

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
};

export function Default() {
  return (
    <CommentItem
      comment={{
        id: 'comment-1',
        content: 'Ini komentar contoh',
        owner: { name: 'User' },
        createdAt: new Date(),
        upVotesBy: [],
        downVotesBy: [],
      }}
    />
  );
}
