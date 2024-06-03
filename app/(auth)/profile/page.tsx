import FormButton from "@/components/form-button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import logOut from "@/lib/logout";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  return (
    <main className='min-h-screen w-screen flex flex-col items-center justify-center'>
      <div className='text-4xl font-bold'>Welcome!</div>
      <div className='text-4xl font-bold mb-10'>{user?.username} Profile</div>
      <div className='flex flex-col items-stretch justify-center'>
        <div className='flex flex-row items-center gap-2'>
          <EnvelopeIcon className='h-6 w-6' />
          <span className='text-xl font-bold'>user-email : {user?.email}</span>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <UserIcon className='h-6 w-6' />
          <div className='text-xl font-bold'>user-name : {user?.username}</div>
        </div>
        <form className='mx-auto w-full flex flex-col mt-10' action={logOut}>
          <FormButton title='Log out' />
        </form>
      </div>
    </main>
  );
}
