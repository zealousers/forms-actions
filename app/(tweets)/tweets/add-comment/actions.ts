"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import {z} from "zod";
import {redirect} from "next/navigation"

const commentSchema = z.object({
  comment: z.string().max(300).trim(), 
});


export async function CreateComment(prevState:any,formData:FormData){
  const data={
    comment:formData.get("comment"),
    userId:formData.get("userId"),   
    tweetId:formData.get("tweetId"),
    
    };
  console.log('data :', data);

  const result=await commentSchema.safeParseAsync(data);  

  console.log('result :', result );
  if(!result.success){
    return result.error.flatten();
  }else{
         const session = await getSession()
         if(session.id)
          {

            const comment = await db.comment.create({
              data:{
                comment:result.data.comment, 
                tweet:{
                  connect:{
                    id:Number(data.tweetId)
                },
              },    
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
  //           const comment = await db.comment.create({
  //             data:{
  //               comment:result.data.comment, 
  //               tweetId:Number(result.data.tweetId),    
  //               user:{
  //                 connect:{
  //                   id:session.id
  //               },
  //             },
  //             },
  //             select:{
  //               id:true,
  //             }
  //           )
          }
      redirect("/")
      }
}