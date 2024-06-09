import logOut from "@/lib/logout";

export default function ButtonLogOut() {
  return (
    <form
      action={logOut}
      className='w-full form-btn-able hover:form-btn-hover  form-btn-disabled rounded-full p-3 text-white font-medium transition text-center'
    >
      <button>로그아웃</button>
    </form>
  );
}
