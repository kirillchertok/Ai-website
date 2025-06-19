import Image from 'next/image';
import React from 'react';
import cn from 'clsx';

type buttonType = {
  bgColor: string;
  className?: string;
  icon?: React.ReactNode;
  content: string;
  type: 'submit' | 'reset' | 'button' | undefined;
};

const Button = ({ bgColor, icon, content, type, className }: buttonType) => {
  return (
    <button
      type={type}
      className={cn(
        'flex flex-row-reverse items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 md:gap-3.5 text-white rounded-full cursor-pointer text-sm xs:text-base sm:text-lg md:text-lg lg:text-lg hover:scale-95 duration-200',
        bgColor,
        className
      )}
    >
      {icon && (
        <Image
          src={icon as string}
          width={20}
          height={20}
          className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7"
          alt="logo"
        />
      )}
      {content}
    </button>
  );
};

export default Button;
