import React, { useState, useEffect } from "react";

interface TimerBlockProps {
  isCollapsed?: boolean;
  initialMinutes?: number;
  initialSeconds?: number;
}

const TimerBlock: React.FC<TimerBlockProps> = ({
  isCollapsed = false,
  initialMinutes = 1,
  initialSeconds = 40,
}) => {
  const [timeLeft, setTimeLeft] = useState(
    initialMinutes * 60 + initialSeconds
  );
  const totalTime = initialMinutes * 60 + initialSeconds;

  // Calculate progress percentage (0 to 100)
  const progress = (timeLeft / totalTime) * 100;

  // Calculate the stroke-dashoffset based on progress
  // Circumference of circle = 2 * PI * r = 2 * 3.14159 * 48 ≈ 301.59
  const circumference = 2 * Math.PI * 48;
  const dashOffset = circumference * (1 - progress / 100);

  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Uncomment this to make the timer actually count down
  //   useEffect(() => {
  //     if (timeLeft <= 0) return;

  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [timeLeft]);

  return (
    <div
      className={`flex ${
        isCollapsed
          ? "justify-center"
          : "flex-col justify-between items-center lg:gap-6 xs:gap-2"
      }`}
    >
      {!isCollapsed && (
        <p className="text-center text-md font-medium text-gray-900">
          الوقت المتبقي مع الوكيل
        </p>
      )}
      <div className="relative">
        {isCollapsed ? (
          <span className="text-[#907DE0] font-medium xl:text-2xl text-xl drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.16)]">
            01:40
          </span>
        ) : (
          <div className="lg:w-[150px] lg:h-[150px] xs:w-[100px] xs:h-[100px] rounded-full flex items-center justify-center relative border border-[#E6E6FA]">
            {/* Second border - slightly smaller */}
            <div className="lg:w-[143px] lg:h-[143px] xs:w-[93px] xs:h-[93px] rounded-full border border-[#F5F5FA] absolute inset-0 m-auto shadow-[0px_0px_3px_0px_rgba(0,0,0,0.05)]"></div>
            <div className="lg:w-[135px] lg:h-[135px] lg:w-[85px] lg:h-[85px] rounded-full border border-[#F5F5FA] absolute inset-0 m-auto"></div>

            {/* Inner white circle with shadow */}
            <span className="text-[#907DE0] font-medium lg:text-4xl xs:text-2xl drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.16)]">
              01:40
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerBlock;
