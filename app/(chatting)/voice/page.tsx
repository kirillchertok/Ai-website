"use client";

import Link from "next/link";
import AnimatedBlob from "../../../components/UI/animatedBlob";
import { useState, useRef, useEffect } from "react";

const VoicePage = () => {
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

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

  const startRecording = async () => {
    try {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl("");
        setAudioBlob(null);
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

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
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioBlob(blob);
        setAudioUrl(url);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();
    } catch (error) {
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
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-full p-1">
        <button className="flex flex-col justify-center items-center mr-auto rounded-full pt-[29px] pb-[29px] pr-[23px] pl-[23px] bg-white cursor-pointer">
          <img
            src="/images/sound.svg"
            alt="sound icon"
            className="w-[43px] h-[43px]"
          />
        </button>

        <div className="text-center">
          {isMicPressed ? (
            <div className="relative w-[350px] h-[350px]">
              <AnimatedBlob />
              <img
                src="/images/sphere1.svg"
                alt="sphere"
                className="absolute w-[250px] h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
          ) : (
            <img
              src="/images/pulsar.svg"
              alt="sound icon"
              className="w-[250px] h-[250px]"
            />
          )}

          <p className="text-[#907DE0] text-[36px] mt-[20px] mb-[50px]">
            {isRecording ? formatTime(recordingTime) : "00:00"}
          </p>

          <div className="flex flex-row justify-between items-center">
            <button className="cursor-pointer" onClick={stopRecording}>
              <img
                src="/images/right-btn-voice.svg"
                alt="stop recording icon"
              />
            </button>

            <div className="relative flex items-center justify-center">
              {isMicPressed && (
                <>
                  <div className="absolute w-30 h-30 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping"></div>
                  <div className="absolute w-25 h-25 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping delay-200"></div>
                  <div className="absolute w-20 h-20 rounded-full border-1 bg-gradient-to-r from-[#FAE2E1] to-[#9887E3]/40 border-purple-400/40 animate-ping delay-400"></div>
                </>
              )}

              <button
                onClick={handleMicPress}
                disabled={!isBrowserSupported || isUploading}
                className={`flex z-10 flex-row justify-center items-center w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,#FFF_0%,#E4DDFF_51%,#9887E3_100%)]
                  border-2 border-purple-400/40 
                  ${
                    !isBrowserSupported || isUploading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  transition-all duration-300`}
              >
                <img
                  src="/images/microphone.svg"
                  alt="microphone icon"
                  className={`${isRecording ? "animate-pulse" : ""}`}
                />
              </button>
            </div>

            <Link href="/">
              <button>
                <img
                  src="/images/left-btn-voice.svg"
                  alt="sound icon"
                  className="p-2 rounded-full h-full aspect-squareflex items-center justify-center cursor-pointer"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoicePage;
