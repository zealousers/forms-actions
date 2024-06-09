"use server";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function likeTweet(tweetId: number) {
  // await new Promise((resolve)=>setTimeout(resolve, 5000));
  const session = await getSession();
  try{
    await db.like.create({
      data:{
        tweetId,
        userId: session.id!,
      }
    });
    revalidateTag(`like-${tweetId}`);
  }catch(e){
    null;
  }
}

export async function unlikeTweet(tweetId: number) {
  const session = await getSession();
  try{
    await db.like.delete({
      where:{
        id:{
        tweetId,
        userId: session.id!,
        }
      }
    });
    revalidateTag(`like-${tweetId}`);
  }catch(e){
    null;
  }
}