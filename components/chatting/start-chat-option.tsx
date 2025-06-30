interface IStartChatOptions {
  text: string;
  icon: React.ReactNode;
}

const StartChatOptions = ({ text, icon }: IStartChatOptions) => {
  return (
    <>
      <div className="w-[100%] md:w-[70%] h-[56px] p-2 flex flex-row justify-start items-center bg-[#9887E3]/10 rounded-[20px]">
        <div className="h-full aspect-square rounded-full bg-white flex flex-row justify-center items-center">
          {icon}
        </div>
        <span className="text-[16px] mr-4">{text}</span>
      </div>
    </>
  );
};

export default StartChatOptions;
