import logOut from "@/lib/logout";
import Link from "next/link";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { korFormatDate, korFormatToTimeAgo } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `${params.id} | Tweets`,
  };
}
async function getTweetDetail(id: number) {
  const tweets = await db.tweet.findUnique({
    where: {
      id: id, // Assuming 'id' is available in this scope
    },
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

export default async function TweetsDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweetContent = await getTweetDetail(id);
  if (!tweetContent) {
    return notFound();
  }
  const day = tweetContent.createdAt.toString();
  return (
    <div className='min-h-screen w-1/2 mx-auto flex flex-col justify-center'>
      <div className='flex flex-row items-center justify-between'>
        <span className='text-xl font-bold grow-0'>{id}-tweet</span>
        <span className='grow text-right text-lg pr-5'>Email : {tweetContent.user.email}</span>
        <span className='grow-0 text-sm align-text-bottom'>{korFormatToTimeAgo(day)}</span>
      </div>
      <div className='text-justify'>{tweetContent.tweet}</div>

      <form className='w-full flex flex-row justify-center mt-10 gap-20' action={logOut}>
        <Link
          href='/'
          className='w-full form-btn-able hover:form-btn-hover form-btn-disabled rounded-full  p-3 shadow-md text-white font-medium transition text-center'
        >
          List
        </Link>
        <button className='w-full form-btn-able hover:form-btn-hover form-btn-disabled rounded-full  p-3 shadow-md text-white font-medium transition text-center'>
          Log Out
        </button>
      </form>
    </div>
  );
}
