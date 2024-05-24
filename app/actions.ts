"use server";
import { EMAIL_ERROR,  EMAIL_REQUIRED_ERROR,  PASSWORD_MIN_ERROR,  PASSWORD_MIN_LENGTH,  PASSWORD_REGEX_ERROR,  PASSWORD_REQUIRED_ERROR,  USERNAME_MAX_ERROR, USERNAME_MIN_ERROR, USERNAME_REQUIRED_ERROR } from "@/lib/constants";
import {z} from "zod";

// const passwordRegex = new RegExp(
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
// );
const passwordNumberRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/);
const checkEmail =(email:string)=>email.includes("@zod.com") 

const UserSchema = z.object({
  email: z.string({required_error:EMAIL_REQUIRED_ERROR}).email().toLowerCase().refine(checkEmail,EMAIL_ERROR),
  username: z.string({required_error:USERNAME_REQUIRED_ERROR}).trim().min(5, USERNAME_MIN_ERROR).max(10,USERNAME_MAX_ERROR),
  password: z.string({required_error:PASSWORD_REQUIRED_ERROR}).min(PASSWORD_MIN_LENGTH,PASSWORD_MIN_ERROR).regex(passwordNumberRegex,PASSWORD_REGEX_ERROR),
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
   
    if(!result.success){
      return result.error.flatten();
    }
}