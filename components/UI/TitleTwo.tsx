import React from 'react';
import cn from 'clsx';

type TitleTwoT = {
  children: React.ReactNode;
  className?: string;
};
const TitleTwo = ({ children, className }: TitleTwoT) => {
  return (
    <h2
      className={cn(
        'text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl',
        'leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-[1.2] xl:leading-[1.2]',
        'font-medium',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default TitleTwo;
