import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";

interface FormInputProps {
  errors?: string[];
  name: string;
  iconName: string;
  type: string;
  placeholder: string;
  id: string;
  required?: boolean;
  minLength?: number;
}

export default function FormInput({
  type,
  placeholder,
  name,
  minLength,
  iconName,
  errors = [],
}: FormInputProps) {
  const iconMapping: { [key: string]: React.ElementType } = {
    EnvelopeIcon: EnvelopeIcon,
    KeyIcon: KeyIcon,
    UserIcon: UserIcon,
  };
  const IconComponent = iconMapping[iconName];
  return (
    <>
      <div className='flex flex-row items-center justify-start transition ring-1 ring-inset ring-gray-300  hover:ring-4 hover:ring-offset-2 hover:ring-inset hover:ring-gray-100 hover:ring-offset-pink-300 w-full rounded-full p-3 gap-2 invalid:border-red-500'>
        <IconComponent className='h-5 w-5 text-pink-300' />
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          required
          minLength={minLength}
          className=' text-black bg-white placeholder:text-neutral-300 border-none placeholder:text-sm placeholder:font-light text-lg outline-none autofill:bg-yellow-200'
        />
      </div>
      {errors.map((error, i) => (
        <div key={i} className='text-red-500 -mt-3 pl-5 text-sm'>
          {error}
        </div>
      ))}
    </>
  );
}
