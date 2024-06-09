"use client";

import ButtonForm from "@/components/button-form";
import Link from "next/link";
import { useFormState } from "react-dom";
import LoginUser from "@/components/login-user";
import { CreateTweet } from "./actions";

export default function AddTweet() {
  const [state, action] = useFormState(CreateTweet, null);
  return (
    <main className='flex flex-col items-center justify-center h-screen w-1/2 mx-auto'>
      <div className='font-bold text-2xl text-center'>Create Tweets</div>
      <form action={action} className='w-full flex flex-col gap-3'>
        <LoginUser />
        <textarea
          className='w-full h-24 border-2 border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          id='tweet'
          name='tweet'
          required
          placeholder='트윗을 작성하세요.'
          rows={3}
        ></textarea>
        <div className='flex flex-row gap-3 w-full'>
          <ButtonForm title='트윗 작성' />
          <Link
            href='/'
            className='w-full form-btn-able hover:form-btn-hover  form-btn-disabled rounded-full  p-3 shadow-md text-white font-medium transition text-center'
          >
            취 소
          </Link>
        </div>
      </form>
    </main>
  );
}
