"use server";

export async function handleForm(prevState:any,formData:FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data={
    email:formData.get("email"),
    username:formData.get("username"),
    password:formData.get("password"),
    }

    if(data.password!=="12345")
      {
        return {messages:["wrong password"],show:true}
      }else{
        return {messages:["Welcome to back!"],show:false}
      }



}