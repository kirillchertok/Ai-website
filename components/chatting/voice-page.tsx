import Image from "next/image";

const VoicePage = () => {
  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-full p-1">
        <button className="flex flex-col justify-center items-center mr-auto rounded-full w-[86px] h-[86px] bg-white">
          <img src="/images/sound.svg" alt="sound icon" />
        </button>
        <div className="text-center">
          <img src="/images/pulsar.svg" alt="sound icon" />
          <span className="text-[#907DE0] text-[36px]">01:40</span>
          <div className="flex flex-row justify-between items-center">
            <button>
              <img src="/images/right-btn-voice.svg" alt="sound icon" />
            </button>
            <button
              className="flex flex-row justify-center items-center w-24 h-24 rounded-full 
           bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#E4DDFF_51%,#9887E3_100%)]"
            >
              <img src="/images/microphone.svg" alt="sound icon" />
            </button>
            <button>
              <img src="/images/left-btn-voice.svg" alt="sound icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoicePage;
