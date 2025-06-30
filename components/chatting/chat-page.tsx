'use client';

const ChatPage = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-full p-1">
      <div className="fixed bottom-5 w-full max-w-[960px]">
        <input
          type="text"
          placeholder="اكتب لرفاه ما تفكر فيه .."
          className="w-full h-[54px] p-3 pl-12 pr-12 border rounded-md border-[#E7E7E7]"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <img 
            src="/images/telegramFill.svg" 
            alt="Left icon"
            className="w-6 h-6"
          />
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <img 
            src="/images/right-input-icon.svg" 
            alt="Right icon"
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;