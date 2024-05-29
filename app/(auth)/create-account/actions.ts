"use server";
import {EMAIL_REQUIRED_ERROR,  EMAIL_UNIQUE_ERROR,  PASSWORD_CONFORM_ERROR,  PASSWORD_MIN_ERROR,  PASSWORD_MIN_LENGTH,  PASSWORD_REGEX,  PASSWORD_REGEX_ERROR,  PASSWORD_REQUIRED_ERROR,   USERNAME_MIN_ERROR, USERNAME_REQUIRED_ERROR, USERNAME_UNIQUE_ERROR } from "@/lib/constants";
import {z} from "zod";
import db from "@/lib/db"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {redirect} from "next/navigation"
import getSession from "@/lib/session";

const checkPassword=({password,confirm_password}:{password:string,confirm_password:string})=>password===confirm_password

const checkEmailUnique=async (email:string)=>{
  const user = await db.user.findFirst({
    where:{
      email,
    },
    select:{
      id:true
    }
  }); 
  return !Boolean(user)
}
const checkUserUnique=async (username:string)=>{
  const user = await db.user.findFirst({
    where:{
      username:username,
    },
    select:{
      id:true
    }
  });
  return !Boolean(user)}

const UserSchema = z.object({
  email: z.string({required_error:EMAIL_REQUIRED_ERROR}).email().toLowerCase().refine(checkEmailUnique,EMAIL_UNIQUE_ERROR),
  username: z.string({required_error:USERNAME_REQUIRED_ERROR}).trim().min(5, USERNAME_MIN_ERROR).refine(checkUserUnique,USERNAME_UNIQUE_ERROR),
  password: z.string({required_error:PASSWORD_REQUIRED_ERROR}).min(PASSWORD_MIN_LENGTH,PASSWORD_MIN_ERROR).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
  confirm_password: z.string().min(PASSWORD_MIN_LENGTH,PASSWORD_MIN_ERROR).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
})
  .refine(checkPassword,{message:PASSWORD_CONFORM_ERROR,path:["confirm_password"]});
  
export async function CheckForm(prevState:any,formData:FormData) {
  const data={
    email:formData.get("email"),
    username:formData.get("username"),
    password:formData.get("password"),
    confirm_password:formData.get("confirm_password"),
    }
    const result=await UserSchema.safeParseAsync(data)

  if (!result.success){
    return result.error.flatten()
  }else{
    const hashedPassword=await bcrypt.hash(result.data.password,12)
    const user = await db.user.create({
      data:{
        email:result.data.email,
        username:result.data.username,
        password:hashedPassword,
      },
      select:{
        id:true
      }
    })
    const session = await getSession()

    session.id = user.id
    await session.save()
    redirect("/login")
  }
}