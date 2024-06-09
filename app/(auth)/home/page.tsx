import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center bg-white border-1 rounded-xl border-neutral-100 p-10 shadow-lg gap-5'>
        <div>
          <Image src='/images/logo.png' alt='logo' width={200} height={200} priority={false} />
          <h2 className='font-bold text-xl'>안녕하세요. 반갑습니다!!</h2>
          <h4 className='text-lg'>들어가시죠 :)</h4>
        </div>
        <div className='w-full mt-20 flex flex-col items-start justify-center'>
          <div className=''>이미 계정이 있나요?</div>
          <Link
            className='w-full rounded-xl transition bg-pink-400 hover:bg-purple-400 font-bold text-white text-center px-3 py-1'
            href={"/login"}
          >
            로그인
          </Link>
        </div>
        <div className='w-full flex flex-col items-start justify-center'>
          <div>계정이 없나요?</div>
          <Link
            className='w-full rounded-xl transition bg-blue-400 hover:bg-sky-400 font-bold text-white text-center px-3 py-1'
            href={"/create-account"}
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
