import React from "react";
import Image from "next/image";

type CheckBoxCardProps = {
  id: string; // Add an ID to uniquely identify each card
  title: string;
  description: string;
  checked: boolean; // This will be controlled by the parent
  onSelect: (id: string) => void; // Function to call when this card is selected
  isCollapsed?: boolean;
  isLastItem?: boolean;
};

const CheckBoxCard = ({
  id,
  title,
  description,
  checked,
  onSelect,
  isCollapsed = false,
  isLastItem = false,
}: CheckBoxCardProps) => {
  if (isCollapsed) {
    return (
      <div
        className={`mb-2 flex items-center justify-center cursor-pointer relative xl:py-3 xl:px-4 py-1 px-2 border-1 border-[#E8E8E8] rounded-lg  ${
          !isLastItem
            ? "before:content-[''] before:absolute before:-bottom-5 before:left-[50%] before:translate-x-[-50%] before:w-[0.0625rem] before:h-[1.1875rem] before:bg-[#E8E8E8]"
            : ""
        } ${checked ? "bg-white" : "bg-white"}`}
        title={title}
      >
        {checked ? (
          <div className="xl:w-6 xl:h-6 w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
            <Image
              src="/images/checked.svg"
              alt="Checked"
              width={12}
              height={12}
            />
          </div>
        ) : (
          <div className="xl:w-6 xl:h-6 w-5 h-5 border-2 border-gray-300 rounded-full"></div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-2 py-3 px-4 border-1 border-[#E8E8E8] rounded-lg relative
      ${
        !isLastItem
          ? "before:content-[''] before:absolute before:-bottom-5 before:left-[50%] before:translate-x-[-50%] before:w-[0.0625rem] before:h-[1.1875rem] before:bg-[#E8E8E8]"
          : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onSelect(id)}
          className="sr-only" // Hide the actual checkbox
        />
        {checked ? (
          <div className="w-5 h-5 bg-[#636363] rounded-full flex items-center justify-center">
            <Image
              src="/images/checked.svg"
              alt="Checked"
              width={12}
              height={12}
            />
          </div>
        ) : (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
        )}
      </div>
      <div className="ml-2 flex flex-col justify-between gap-2">
        <span className="text-sm font-medium text-base leading-[160%]">
          {title}
        </span>
        <span className="text-xs text-[#767676] font-normal leading-[160%]">
          {description}
        </span>
      </div>
    </div>
  );
};

export default CheckBoxCard;
