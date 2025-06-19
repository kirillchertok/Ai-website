import Image from 'next/image';
import React from 'react';

type InfoCard = {
  title?: string;
  description: string;
  icon?: string;
  animationDelay?: string;
};

const InfoCard = ({
  title,
  description,
  icon,
  animationDelay = '0ms',
}: InfoCard) => {
  return (
    <div
      className="bg-white border-2 border-[#E7E7E7] rounded-lg xs:rounded-xl py-3 px-4 xs:py-3 xs:px-4 sm:py-3 sm:px-5 md:py-4 md:px-4 flex items-center gap-2 xs:gap-3 sm:gap-3 md:gap-4 opacity-0 translate-y-[-20px] animate-fadeIn"
      style={{ animationDelay }}
    >
      {icon && (
        <div className="min-w-[2rem] h-[2rem] xs:min-w-[2.25rem] xs:h-[2.25rem] sm:min-w-[2.5rem] sm:h-[2.5rem] md:min-w-[2.75rem] md:h-[2.75rem] bg-[#F8F8F8] rounded-full flex items-center justify-center self-start">
          <Image
            src={icon}
            width={16}
            height={16}
            className="w-4 h-4 xs:w-[18px] xs:h-[18px] sm:w-5 sm:h-5 md:w-5 md:h-5"
            alt="logo"
          />
        </div>
      )}

      <div>
        {title && (
          <h3 className="text-[0.875rem] xs:text-[0.9375rem] sm:text-[1rem] md:text-[1.125rem] leading-[120%] xs:leading-[120%] sm:leading-[120%] md:leading-[100%] font-medium mb-1 xs:mb-1 sm:mb-1.5 md:mb-2">
            {title}
          </h3>
        )}
        <p className="text-[0.75rem] xs:text-[0.8125rem] sm:text-[0.8125rem] md:text-[0.875rem] leading-[150%] xs:leading-[150%] sm:leading-[150%] md:leading-[150%] font-normal text-[#919191]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
