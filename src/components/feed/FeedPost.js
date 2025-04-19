'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PostActions from './PostActions';
import PostComments from './PostComments';

export default function FeedPost({ post }) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [isDoubleTapLiked, setIsDoubleTapLiked] = useState(false);
  const doubleTapTimer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const postRef = useRef(null);

  // Simulate a random time since post was created (for psychological hook)
  const getRandomTime = () => {
    const times = ['2m', '5m', '12m', '27m', '1h', '3h', '5h', '8h', '12h', '1d', '2d'];
    return times[Math.floor(Math.random() * times.length)];
  };
  
  const [timeAgo] = useState(getRandomTime());

  // Intersection Observer for lazy loading and view tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // In a real app, you would track this view
        }
      },
      { threshold: 0.5 }
    );
    
    if (postRef.current) {
      observer.observe(postRef.current);
    }
    
    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
    } else {
      setLikesCount(prev => prev - 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleImageDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      setIsDoubleTapLiked(true);
      setTimeout(() => setIsDoubleTapLiked(false), 1000);
    }
  };

  const handleImageTap = () => {
    if (doubleTapTimer.current) {
      clearTimeout(doubleTapTimer.current);
      doubleTapTimer.current = null;
      handleImageDoubleTap();
    } else {
      doubleTapTimer.current = setTimeout(() => {
        doubleTapTimer.current = null;
        // Single tap action (none for now)
      }, 300);
    }
  };

  return (
    <article ref={postRef} className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
            <Image
              src={post.user.avatar}
              alt={post.user.username}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <Link href={`/profile/${post.user.username}`} className="font-semibold text-sm hover:underline">
              {post.user.username}
            </Link>
            {post.location && (
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.location}</p>
            )}
          </div>
        </div>
        <button className="text-gray-700 dark:text-gray-300">
          <span className="material-symbols-rounded">more_horiz</span>
        </button>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square overflow-hidden" onClick={handleImageTap}>
        <Image
          src={post.imageUrl}
          alt="Post content"
          fill
          className="object-cover"
          priority={isVisible}
        />
        {isDoubleTapLiked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-rounded text-white text-7xl animate-pulse">favorite</span>
          </div>
        )}
      </div>

      {/* Post Actions */}
      <PostActions 
        isLiked={isLiked} 
        isSaved={isSaved} 
        onLike={handleLike} 
        onSave={handleSave}
        onCommentClick={() => setShowComments(!showComments)}
      />

      {/* Likes count */}
      <div className="px-4 mt-1">
        <p className="font-semibold text-sm">
          {likesCount.toLocaleString()} likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 mt-1">
        <p className="text-sm">
          <Link href={`/profile/${post.user.username}`} className="font-semibold mr-1">
            {post.user.username}
          </Link>
          {post.caption}
        </p>
      </div>

      {/* View comments button */}
      {post.commentsCount > 0 && !showComments && (
        <button 
          className="px-4 mt-1 text-sm text-gray-500 dark:text-gray-400"
          onClick={() => setShowComments(true)}
        >
          View all {post.commentsCount} comments
        </button>
      )}

      {/* Comments section */}
      {showComments && <PostComments postId={post.id} />}

      {/* Posted time */}
      <div className="px-4 mt-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          {timeAgo} ago
        </p>
      </div>
    </article>
  );
}
