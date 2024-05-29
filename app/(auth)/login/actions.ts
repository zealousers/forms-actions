"use server";

import bcrypt from 'bcrypt';
import { EMAIL_REQUIRED_ERROR,EMAIL_NOT_FOUND_ERROR, PASSWORD_REQUIRED_ERROR} from "@/lib/constants";
import {z} from "zod";
import db from "@/lib/db"
import getSession from "@/lib/session";
import {redirect} from "next/navigation";
 
const checkEmailExists = async(email:string)=>{
  const user =await db.user.findFirst({
    where:{
      email:email,
    },
    select:{
      id:true
    },
  })
return Boolean(user)
}

const UserSchema = z.object({
  email: z.string({required_error:EMAIL_REQUIRED_ERROR}).email().toLowerCase().refine(checkEmailExists,EMAIL_NOT_FOUND_ERROR),

  password: z.string({required_error:PASSWORD_REQUIRED_ERROR}),
});
  
export async function handleForm(prevState:any,formData:FormData) {
  const data={
    email:formData.get("email"),
    password:formData.get("password"),
    }
    const result=await UserSchema.safeParseAsync(data)
   
    // console.log(result)
 
  // if (!result.success) {
  //   console.log(result.error.flatten());
  //   return result.error.flatten();
  // } else {
  //   console.log(result.data);
  // }
  if (!result.success) { 
    return result.error.flatten();
  } else {
    const user = await db.user.findFirst({
      where:{
        email: result.data.email,
      },
      select:{   
        id:true,     
        password:true,
      }
    })
 const ok= await bcrypt.compare(result.data.password,user?.password ??"")
 if(ok){
  const session=await getSession()
  session.id=user?.id
  redirect("/profile")
 } else{
  return {
    fieldErrors:{
      email:["Wrong email!"],
      password:["Wrong password!"]
    }
  }
 }
  }

}