import Link from "next/link";

export default function AddTweet() {
  return (
    <Link
      href='/tweets/up-load'
      className='flex self-end form-btn-able hover:form-btn-hover  form-btn-disabled rounded-full px-10 py-2 shadow-md text-white font-medium transition mb-5'
    >
      트위작성
    </Link>
  );
}
