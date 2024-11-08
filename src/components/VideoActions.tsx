import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface VideoActionsProps {
  video: {
    likes: number;
    comments: number;
    shares: number;
    hasLiked: boolean;
  };
}

export default function VideoActions({ video }: VideoActionsProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <button className="flex flex-col items-center">
        {video.hasLiked ? (
          <HeartIconSolid className="w-8 h-8 text-red-500" />
        ) : (
          <HeartIcon className="w-8 h-8 text-white" />
        )}
        <span className="text-white text-xs">{video.likes}</span>
      </button>
      
      <button className="flex flex-col items-center">
        <ChatBubbleOvalLeftIcon className="w-8 h-8 text-white" />
        <span className="text-white text-xs">{video.comments}</span>
      </button>
      
      <button className="flex flex-col items-center">
        <ShareIcon className="w-8 h-8 text-white" />
        <span className="text-white text-xs">{video.shares}</span>
      </button>
    </div>
  );
}