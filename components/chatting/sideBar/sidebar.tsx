"use client";

import TextWithIcon from "@/components/UI/text-with-icon";
import React, { useState, useEffect } from "react";
import CheckBoxCardGroup from "./checkbox-group";
import Image from "next/image";
import TimerBlock from "./timer-block";

export const options = [
  {
    id: "option1",
    title: "وكيل ال intake",
    description:
      "يتم تقييم حالتك وتحليل إجابتك بناء لتبدأ المراحل التالية من الجلسة",
  },
  {
    id: "option2",
    title: "وكيل المشاعر",
    description:
      "يتم تقييم مشاعرك وإظهار اهتمام بالتفاصيل وتقديم حلول للحالة النفسية",
  },
  {
    id: "option3",
    title: "وكيل ال mental coach",
    description:
      "يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج",
  },
  // {
  //   id: 'option4',
  //   title: 'وكيل ال mental coach',
  //   description:
  //     'يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج',
  // },
  // {
  //   id: 'option5',
  //   title: 'وكيل ال mental coach',
  //   description:
  //     'يتم عمل تقييم وإرشاد للحالات والخطوات التي يجب على المستخدم اتباعها للوصول إلى مرحلة التعافي والعلاج',
  // },
];

function MinimizedSidebar({
  toggleSidebar,
  options,
  isMobile,
}: {
  toggleSidebar: () => void;
  options: any[];
  isMobile: boolean;
}) {
  return (
    <div className="xl:px-4 xl:py-12 px-2 py-6 h-full flex flex-col justify-between">
      <div
        className="flex justify-center cursor-pointer"
        onClick={toggleSidebar}
      >
        <Image
          src="/images/burger.svg"
          alt="Toggle menu"
          width={24}
          height={24}
        />
      </div>

      <div className="mt-8">
        <CheckBoxCardGroup
          isMobile={isMobile}
          type="small"
          options={options}
          defaultSelected="option1"
          isCollapsed={true}
        />
      </div>

      <TimerBlock isCollapsed={true} />
    </div>
  );
}

function FullSidebar({
  toggleSidebar,
  options,
  isOpen,
  isMobile,
}: {
  toggleSidebar: () => void;
  options: any[];
  isOpen: boolean;
  isMobile: boolean;
}) {
  return (
    <div
      className={`pl-10 pt-6 [@media(max-width:653px)]:p-2 h-auto lg:gap-8 xs:gap-2 flex flex-col justify-between absolute top-0 transitition-all duration-300 ease ${
        !isOpen && "hidden"
      } ${isOpen ? "left-0" : "left-[100%]"}`}
    >
      <div
        className="flex justify-between items-center w-full"
        onClick={toggleSidebar}
      >
        <TextWithIcon
          textContent="مرحبًا محمود"
          srcImage="/images/arrow-right-black.svg"
          className="lg:!text-2xl [@media(max-width:1024px)]:!text-xl xs:text-[10px] font-medium !justify-between w-full"
          sizeImage={24}
        />
      </div>

      <div className="items-center lg:gap-4 xs:gap-1 flex flex-col lg:hidden">
        <button className="lg:px-5 lg:py-2.5 xs:py-1 cursor-pointer">
          <TextWithIcon
            textContent="مساعدة"
            srcImage="/images/help-circle.svg"
            className="text-base text-[#767676] flex-row-reverse"
          />
        </button>
        <button className="px-5 py-2.5 cursor-pointer">
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

      <div className="lg:space-y-8 xs:space-y-2">
        <span className="w-full text-right text-xl font-medium">
          المختص الحالي
        </span>
        <div className="space-y-2 lg:mt-4 xs:mt-2">
          <CheckBoxCardGroup
            isMobile={isMobile}
            type="large"
            options={options}
            defaultSelected="option1"
            isCollapsed={false}
          />
        </div>
      </div>

      <TimerBlock isCollapsed={false} />
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile or tablet size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`bg-white border-l border-gray-200 h-full overflow-y-hidden transition-all duration-300 md:block z-30 relative scrollbar-hide ${
          isMobile ? "" : ""
        } ${
          isOpen
            ? isMobile
              ? "w-full max-w-[100%] right-0 fixed"
              : "w-[30%]"
            : "xl:w-[5.6875rem] w-[3.75rem]"
        }`}
        onClick={toggleSidebar}
      >
        {!isOpen && (
          <MinimizedSidebar
            isMobile={isMobile}
            toggleSidebar={toggleSidebar}
            options={options}
          />
        )}
        <FullSidebar
          isMobile={isMobile}
          toggleSidebar={toggleSidebar}
          options={options}
          isOpen={isOpen}
        />
      </aside>
    </>
  );
}
