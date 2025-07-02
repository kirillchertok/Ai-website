"use client";

import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import TextWithIcon from "../UI/text-with-icon";

export default function Header() {
  const [isTextXS, setIsTextXS] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 250) {
      setIsTextXS(true);
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 h-[10%]">
      <div className="flex items-center justify-between xl:flex-row flex-col gap-6">
        <div className="flex items-center gap-3 self-start">
          <div className="size-12 bg-[#526FEB0D] rounded-lg flex items-center justify-center">
            <Image src="/images/logo.svg" width={27} height={27} alt="رفاه" />
          </div>
          <div className="flex flex-col gap-2.5">
            <h3
              className={`${
                isTextXS ? "text-[8px]" : "text-lg"
              } font-medium leading-[100%]`}
            >
              الخطة المجانية
            </h3>
            <p
              className={`${
                isTextXS ? "text-[6px]" : "text-sm"
              } pr-3 font-normal leading-[100%] text-[#00A739] relative before:content-[""] before:absolute before:w-1.5 before:h-1.5 before:bg-[#00A739] before:right-0 before:top-[50%] before:translate-y-[-50%] before:rounded-full`}
            >
              35,000 شخص نشط
            </p>
          </div>
        </div>

        <div className="items-center gap-4 xl:flex hidden">
          <button className="px-5 py-2.5 cursor-pointer">
            <TextWithIcon
              textContent="مساعدة"
              srcImage="/images/help-circle.svg"
              className="text-base text-[#767676] flex-row-reverse"
            />
          </button>
          <button className="px-5 py-2.5 cursor-pointer ">
            <TextWithIcon
              textContent="ترقية الخطة"
              srcImage="/images/lighting.svg"
              className="text-base text-[#D69D0B] flex-row-reverse"
            />
          </button>
          <div className="border-1 border-[#E8E8E8] rounded-lg p-1">
            <button className="bg-[#FB7185] p-2 rounded-lg hover:text-gray-900 w-[10.0625rem] cursor-pointer">
              <TextWithIcon
                textContent="إنهاء المحادثة"
                srcImage="/images/segment.svg"
                className="text-sm text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
