import React from 'react';
import cn from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 py-4 xs:px-5 xs:py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 xl:px-16 xl:py-12 2xl:px-20 2xl:py-14 3xl:py-16',
        'max-w-[320px] xs:max-w-[480px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
