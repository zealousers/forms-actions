"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { CheckForm } from "./actions";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, action] = useFormState(CheckForm, null);

  return (
    <main className='min-h-screen w-screen flex flex-col items-center justify-center'>
      <div className='text-3xl font-bold p-10'>회원가입</div>
      <form action={action} className='flex flex-col gap-4'>
        <FormInput
          type='email'
          name='email'
          id='email'
          iconName='EnvelopeIcon'
          required
          placeholder='사용자 이메일를 입력하세요'
          errors={state?.fieldErrors.email}
        />
        <FormInput
          type='text'
          name='username'
          id='username'
          iconName='UserIcon'
          required
          placeholder='사용자명을 입력하세요'
          errors={state?.fieldErrors.username}
          minLength={USERNAME_MIN_LENGTH}
        />
        <FormInput
          type='password'
          name='password'
          id='password'
          iconName='KeyIcon'
          required
          placeholder='비밀번호를 입력하세요'
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormInput
          type='password'
          name='confirm_password'
          id='confirm_password'
          iconName='KeyIcon'
          required
          placeholder='비밀번호를 다시 입력하세요'
          errors={state?.fieldErrors.confirm_password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <FormButton title='회원가입' />
      </form>
    </main>
  );
}
