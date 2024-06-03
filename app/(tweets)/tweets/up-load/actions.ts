
import db from "@/lib/db";
import getSession from "@/lib/session";


export async function getUser(){
  const session = await getSession()
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
        
      },
      select: {
        email: true,
      },
    });
    if (user) {
      return user;
    }
  }
}

// export async function getUserEmail(prevState:any,formData:FormData){
  
// const user = await getUser();
// return user!.email;
// }