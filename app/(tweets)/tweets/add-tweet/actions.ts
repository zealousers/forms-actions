"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import {z} from "zod";
import {redirect} from "next/navigation"

const tweetSchema = z.object({
  tweet: z.string().max(300).trim(), 
});


export async function CreateTweet(formData:FormData){
  const data={
    tweet:formData.get("tweet"),
    userId:formData.get("userId"),   
    
    };
  // console.log('data :', data);

  const result=await tweetSchema.safeParseAsync(data);  

  // console.log('result :', result );
  if(!result.success){
    return result.error.flatten();
  }else{
         const session = await getSession()
         if(session.id)
          {
            const tweet = await db.tweet.create({
              data:{
                tweet:result.data.tweet,     
                user:{
                  connect:{
                    id:session.id
                },
              },
              },
              select:{
                id:true,
              }
            })
          }
      redirect("/")
      }
}