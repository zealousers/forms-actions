"use client";

import { useFormState } from "react-dom";
import { BugAntIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import FormButton from "@/components/form-button";
import { handleForm } from "./actions";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <main className='min-h-screen w-screen flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center shadow-md rounded-lg border-neutral-200 border p-10'>
        <BugAntIcon className='w-24 h-24 text-pink-500 mb-10' />
        <form action={action} className='flex flex-col justify-center gap-4'>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5'>
              <EnvelopeIcon className='h-5 w-5 text-pink-300' />
            </div>
            <input
              name=' email'
              placeholder='Enter your email'
              id=' email'
              className='block w-full rounded-full py-3 pl-12 pr-20 text-black placeholder:text-neutral-300 border-none placeholder:text-sm placeholder:font-light text-lg transition ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-inset focus:ring-gray-100 focus:ring-offset-gray-200'
            />
          </div>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5'>
              <UserIcon className='h-5 w-5 text-pink-300' />
            </div>
            <input
              name='username'
              placeholder='Enter your username'
              id='username'
              className='block w-full rounded-full py-3 pl-12 pr-20 text-black placeholder:text-neutral-300 border-none placeholder:text-sm placeholder:font-light text-lg transition ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-inset focus:ring-gray-100 focus:ring-offset-gray-200'
            />
          </div>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5'>
              <KeyIcon className='h-5 w-5 text-pink-300' />
            </div>
            <input
              name='password'
              placeholder='Enter your password'
              id='password'
              className='block w-full rounded-full py-3 pl-12 pr-20 text-black placeholder:text-neutral-300 border-none placeholder:text-sm placeholder:font-light text-lg transition ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-inset focus:ring-gray-100 focus:ring-offset-gray-200'
            />
          </div>
          {state?.show &&
            state?.messages.map((message, i) => (
              <div key={i} className='text-red-500 -mt-3 pl-5 text-sm'>
                {message}
              </div>
            ))}
          <FormButton title='Log in' />
          {!state?.show &&
            state?.messages.map((message, i) => (
              <div
                key={i}
                className='text-sm bg-green-500 rounded-xl p-3 flex flex-row justify-center items-center gap-2'
              >
                <CheckCircleIcon className='h-6 w-6 text-white font-bold' />
                <div className='text-white font-bold'>{message}</div>
              </div>
            ))}
        </form>
      </div>
    </main>
  );
}
