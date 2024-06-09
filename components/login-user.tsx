"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    if (user) {
      return user;
    }
  }
}

export default async function LoginUser() {
  const user = await getUser();
  // console.log("user :", user);

  // return <span {...{ ...user, id: user!.id.toString() }}>{user!.email}</span>;
  return (
    <div>
      <span>작성자 : </span>
      <input type='text' value={user!.id} name='userId' id='userId' readOnly hidden />
      {/* <input type='text' value={user!.email} name='email' id="email" readOnly hidden /> */}
      <input type='text' value={user!.username} name='username' id='username' readOnly />
    </div>
  );
}
