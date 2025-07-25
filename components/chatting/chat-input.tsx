import Link from "next/link";
import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

interface IInputChat extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isVoiceAvaileble: boolean;
  usage: "start" | "main";
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatInput = ({
  isVoiceAvaileble,
  inputValue,
  usage,
  setInputValue,
  ...attrs
}: IInputChat) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxRows = 4;
  const lineHeight = 24;
  const [minHeight, setMinHeight] = useState(54);
  const [isTextXS, setIsTextXS] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 250) {
      setIsTextXS(true);
      // setMinHeight(15);
    } else if (window.innerWidth <= 375) {
      // setMinHeight(30);
    } else {
      // setMinHeight(54);
    }
  }, []);

  console.log(minHeight);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = `${minHeight}px`;

      const scrollHeight = textarea.scrollHeight;
      let newHeight;
      if (firstRender) {
        newHeight = minHeight;
        setFirstRender(false);
      } else {
        newHeight = Math.min(
          Math.max(scrollHeight, minHeight),
          maxRows * lineHeight
        );
      }

      textarea.style.height = `${newHeight}px`;
    }
  }, [inputValue]);

  const sendMessage = () => {
    console.log(inputValue);
  };

  return (
    <div className="w-full flex flex-row justify-center items-center">
      {isVoiceAvaileble && (
        <Link href="/voice">
          <button className="bg-blue-500 text-white p-2 rounded-full h-full aspect-square flex items-center justify-center ml-2 cursor-pointer">
            <img src="/images/segment.svg" alt="sound" />
          </button>
        </Link>
      )}
      <div
        className={`flex flex-row justify-between items-center border rounded-md border-[#E7E7E7] w-full ${
          isTextXS ? "pl-1 pr-1" : "pl-4 pr-4"
        }`}
      >
        <img src="/images/right-input-icon.svg" alt="Right icon" />
        <textarea
          {...attrs}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="اكتب لرفاه ما تفكر فيه .."
          className={`w-full min-h-[${minHeight}px] max-h-[96px] ${
            isTextXS
              ? "text-[8px] p-0"
              : "text-[14px] md:text-[13px] xs:text-[12px] p-3"
          } focus:outline-none resize-none overflow-hidden `}
          rows={1}
          style={{
            lineHeight: `${lineHeight}px`,
            height: `${minHeight}px`,
          }}
        />
        {usage === "start" ? (
          <>
            <Link
              href="/mainchat"
              className="flex flex-row justify-center items-center"
            >
              <button className="cursor-pointer">
                <img src="/images/telegramFill.svg" alt="Left icon" />
              </button>
            </Link>
          </>
        ) : (
          <>
            <button className="cursor-pointerl">
              <img src="/images/telegramFill.svg" alt="Left icon" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
