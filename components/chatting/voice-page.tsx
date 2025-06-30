'use client'

import AnimatedBlob from "../UI/animatedBlob";
import { useState, useRef, useEffect } from "react";

const VoicePage = () => {
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState('');
  
  // Новые состояния для предварительного прослушивания
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null); // Ref для audio элемента

  // Конфигурация для отправки на бэк
  const API_CONFIG = {
    url: 'https://your-backend-api.com/upload-audio',
    method: 'POST',
    headers: {
      // 'Authorization': 'Bearer your-token',
    }
  };

  // Очистка ресурсов при размонтировании компонента
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        //@ts-ignore
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Форматирование времени записи
        //@ts-ignore

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Запуск таймера
  const startTimer = () => {
        //@ts-ignore

    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // Остановка таймера
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Начало записи
  const startRecording = async () => {
    try {
      // Очищаем предыдущую запись
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl('');
        setAudioBlob(null);
        setShowPreview(false);
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });
        //@ts-ignore

      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
        //@ts-ignore

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
        //@ts-ignore

          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { 
          type: 'audio/webm' 
        });
        
        // Создаем URL для предварительного прослушивания
        const url = URL.createObjectURL(blob);
        //@ts-ignore

        setAudioBlob(blob);
        setAudioUrl(url);
        setShowPreview(true);
        
        // Очищаем поток
        if (streamRef.current) {
        //@ts-ignore

          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();
      setStatus('Запись...');

    } catch (error) {
      console.error('Ошибка при доступе к микрофону:', error);
      setStatus('Ошибка доступа к микрофону');
      setIsMicPressed(false);
      
      setTimeout(() => setStatus(''), 3000);
    }
  };

  // Остановка записи
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
        //@ts-ignore

      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
      setStatus('Запись готова!');
    }
  };

  // Воспроизведение/пауза записи
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
        //@ts-ignore

      audioRef.current.pause();
      setIsPlaying(false);
    } else {
        //@ts-ignore

      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Отправка аудио на бэк
  const uploadAudio = async () => {
    if (!audioBlob) return;

    try {
      setIsUploading(true);
      setStatus('Отправка...');

      const formData = new FormData();
      formData.append('audio', audioBlob, `recording_${Date.now()}.webm`);
      formData.append('duration', recordingTime.toString());
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(API_CONFIG.url, {
        method: API_CONFIG.method,
        body: formData,
        ...API_CONFIG.headers && { headers: API_CONFIG.headers }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Аудио успешно отправлено:', result);
        setStatus('Отправлено!');
        setShowPreview(false);
        setAudioBlob(null);
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
          setAudioUrl('');
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

    } catch (error) {
      console.error('Ошибка при отправке аудио:', error);
      setStatus('Ошибка отправки');
    } finally {
      setIsUploading(false);
      
      setTimeout(() => {
        setStatus('');
        setRecordingTime(0);
      }, 3000);
    }
  };

  // Скачивание файла для проверки
  const downloadAudio = () => {
    if (!audioUrl) return;

    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `recording_${new Date().toISOString()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Удаление записи
  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl('');
    setAudioBlob(null);
    setShowPreview(false);
    setRecordingTime(0);
    setStatus('');
    setIsPlaying(false);
  };

  // Обработчик нажатия на кнопку микрофона
  const handleMicPress = async () => {
    if (!isMicPressed && !isRecording) {
      setIsMicPressed(true);
      await startRecording();
    } else if (isMicPressed && isRecording) {
      setIsMicPressed(false);
      stopRecording();
    }
  };

  const isBrowserSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

  return (
    <>
      <div className="flex flex-col justify-start items-center w-full h-full p-1">
        <button className="flex flex-col justify-center items-center mr-auto rounded-full pt-[29px] pb-[29px] pr-[23px] pl-[23px] bg-white">
          <img src="/images/sound.svg" alt="sound icon" />
        </button>

        <div className="text-center pb-[400px]">
          {isMicPressed ? (
            <div className="relative w-[100%] h-[100%]">
              <AnimatedBlob />
              <img  
                src="/images/sphere1.svg"
                alt="sphere"
                className="absolute w-[70%] h-[70%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              />
            </div>
          ) : (
            <img src="/images/pulsar.svg" alt="sound icon" />
          )}
          
          <p className="text-[#907DE0] text-[36px]">
            {isRecording ? formatTime(recordingTime) : "00:00"}
          </p>
          
          {status && (
            <p className={`text-[16px] mt-2 ${
              status.includes('Ошибка') ? 'text-red-500' : 
              status.includes('Отправлено') ? 'text-green-500' : 
              'text-blue-500'
            }`}>
              {status}
            </p>
          )}

          {/* Панель предварительного прослушивания */}
          {showPreview && audioUrl && (
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-200/30">
              <h3 className="text-[#907DE0] text-[18px] mb-4">Предварительное прослушивание</h3>
              
              {/* Скрытый audio элемент */}
              <audio 
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Кнопки управления */}
              <div className="flex flex-row justify-center items-center gap-4 mb-4">
                {/* Кнопка воспроизведения/паузы */}
                <button
                  onClick={togglePlayback}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-[#907DE0] text-white hover:bg-[#7B6BCB] transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>

                {/* Кнопка скачивания */}
                <button
                  onClick={downloadAudio}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                  title="Скачать запись"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>

                {/* Кнопка удаления */}
                <button
                  onClick={deleteRecording}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  title="Удалить запись"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Кнопка отправки */}
              <button
                onClick={uploadAudio}
                disabled={isUploading}
                className="w-full py-3 px-6 bg-[#907DE0] text-white rounded-xl hover:bg-[#7B6BCB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Отправка...' : 'Отправить на сервер'}
              </button>
            </div>
          )}
          
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
                </>
              )}
              
              <button 
                onClick={handleMicPress}
                disabled={!isBrowserSupported || isUploading}
                className={`flex z-10 flex-row justify-center items-center w-24 h-24 rounded-full 
                  ${isRecording ? 
                    'bg-[radial-gradient(circle_at_center,#FF6B6B_0%,#FF8E8E_51%,#FF5252_100%)]' : 
                    'bg-[radial-gradient(circle_at_center,#FFF_0%,#E4DDFF_51%,#9887E3_100%)]'
                  } 
                  border-2 border-purple-400/40 
                  ${!isBrowserSupported || isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  transition-all duration-300`}
              >
                <img 
                  src="/images/microphone.svg" 
                  alt="microphone icon" 
                  className={`${isRecording ? 'animate-pulse' : ''}`}
                />
              </button>
            </div>

            <button>
              <img src="/images/left-btn-voice.svg" alt="sound icon" />
            </button>
          </div>
          
          {!isBrowserSupported && (
            <p className="text-red-500 text-[14px] mt-4">
              Ваш браузер не поддерживает запись аудио
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default VoicePage;