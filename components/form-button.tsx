"use client";
import { useFormStatus } from "react-dom";
interface FormButtonProps {
  title: string;
}

export default function FormButton({ title }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className='form-btn-able form-btn-disabled rounded-full  p-3 shadow-md text-white font-medium transition'
    >
      {pending ? "Loading..." : title}
    </button>
  );
}
