import logOut from "@/lib/logout";
import Link from "next/link";
import db from "@/lib/db";

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  return {
    title: `${id} | Tweets`,
  };
}
async function getTweetDetail({ params: { id } }: { params: { id: string } }) {
  const tweets = await db.tweet.findFirst({
    where: {
      id: Number(id), // Assuming 'id' is available in this scope
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

export default async function TweetsDetail({ params: { id } }: { params: { id: string } }) {
  const tweet = await getTweetDetail({ params: { id } });
  return (
    <div>
      <div>Detail{id}</div>
      <div>{tweet?.tweet}</div>

      <form className='w-full flex flex-row justify-center mt-10' action={logOut}>
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
