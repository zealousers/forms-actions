"use client";

import { useFormState } from "react-dom";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { handleForm } from "./actions";
import ButtonForm from "@/components/button-form";
import FormInput from "@/components/form-input";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <main className='min-h-screen w-screen flex flex-col items-center justify-center'>
      <div className='min-w-1/6 flex flex-col items-center justify-center shadow-md rounded-lg border-neutral-200 border p-10'>
        <BugAntIcon className='w-24 h-24 text-pink-500 mb-10' />
        <form action={action} className=' w-full flex flex-col justify-center gap-4'>
          <FormInput
            type='email'
            name='email'
            id='email'
            iconName='EnvelopeIcon'
            required
            placeholder='Enter your email'
            errors={state?.fieldErrors.email}
          />
          <FormInput
            type='password'
            name='password'
            id='password'
            iconName='KeyIcon'
            required
            placeholder='Enter your password'
            errors={state?.fieldErrors.password}
            minLength={PASSWORD_MIN_LENGTH}
          />
          <ButtonForm title='Log in' />
        </form>
      </div>
    </main>
  );
}
