import React from 'react';
import Button from '../UI/button';
import Image from 'next/image';
import Link from 'next/link';
type SubscriptionCard = {
  title: string;
  description: string;
  price?: string;
  content: string[];
  buttonText: string;
  buttonColor: string;
  hoverColorBtn?: string; // Add hover color prop
  colorBorderDescription: string;
  backgroundCard: string;
  spaceTopBtn: string;
  animationClass?: string;
  animationDelay?: string;
};
const SubscriptionCard = ({
  title,
  description,
  price,
  content,
  buttonText,
  buttonColor,
  hoverColorBtn, // Add to props
  colorBorderDescription,
  backgroundCard,
  spaceTopBtn,
  animationClass = '',
  animationDelay = '0ms',
}: SubscriptionCard) => {
  return (
    <div
      style={{ border: `1px solid ${colorBorderDescription}` }}
      className={`border-1 rounded-4xl p-2 flex flex-col justify-between ${backgroundCard} flex-1 opacity-0 ${animationClass}`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-base/6 xs:text-lg/7 sm:text-xl/8 md:text-xl/8 lg:text-2xl/9 font-bold text-[#4F3422] text-center">
          {title}
        </h2>
        <p
          style={{ color: `${colorBorderDescription}` }}
          className={`text-xs xs:text-sm sm:text-[0.875rem] md:text-base leading-[100%] font-normal text-center max-w-full xs:max-w-[90%] sm:max-w-[85%] mx-auto`}
        >
          {description}
        </p>
        {price && (
          <p className="text-3xl/12 xs:text-4xl/14 sm:text-4xl/16 md:text-5xl/18 font-bold text-[#222222] flex items-center justify-center gap-2 xs:gap-3">
            {price}
            <Image
              src="/images/saudCur.svg"
              width={32}
              height={35}
              alt="price"
              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
            />
          </p>
        )}
        {content.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-1.5 xs:py-2 px-3 xs:px-4 sm:px-5 md:px-6 rounded-full border-1 border-[#CCCCCC] bg-white"
          >
            <p
              key={item}
              className="text-xs xs:text-sm sm:text-base/6 md:text-base/6 leading-[100%] font-semibold text-[#736B66] pr-2"
            >
              {item}
            </p>
            <div
              className="size-4 xs:size-5 sm:min-w-6 sm:h-6 flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${colorBorderDescription}` }}
            >
              <Image
                src="/images/checked.svg"
                width={10}
                height={8}
                alt="checked"
                className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
              />
            </div>
          </div>
        ))}
      </div>
      <Link href={'/'}>
        <Button
          bgColor={buttonColor}
          className={`w-full h-auto py-3 xs:py-3 sm:py-3 md:py-3.5 px-6 xs:px-6 sm:px-6 md:px-8 text-sm xs:text-base sm:text-lg leading-[100%] font-bold xs:font-extrabold ${spaceTopBtn} ${hoverColorBtn}`}
          content={buttonText}
          type="submit"
        />
      </Link>
    </div>
  );
};

export default SubscriptionCard;
