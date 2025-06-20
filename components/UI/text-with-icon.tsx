import Image from 'next/image';
import React from 'react';
import cn from 'clsx';

type TextWithIconProps = {
  className?: string;
  textContent: string;
  srcImage: string;
  sizeImage?: number;
};

const TextWithIcon = ({
  className,
  textContent,
  srcImage,
  sizeImage = 20,
}: TextWithIconProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-2.5', className)}>
      <span>{textContent}</span>
      <Image
        src={srcImage}
        width={sizeImage}
        height={sizeImage}
        alt="إنهاء المحادثة"
      />
    </div>
  );
};

export default TextWithIcon;
