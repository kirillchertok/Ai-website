'use client'

import Image from "next/image";
import AnimatedBlob from "../UI/animatedBlob";

import { useState } from "react";

const VoicePage = () => {

const [isMicPressed, setIsMicPressed] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-full p-1">
        <button className="flex flex-col justify-center items-center mr-auto rounded-full pt-[29px] pb-[29px] pr-[23px] pl-[23px] bg-white">
          <img src="/images/sound.svg" alt="sound icon" />
        </button>

        <div className="text-center pb-[400px]">
        {
          isMicPressed ? (
            <div className="relative w-[100%] h-[100%]">
            <AnimatedBlob />
             <img  
              src="/images/sphere1.svg"
              alt="sphere"
              className="absolute w-[70%] h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            />
          </div>
          ) : <img src="/images/pulsar.svg" alt="sound icon" />
        }
          <p className="text-[#907DE0] text-[36px]">01:40</p>
          
          <div className="flex flex-row justify-between items-center mt-[100px]">
            <button>
              <img src="/images/right-btn-voice.svg" alt="sound icon" />
            </button>

            <div className="relative flex items-center justify-center">
              {isMicPressed && (
              <>
              <div className="absolute w-30 h-30 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping"></div>

              <div className="absolute w-25 h-25 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping delay-200"></div>

              <div className="absolute w-20 h-20 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping delay-400"></div>
              </> ) }
              <button onClick={() => setIsMicPressed(!isMicPressed)}
                className="flex z-10 flex-row justify-center items-center w-24 h-24 rounded-full 
                bg-[radial-gradient(circle_at_center,#FFF FFF_0%,#E4DDFF_51%,#9887E3_100%)] border-2 border-purple-400/40"
              >
                <img src="/images/microphone.svg" alt="sound icon" />
              </button>
            </div>

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
