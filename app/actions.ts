"use server";
import { EMAIL_ERROR,  EMAIL_REQUIRED_ERROR,  PASSWORD_MIN_ERROR,  PASSWORD_MIN_LENGTH,  PASSWORD_REGEX,  PASSWORD_REGEX_ERROR,  PASSWORD_REQUIRED_ERROR,   USERNAME_MIN_ERROR, USERNAME_REQUIRED_ERROR } from "@/lib/constants";
import {z} from "zod";

const checkEmail =(email:string)=>email.includes("@zod.com") 

const UserSchema = z.object({
  email: z.string({required_error:EMAIL_REQUIRED_ERROR}).email().toLowerCase().refine(checkEmail,EMAIL_ERROR),
  username: z.string({required_error:USERNAME_REQUIRED_ERROR}).trim().min(5, USERNAME_MIN_ERROR),
  password: z.string({required_error:PASSWORD_REQUIRED_ERROR}).min(PASSWORD_MIN_LENGTH,PASSWORD_MIN_ERROR).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
});
  
export async function handleForm(prevState:any,formData:FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data={
    email:formData.get("email"),
    username:formData.get("username"),
    password:formData.get("password"),
    }
    // UserSchema.parse(data)
    const result=UserSchema.safeParse(data)
   
    // console.log(result)
 
  // if (!result.success) {
  //   console.log(result.error.flatten());
  //   return result.error.flatten();
  // } else {
  //   console.log(result.data);
  // }
  if (!result.success) { return result.error.flatten();}

}