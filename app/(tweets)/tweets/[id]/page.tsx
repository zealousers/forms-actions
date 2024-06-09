import db from "@/lib/db";
import { notFound } from "next/navigation";
import { korFormatToTimeAgo } from "@/lib/utils";
import ButtonLink from "@/components/button-link";
import ButtonLogOut from "@/components/button-logout";
import CommentsListViews from "@/components/comments-list-view/comment-list-view";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/lib/session";
import { EyeIcon } from "@heroicons/react/24/outline";
import ButtonLike from "@/components/button-like";
import AddComment from "@/components/add-comment/add-comment";

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `${params.id} | Tweets`,
  };
}

async function getTweetDetail(id: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        id: id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            like: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedTweet = nextCache(getTweetDetail, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

async function getIsLiked(tweetId: number) {
  const session = await getSession();
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId: tweetId,
        userId: session.id!,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId: tweetId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

// function getCachedLike(tweetId: number) {
//   const cachedLike = nextCache(getIsLiked, ["like-status"], { tags: [`like-status-${tweetId}`] });
//   return cachedLike(tweetId);
// }

function getCachedLikeStatus(tweetId: number) {
  const cachedOperation = nextCache(getIsLiked, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

export default async function TweetsDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }
  // const tweetContent = await getTweetDetail(id);
  const tweetContent = await getCachedTweet(id);
  if (!tweetContent) {
    return notFound();
  }

  // const { isLiked, likeCount } = await getCachedLikeStatus(id);
  const { isLiked, likeCount } = await getIsLiked(id);

  const day = tweetContent.createdAt.toString();
  return (
    <div className='min-h-screen w-1/2 mx-auto flex flex-col justify-center'>
      <div className='w-full flex flex-row justify-center my-10 gap-20'>
        <ButtonLink url='/' name='List' />
        <ButtonLogOut />
      </div>
      <div className='flex flex-row items-center justify-between divide-x p-3 divide-neutral-200 border-b border-t border-neutral-200'>
        <span className='text-xl font-bold grow-0 px-5'>{id}-tweet</span>
        <span className='grow text-right text-lg pr-5'>작성자 : {tweetContent.user.username}</span>
        <span className='grow-0 text-sm align-text-bottom px-5'>{korFormatToTimeAgo(day)}</span>
      </div>
      <div className='text-justify divide-x px-3 py-10 divide-neutral-200 border-b  border-neutral-200'>
        {tweetContent.tweet}
      </div>
      <div className='flex flex-row gap-5 items-center justify-between py-5'>
        <div className='flex items-center gap-2 text-neutral-400 text-sm'>
          <EyeIcon className='h-5 w-5 text-pink-300' />
          <span>view : {tweetContent.view}</span>
        </div>
        <ButtonLike isLiked={isLiked} likeCount={likeCount} tweetId={id} />
      </div>
      <AddComment tweetId={tweetContent.id} />
      <CommentsListViews tweetId={tweetContent.id} />
    </div>
  );
}
