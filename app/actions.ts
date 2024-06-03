"use server"
import db from "@/lib/db";
import { Tweet } from "@prisma/client";


export async function getTweets(): Promise<Tweet[]> {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      createdAt: true,
      updatedAt: true,      
      userId: true,
      user: {
        select: {
          email: true, 
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return tweets;
}