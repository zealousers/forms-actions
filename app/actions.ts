"use server"
import db from "@/lib/db";
import { User } from "@prisma/client";




export async function getTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      createdAt: true,
      updatedAt: true,
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return tweets;
}