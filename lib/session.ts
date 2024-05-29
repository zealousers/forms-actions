import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}


export default function getSession(){
  return getIronSession<SessionContent>(cookies(),{
      cookieName:"cookie-carrot",
      password:process.env.SECRET_COOKIE_PASSWORD!,
    })
}