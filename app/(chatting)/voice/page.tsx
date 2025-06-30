"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const VoicePage = () => {
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [volume, setVolume] = useState(0);
  const [pingSize, setPingSize] = useState(20); // new state

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null); // new

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
    <div className="flex flex-col justify-start items-center w-full h-full p-1">
      <div className="text-center w-[350px] flex flex-col items-center">
        <img
          src="/images/pulsar.svg"
          alt="sound icon"
          className="w-[250px] h-[250px]"
        />

        <p className="text-[#907DE0] text-[36px] mt-[20px] mb-[50px]">
          {isRecording ? formatTime(recordingTime) : "00:00"}
        </p>

        <div className="flex flex-row justify-between items-center w-full">
          <button className="cursor-pointer" onClick={stopRecording}>
            <img src="/images/right-btn-voice.svg" alt="stop recording icon" />
          </button>

          <div className="relative flex items-center justify-center">
            {isMicPressed && (
              <>
                {[0.2, 0.4, 0.8].map((duration, idx) => (
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
              </>
            )}

            <button
              onClick={handleMicPress}
              disabled={!isBrowserSupported}
              className={`flex z-10 flex-row justify-center items-center w-24 h-24 rounded-full bg-[radial-gradient(circle_at_center,#FFF_0%,#E4DDFF_51%,#9887E3_100%)]
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
                className={`${isRecording ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          <Link href="/">
            <button>
              <img
                src="/images/left-btn-voice.svg"
                alt="back"
                className="rounded-full h-full aspect-square flex items-center justify-center cursor-pointer"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoicePage;
