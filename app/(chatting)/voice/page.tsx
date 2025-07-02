"use client";

import AnimatedBlob from "@/components/UI/animatedBlob";
import Link from "next/link";
import { useState, useRef } from "react";

const VoicePage = () => {
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [volume, setVolume] = useState(0);
  const [pingSize, setPingSize] = useState(20);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const visualizeVolume = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    volumeIntervalRef.current = setInterval(() => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      setVolume(avg);
      const newPingSize = Math.min(100, 20 + (avg / 255) * 80);
      setPingSize(newPingSize);
    }, 50);
  };

  const startRecording = async () => {
    try {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl("");
        setAudioBlob(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 64;

      source.connect(analyser);

      audioContextRef.current = context;
      analyserRef.current = analyser;

      visualizeVolume();

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        if (audioContextRef.current) {
          audioContextRef.current.close();
        }

        if (volumeIntervalRef.current) {
          clearInterval(volumeIntervalRef.current);
          volumeIntervalRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();
    } catch (error) {
      console.error("Microphone access denied:", error);
      setIsMicPressed(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const handleMicPress = async () => {
    if (!isMicPressed && !isRecording) {
      setIsMicPressed(true);
      await startRecording();
    } else if (isMicPressed && isRecording) {
      setIsMicPressed(false);
      stopRecording();
    }
  };

  const isBrowserSupported =
    typeof navigator !== "undefined" &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === "function";

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 relative">
      <button className="flex justify-center items-center self-end rounded-full w-14 h-14 bg-white shadow-md absolute lg:top-[-1%] xs:top-[0.5%]">
        <img src="/images/sound.svg" alt="sound icon" className="w-8 h-5" />
      </button>

      <div className="text-center w-full max-w-[360px] flex flex-col items-center">
        {/* <div className="relative w-[100%] h-[100%]">
          <AnimatedBlob />
          <img
            src="/images/sphere1.svg"
            alt="sphere"
            className="absolute w-[70%] h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-[spin_30s_linear_infinite]"
          />
        </div> */}
        <img
          src="/images/sphere1.svg"
          alt="sphere"
          className="lg:w-[250px] lg:h-[250px] xs:w-[200px] xs:h-[200px] animate-[spin_30s_linear_infinite] mb-4"
        />

        <p className="text-[#907DE0] text-3xl mb-6">
          {isRecording ? formatTime(recordingTime) : "00:00"}
        </p>

        <div className="flex flex-row justify-between items-center w-full px-2">
          <button onClick={stopRecording}>
            <img
              src="/images/right-btn-voice.svg"
              alt="stop recording icon"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </button>

          <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28">
            {isMicPressed &&
              [0.2, 0.4, 0.8].map((duration, idx) => (
                <div
                  key={idx}
                  className="absolute rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40"
                  style={{
                    width: `${pingSize * 4}px`,
                    height: `${pingSize * 4}px`,
                    transition: `all ${duration}s ease-in-out`,
                  }}
                />
              ))}

            <button
              onClick={handleMicPress}
              disabled={!isBrowserSupported}
              className={`flex z-10 justify-center items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full 
                bg-[radial-gradient(circle_at_center,#FFF_0%,#E4DDFF_51%,#9887E3_100%)]
                border-2 border-purple-400/40 
                ${
                  !isBrowserSupported
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                transition-all duration-300`}
            >
              <img
                src="/images/microphone.svg"
                alt="microphone icon"
                className={`${
                  isRecording ? "animate-pulse" : ""
                } w-6 h-6 sm:w-8 sm:h-8`}
              />
            </button>
          </div>

          <Link href="/">
            <button>
              <img
                src="/images/left-btn-voice.svg"
                alt="back"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoicePage;
