import { NextRequest,NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes{
  [key:string]:boolean;
}

const publicOnlyUrls:Routes = {
  // "/":true,
  "/home":true,
  "/login":true,
  "/create-account":true,
};


export async function middleware(req:NextRequest){
  const session = await getSession();
  const exists = publicOnlyUrls[req.nextUrl.pathname];
  if(!session.id){
    if(!exists){
      return NextResponse.redirect(new URL("/home",req.url))
    } 
  } else {
    if(exists){
      return NextResponse.redirect(new URL("/",req.url))   
    }
  }
}

export const config ={
  matcher:["/((?!api|_next/static|_next/image|images|logo|favicon.ico).*)"],
}