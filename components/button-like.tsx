"use client";

import { useOptimistic } from "react";
import { likeTweet, unlikeTweet } from "@/app/(tweets)/tweets/[id]/action";
import { HandThumbUpIcon as OutHandThumbUpIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon as SolidHandThumbUpIcon } from "@heroicons/react/24/solid";

interface ButtonLikeProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function ButtonLike({ isLiked, likeCount, tweetId }: ButtonLikeProps) {
  const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (previousState, payload) => ({
    isLiked: !previousState.isLiked,
    likeCount: previousState.isLiked ? previousState.likeCount - 1 : previousState.likeCount + 1,
  }));
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await unlikeTweet(tweetId);
    } else {
      await likeTweet(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-full py-1 px-3 transition-colors ${
        state.isLiked ? "bg-pink-500 text-white border-pink-500" : "hover:bg-neutral-800"
      }`}
    >
      {state.isLiked ? (
        <SolidHandThumbUpIcon className='h-5 w-5' />
      ) : (
        <OutHandThumbUpIcon className='h-5 w-5' />
      )}
      {state.isLiked ? (
        <span>공감하기 ({state.likeCount})</span>
      ) : (
        <span>공감하기 ({state.likeCount})</span>
      )}
    </button>
  );
}
