import { useState, useRef, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoInfo from '../components/VideoInfo';
import BottomNav from '../components/BottomNav';
import { videos } from '../data/videos';

export default function Express() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    
    if (Math.abs(delta) < 50) return;

    if (delta > 0 && currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (delta < 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
      return () => container.removeEventListener('wheel', handleScroll);
    }
  }, [currentIndex]);

  return (
    <div className="h-screen bg-gray-950 overflow-hidden">
      <div ref={containerRef} className="relative h-full">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ${
              index === currentIndex ? 'translate-y-0' :
              index < currentIndex ? '-translate-y-full' : 'translate-y-full'
            }`}
          >
            <div className="relative h-full">
              <VideoPlayer
                url={video.url}
                isActive={index === currentIndex}
              />
              <VideoInfo video={video} />
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}