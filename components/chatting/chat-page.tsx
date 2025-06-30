"use client";

import { useState } from "react";
import ChatInput from "./chat-input";
import StartChatOptions from "./start-chat-option";

const ChatPage = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col justify-start items-center w-full h-full p-1">
      <button className="flex flex-col justify-center items-center mr-auto rounded-full w-[60px] h-[60px] bg-white cursor-pointer">
        <img
          src="/images/sound.svg"
          alt="sound icon"
          className="w-[35px] h-[20px]"
        />
      </button>
      <div className="w-[100%] md:w-[90%] lg:w-[90%] xl:w-[70%] h-full flex flex-col justify-between items-center">
        <div className="w-[100%] md:w-[90%] lg:w-[80%] xl:w-[70%] h-[70%] flex flex-col justify-center items-center p-4">
          <span className="text-[64px] text-[#000000] font-bold leading-10 mb-8">
            رفاه
          </span>
          <ChatInput
            usage="start"
            isVoiceAvaileble={false}
            inputValue={message}
            setInputValue={(value: string) => setMessage(value)}
          />
          <div className="flex flex-col justify-between items-center w-full mt-4 gap-2">
            <StartChatOptions
              text="اجلس في مكان هادئ حيث يمكن لرفاه سماعك بوضوح"
              icon={
                <>
                  <img src="/images/person-chat.svg" alt="person icon" />
                </>
              }
            />
            <StartChatOptions
              text="لا تقم بمشاركة أي معلومات شخصية أو حساسة"
              icon={
                <>
                  <img src="/images/chat-smile.svg" alt="person icon" />
                </>
              }
            />
            <StartChatOptions
              text="تحلى بالهدوء وساعد وكيلنا الذكي على فهم مشكلتك بعمق"
              icon={
                <>
                  <img src="/images/sience-chat.svg" alt="person icon" />
                </>
              }
            />
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <span className="text-[16px] text-[#919191] leading-7">
            نحن لا نحل محل المختص النفسي
          </span>
          <span className="text-[16px] text-[#919191] leading-7">
            جميع الحقوق محفوظة
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
