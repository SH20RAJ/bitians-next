'use client';

import { useState } from 'react';

export default function PostActions({ isLiked, isSaved, onLike, onSave, onCommentClick }) {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLikeClick = () => {
    setIsLikeAnimating(true);
    onLike();
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  return (
    <div className="px-4 pt-2 flex justify-between">
      <div className="flex space-x-4">
        <button 
          onClick={handleLikeClick}
          className={`${isLikeAnimating ? 'animate-pulse' : ''}`}
        >
          {isLiked ? (
            <span className="material-symbols-rounded text-2xl text-red-500 fill-icon">favorite</span>
          ) : (
            <span className="material-symbols-rounded text-2xl">favorite</span>
          )}
        </button>
        <button onClick={onCommentClick}>
          <span className="material-symbols-rounded text-2xl">chat_bubble_outline</span>
        </button>
        <button>
          <span className="material-symbols-rounded text-2xl">send</span>
        </button>
      </div>
      <button onClick={onSave}>
        {isSaved ? (
          <span className="material-symbols-rounded text-2xl fill-icon">bookmark</span>
        ) : (
          <span className="material-symbols-rounded text-2xl">bookmark</span>
        )}
      </button>
    </div>
  );
}
