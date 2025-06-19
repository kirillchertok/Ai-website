import React from 'react';
import cn from 'clsx';

type TitleOneT = {
  children: React.ReactNode;
  className?: string;
};
const TitleOne = ({ children, className }: TitleOneT) => {
  return (
    <h1
      className={cn(
        'text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[3.5rem] 2xl:text-[4rem]',
        'leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] 2xl:leading-[1]',
        'font-bold font-lyon',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default TitleOne;
