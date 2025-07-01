"use client";

import ChatInput from "@/components/chatting/chat-input";
import { useState } from "react";

const MainChat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col justify-between items-center w-full h-full p-1">
      {/* Messages */}
      <div className="w-[95%] md:w-[60%] h-full p-4 flex flex-col gap-2 overflow-y-auto">
        {/* User request */}
        <div className="flex flex-row justify-center items-center lg:p-4 xs:p-1 border border-[rgba(0,0,0,0.5)] rounded-[12px]">
          <div className="w-[10%] h-full ml-4 mb-[1.2rem] flex flex-row justify-end items-end gap-2">
            <button className="cursor-pointer">
              <img
                src="/images/pin-message.svg"
                alt="pin message"
                className="w-[20px] h-[20px]"
              />
            </button>
            <button className="cursor-pointer">
              <img
                src="/images/pencil-edit.svg"
                alt="pencil edit"
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
          <div className="w-full flex flex-col justify-start items-start">
            <span className="lg:text-[14px] xs:text-[8px] text-[#444444] mb-2">
              2:03 م، 15 نوفمبر - جلسة علاج نفسي.
            </span>
            <span className="lg:text-[16px] xs:text-[10px] text-[#444444] lg:leading-7 xs:leading-4">
              الصحة النفسية، العلاج النفسي، الدعم النفسي - ما هي هذه المفاهيم؟
            </span>
          </div>
        </div>
        {/* AI response */}
        <div className="flex flex-row-reverse justify-center items-center lg:p-4 xs:p-1  rounded-[12px]">
          <div className="h-full mr-2 flex flex-row justify-start items-start gap-2">
            <img
              src="/images/logo.svg"
              alt="logo image"
              className="w-[24px] h-[27px]"
            />
          </div>
          <div className="w-full flex flex-col justify-end items-end">
            <span className="lg:text-[14px] xs:text-[8px] text-[#000000] mb-2">
              2:03 م، 15 نوفمبر - جلسة علاج نفسي.
            </span>
            <span className="lg:text-[16px] xs:text-[10px] text-[#000000] text-left lg:leading-7 xs:leading-4">
              الصحة النفسية، العلاج النفسي، والدعم النفسي هي جميعها مصطلحات
              مرتبطة في مجال الصحة النفسية، لكنها تشير إلى جوانب مختلفة قليلاً
              من عملية الرعاية النفسية.
            </span>
          </div>
        </div>
      </div>

      {/* Input panel */}
      <div className="w-[95%] md:w-[50%]">
        <ChatInput
          isVoiceAvaileble={true}
          usage="main"
          inputValue={message}
          setInputValue={(value: string) => setMessage(value)}
        />
      </div>
    </div>
  );
};

export default MainChat;
