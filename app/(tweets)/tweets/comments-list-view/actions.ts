"use server"
import db from "@/lib/db";
import { Comment } from "@prisma/client";

export async function getComments(tweetId:number): Promise<Comment[]>{
  const comments=await db.comment.findMany({
    where: {
        tweetId:tweetId,
    },
    select:{
      id:true,
      comment:true,
      createdAt:true,
      updatedAt:true,
      tweetId:true,
      userId:true,
      user:{
        select:{
          username:true,
        },
      },
    },orderBy:{
      createdAt:"desc",
    }
  });
  return comments;
}