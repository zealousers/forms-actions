import Link from "next/link";
import { korFormatDate } from "@/lib/utils";

interface User {
  email: string;
}

interface TweetProps {
  id: number;
  tweet: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user?: User;
}

export default function ListTweetRow({ id, tweet, createdAt, user }: TweetProps) {
  const date = new Date(createdAt);
  const formattedDate = korFormatDate(date);

  return (
    <Link key={id} href={`/tweets/${id}`}>
      <div className='flex flex-col justify-start mb-5 w-full mx-auto'>
        <div className='w-full flex flex-row items-end justify-between gap-2 p-2 bg-neutral-500 text-white'>
          <span className='font-bold'>{id.toString()}</span>
          <span className='font-medium'>Email : {user!.email}</span>
          <span className='text-xs'>{formattedDate}</span>
        </div>
        <div className='w-full truncate ... border border-neutral-200 p-7 rounded-b-xl'>
          {tweet}
        </div>
      </div>
    </Link>
  );
}
