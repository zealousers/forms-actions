"use client";
import { useFormStatus } from "react-dom";
interface ButtonFormProps {
  title: string;
  onClick?: () => void;
}

export default function ButtonForm({ title, onClick }: ButtonFormProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='w-full form-btn-able hover:form-btn-hover  form-btn-disabled rounded-full  p-3 shadow-md text-white font-medium transition'
      onClick={onClick}
    >
      {pending ? "Loading..." : title}
    </button>
  );
}
