import Link from "next/link";
import React from "react";

interface ButtonLinkProps {
  url: string;
  name: string;
}

export default function ButtonLink({ url, name }: ButtonLinkProps) {
  return (
    <Link
      href={url}
      className='w-full form-btn-able hover:form-btn-hover  form-btn-disabled rounded-full p-3 text-white font-medium transition text-center'
    >
      {name}
    </Link>
  );
}
