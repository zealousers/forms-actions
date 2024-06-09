import { korFormatDate } from "@/lib/utils";

interface User {
  username: string;
}
interface CommentsListViewsProps {
  id: number;
  comment: string;
  tweetId: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export default function ListCommentRow({ id, comment, createdAt, user }: CommentsListViewsProps) {
  return (
    <div key={id} className='flex flex-col justify-start mb-5 w-full mx-auto'>
      <div className='w-full flex flex-row items-end justify-between gap-2 p-2 bg-neutral-500 text-white text-xs'>
        <span className='font-medium'>작성자 :{user!.username}</span>
        <span>{korFormatDate(createdAt)}</span>
      </div>
      <div className='w-full truncate ...  p-1 border-b pb-5'>{comment}</div>
    </div>
  );
}
