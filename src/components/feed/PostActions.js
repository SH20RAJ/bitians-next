'use client';

import { useState } from 'react';

export default function PostActions({ isLiked, isSaved, onLike, onSave, onCommentClick, onShare, reaction }) {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);

  const handleLikeClick = () => {
    setIsLikeAnimating(true);
    onLike();
    setTimeout(() => setIsLikeAnimating(false), 300);
  };

  // Get reaction emoji based on reaction type
  const getReactionEmoji = () => {
    const reactions = {
      like: '👍',
      love: '❤️',
      haha: '😂',
      wow: '😮',
      sad: '😢',
      angry: '😡'
    };

    return reactions[reaction] || null;
  };

  return (
    <div className="px-4 pt-2 flex justify-between">
      <div className="flex space-x-1">
        <button
          onClick={handleLikeClick}
          className={`p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${isLikeAnimating ? 'animate-pulse' : ''}`}
        >
          {reaction ? (
            <span className="text-xl">{getReactionEmoji()}</span>
          ) : isLiked ? (
            <span className="material-symbols-rounded text-2xl text-accent-500 fill-icon">favorite</span>
          ) : (
            <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">favorite_border</span>
          )}
        </button>
        <button
          onClick={onCommentClick}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">chat_bubble_outline</span>
        </button>
        <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={onShare}>
          <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">share</span>
        </button>
      </div>
      <button
        onClick={onSave}
        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        {isSaved ? (
          <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300 fill-icon">bookmark</span>
        ) : (
          <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">bookmark_border</span>
        )}
      </button>
    </div>
  );
}
