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
        'flex flex-row-reverse items-center justify-center gap-3.5 text-white rounded-full cursor-pointer',
        bgColor,
        className
      )}
    >
      {icon && <Image src={icon as string} width={20} height={20} alt="logo" />}
      {content}
    </button>
  );
};

export default Button;
