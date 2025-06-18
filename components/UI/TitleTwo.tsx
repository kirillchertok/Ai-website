import React from 'react';
import cn from 'clsx';

type TitleTwoT = {
  children: React.ReactNode;
  className?: string;
};
const TitleTwo = ({ children, className }: TitleTwoT) => {
  return (
    <h2 className={cn('text-5xl/12 font-medium', className)}>{children}</h2>
  );
};

export default TitleTwo;
