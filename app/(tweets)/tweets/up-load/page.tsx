// "use client";

import FormButton from "@/components/form-button";
import { getUser } from "./actions";
// import { useFormState } from "react-dom";
export default async function UpLoad() {
  // export default function UpLoad() {
  // const email = await getUserEmail();
  const user = await getUser();
  // const [state, action] = useFormState(getUser, null);
  return (
    <main className='flex flex-col items-center justify-center h-screen w-1/2 mx-auto'>
      <div className='font-bold text-2xl text-center'>Create Tweets</div>
      <form className='w-full flex flex-col gap-3'>
        {/* <input id='email' type='text' readOnly value={user!.email} /> */}
        <div className='text-center'>
          <label htmlFor='tweet'>작성자 : </label>
          <span id='email'>{user!.email}</span>
        </div>
        <textarea
          className='w-full h-24 border-2 border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          id='tweet'
          name='tweet'
          required
          placeholder='트윗을 작성하세요.'
          rows={3}
        ></textarea>
        <FormButton title='트윗 작성' />
      </form>
    </main>
  );
}

//로그인한 유저의 이메일을 가져오기 위해 useClient를 사용합니다.
//가져온 이메일은 input의 value로 설정합니다.
//트윗을 작성하기 위한 textarea를 만들어줍니다.
//이메일은 readOnly로 설정합니다.
//트윗을 작성할 수 있도록 placeholder를 설정합니다.
