import { useState, useRef, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoActions from '../components/VideoActions';
import BottomNav from '../components/BottomNav';

const videos = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    username: '@naturelover',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
    description: 'Beautiful yellow flowers blooming 🌸',
    tags: ['nature', 'flowers', 'spring'],
    likes: 1234,
    comments: 89,
    shares: 45,
    hasLiked: false
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4',
    username: '@oceanviews',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ocean',
    description: 'Peaceful ocean waves 🌊',
    tags: ['ocean', 'waves', 'peace'],
    likes: 2345,
    comments: 123,
    shares: 67,
    hasLiked: false
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4',
    username: '@forestlife',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=forest',
    description: 'Morning sunlight in the forest ☀️',
    tags: ['forest', 'nature', 'sunlight'],
    likes: 3456,
    comments: 234,
    shares: 89,
    hasLiked: false
  }
];

export default function VideoFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const videoHeight = container.clientHeight;
    const index = Math.round(scrollTop / videoHeight);
    
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);

  return (
    <div className="h-screen bg-black">
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory"
        onScroll={handleScroll}
      >
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="h-full snap-start snap-always relative"
          >
            <VideoPlayer
              url={video.url}
              isActive={index === currentIndex}
            />
            <VideoActions video={video} />
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}