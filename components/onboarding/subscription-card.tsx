import React from 'react';
import Button from '../UI/button';
import Image from 'next/image';
type SubscriptionCard = {
  title: string;
  description: string;
  price?: string;
  content: string[];
  buttonText: string;
  buttonColor: string;
  colorBorderDescription: string;
  backgroundCard: string;
  spaceTopBtn: string;
};
const SubscriptionCard = ({
  title,
  description,
  price,
  content,
  buttonText,
  buttonColor,
  colorBorderDescription,
  backgroundCard,
  spaceTopBtn,
}: SubscriptionCard) => {
  return (
    <div
      style={{ border: `1px solid ${colorBorderDescription}` }}
      className={`border-1 rounded-4xl p-2 flex flex-col justify-between ${backgroundCard} flex-1`}
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-xl/8 font-bold text-[#4F3422] text-center">
          {title}
        </h2>
        <p
          style={{ color: `${colorBorderDescription}` }}
          className={`text-[0.875rem] leading-[100%] font-normal text-center`}
        >
          {description}
        </p>
        {price && (
          <p className="text-5xl/18 font-bold text-[#222222] flex items-center justify-center gap-3">
            {price}
            <Image
              src="/images/saudCur.svg"
              width={32}
              height={35}
              alt="price"
            />
          </p>
        )}
        {content.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 px-6 rounded-full border-1 border-[#CCCCCC] bg-white"
          >
            <p
              key={item}
              className="text-base/6 leading-[100%] font-semibold text-[#736B66]"
            >
              {item}
            </p>
            <div
              className="size-6 flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${colorBorderDescription}` }}
            >
              <Image
                src="/images/checked.svg"
                width={10}
                height={8}
                alt="checked"
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        bgColor={buttonColor}
        className={`w-full h-auto py-3.5 px-8 text-lg leading-[100%] font-extrabold ${spaceTopBtn}`}
        content={buttonText}
        type="submit"
      />
    </div>
  );
};

export default SubscriptionCard;
