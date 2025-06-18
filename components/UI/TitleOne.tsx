import React from 'react';
import cn from 'clsx';

type TitleOneT = {
  children: React.ReactNode;
  className?: string;
};
const TitleOne = ({ children, className }: TitleOneT) => {
  return (
    <h1 className={cn('text-[4rem]/16 font-bold font-lyon', className)}>
      {children}
    </h1>
  );
};

export default TitleOne;
