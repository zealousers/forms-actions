import db from "@/lib/db";
import Link from "next/link";

interface Tweet {
  id: number;
  tweet: string;
  createdAt: Date;
  updatedAt: Date;
}
async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      createdAt: true,
      updatedAt: true,
      user: true,
    },
  });
  return tweets;
}
export default async function Main() {
  const tweets = await getTweets();
  return (
    <div className='h-screen flex flex-col justify-start'>
      {tweets.map((tweet, index) => {
        const date = new Date(tweet.createdAt);
        const formattedDate = `${date.getFullYear()}년 ${
          date.getMonth() + 1
        }월 ${date.getDate()}일 ${
          ["일", "월", "화", "수", "목", "금", "토"][date.getDay()]
        }요일 ${date.getHours()}시 ${date.getMinutes()}분`;

        return (
          <Link key={tweet.id} href={`/tweets/${tweet.id}`} className='mx-auto flex-col gap-2 mb-5'>
            <div className='flex flex-row items-end justify-between gap-2'>
              {/* <span className='font-bold'>{(index + 1).toString().padStart(2, "0")}</span> */}
              <span className='font-bold'>{index.toString()}</span>
              <span className='font-medium'>{tweet.user.email}</span>
              <span className='text-xs'>{formattedDate}</span>
            </div>
            <div className='w-96 truncate ... border border-neutral-200 p-3 rounded-md'>
              {tweet.tweet}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
