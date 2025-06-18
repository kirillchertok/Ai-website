import Image from 'next/image';
import React from 'react';

type InfoCard = {
  title?: string;
  description: string;
  icon?: string;
};

const InfoCard = ({ title, description, icon }: InfoCard) => {
  return (
    <div className="bg-white border-2 border-[#E7E7E7] rounded-xl py-4 px-6 flex items-center gap-4">
      {icon && (
        <div className="min-w-[2.75rem] h-[2.75rem] bg-[#F8F8F8] rounded-full flex items-center justify-center self-start">
          <Image src={icon} width={20} height={20} alt="logo" />
        </div>
      )}

      <div>
        {title && (
          <h3 className="text-[1.125rem] leading-[100%] font-medium mb-2">
            {title}
          </h3>
        )}
        <p className="text-[0.875rem] leading-[100%] font-normal text-[#919191]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
