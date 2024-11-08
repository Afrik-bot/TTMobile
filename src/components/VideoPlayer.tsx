import { useState, useRef, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

interface VideoPlayerProps {
  url: string;
  isActive: boolean;
}

export default function VideoPlayer({ url, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      if (isActive && !isPlaying) {
        playVideo();
      }
    };

    const handleError = (e: Event) => {
      setIsLoading(false);
      setError('Failed to load video');
      console.error('Video error:', e);
    };

    const handleEnded = () => {
      if (isActive) {
        video.currentTime = 0;
        playVideo();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isActive, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.load();
      playVideo();
    } else {
      pauseVideo();
      setIsPlaying(false);
    }

    return () => {
      pauseVideo();
    };
  }, [isActive]);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Playback error:', err);
      }
      setIsPlaying(false);
    }
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.pause();
      setIsPlaying(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Pause error:', err);
      }
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  return (
    <div className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
      </video>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center">
            <p className="text-red-500 text-lg font-medium mb-2">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                setIsLoading(true);
                const video = videoRef.current;
                if (video) {
                  video.load();
                }
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleMute}
        className="absolute bottom-24 right-4 p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors z-10"
      >
        {isMuted ? (
          <SpeakerXMarkIcon className="w-6 h-6" />
        ) : (
          <SpeakerWaveIcon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}