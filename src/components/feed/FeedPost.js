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
  const [currentReaction, setCurrentReaction] = useState(post.reaction || null);
  const [showReactions, setShowReactions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const doubleTapTimer = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const postRef = useRef(null);
  const reactionsRef = useRef(null);

  // Simulate a random time since post was created (for psychological hook)
  const getRandomTime = () => {
    const times = ['2m', '5m', '12m', '27m', '1h', '3h', '5h', '8h', '12h', '1d', '2d'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const [timeAgo] = useState(getRandomTime());

  // Available reactions
  const reactions = [
    { id: 'like', emoji: '👍', label: 'Like', color: 'text-blue-500' },
    { id: 'love', emoji: '❤️', label: 'Love', color: 'text-red-500' },
    { id: 'haha', emoji: '😂', label: 'Haha', color: 'text-yellow-500' },
    { id: 'wow', emoji: '😮', label: 'Wow', color: 'text-yellow-500' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'text-yellow-500' },
    { id: 'angry', emoji: '😡', label: 'Angry', color: 'text-orange-500' },
  ];

  // Determine if post is from a Circle or Hub
  const isFromCircle = post.circle;
  const isFromHub = post.hub;

  // Determine post type
  const isMultiImage = post.images && post.images.length > 1;
  const isVideo = post.videoUrl;
  const isPoll = post.poll;
  const isEvent = post.event;

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

  // Close reactions panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (reactionsRef.current && !reactionsRef.current.contains(event.target)) {
        setShowReactions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1);
      setCurrentReaction('like');
    } else {
      setLikesCount(prev => prev - 1);
      setCurrentReaction(null);
    }
    setIsLiked(!isLiked);
  };

  const handleReaction = (reactionId) => {
    const wasLiked = isLiked;
    const wasCurrentReaction = currentReaction === reactionId;

    // If clicking the same reaction, remove it
    if (wasCurrentReaction) {
      setCurrentReaction(null);
      if (wasLiked) {
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
      }
    } else {
      // If not previously liked, increment count
      if (!wasLiked) {
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
      setCurrentReaction(reactionId);
    }

    setShowReactions(false);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleImageDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
      setCurrentReaction('love');
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

  const getReactionEmoji = () => {
    if (!currentReaction) return null;
    const reaction = reactions.find(r => r.id === currentReaction);
    return reaction ? reaction.emoji : null;
  };

  return (
    <article ref={postRef} className="bg-white dark:bg-neutral-900 rounded-xl shadow-card mb-4 overflow-hidden animate-fade-in transition-all duration-300 hover:shadow-card-hover">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 ring-2 ring-primary-100 dark:ring-primary-900">
            <Image
              src={post.user.avatar}
              alt={post.user.username}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <Link href={`/profile/${post.user.username}`} className="font-semibold text-sm hover:underline">
                {post.user.username}
              </Link>
              {post.user.isVerified && (
                <span className="ml-1 text-primary-500 dark:text-primary-400">
                  <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                </span>
              )}

              {(isFromCircle || isFromHub) && (
                <span className="mx-1 text-neutral-400">•</span>
              )}

              {isFromCircle && (
                <Link href={`/circles/${post.circle.id}`} className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">
                  <span className="material-symbols-rounded text-sm mr-0.5">groups</span>
                  {post.circle.name}
                </Link>
              )}

              {isFromHub && (
                <Link href={`/hubs/${post.hub.id}`} className="text-sm text-secondary-600 dark:text-secondary-400 hover:underline flex items-center">
                  <span className="material-symbols-rounded text-sm mr-0.5">hub</span>
                  {post.hub.name}
                </Link>
              )}
            </div>
            {post.location && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{post.location}</p>
            )}
          </div>
        </div>
        <button className="text-neutral-700 dark:text-neutral-300 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
          <span className="material-symbols-rounded">more_horiz</span>
        </button>
      </div>

      {/* Post Content */}
      {isVideo ? (
        <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <video
            src={post.videoUrl}
            controls
            className="w-full h-full object-contain"
            poster={post.thumbnailUrl}
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {post.videoDuration}
          </div>
        </div>
      ) : isMultiImage ? (
        <div className="relative">
          {/* Multi-image carousel would go here */}
          <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800" onClick={handleImageTap}>
            <Image
              src={post.images[0]}
              alt="Post content"
              fill
              className="object-cover"
              priority={isVisible}
            />
          </div>
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            1/{post.images.length}
          </div>
        </div>
      ) : isPoll ? (
        <div className="px-4 py-3">
          <h3 className="font-medium mb-3">{post.poll.question}</h3>
          <div className="space-y-2">
            {post.poll.options.map((option, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div
                  className="absolute top-0 left-0 bottom-0 bg-primary-100 dark:bg-primary-900/30 z-0"
                  style={{ width: `${option.percentage}%` }}
                />
                <div className="relative z-10 flex justify-between items-center p-3">
                  <span>{option.text}</span>
                  <span className="font-medium">{option.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {post.poll.votes} votes • {post.poll.timeLeft} left
          </p>
        </div>
      ) : isEvent ? (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-start">
            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-lg p-3 mr-4 text-center min-w-[60px]">
              <div className="text-xs uppercase font-medium">{post.event.month}</div>
              <div className="text-xl font-bold">{post.event.day}</div>
            </div>
            <div>
              <h3 className="font-medium">{post.event.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                <span className="material-symbols-rounded text-sm align-text-bottom mr-1">schedule</span>
                {post.event.time} • {post.event.location}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-full">
                  {post.event.attendees} attending
                </span>
                <button className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full font-medium">
                  Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative" onClick={handleImageTap}>
          <div className="aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={post.imageUrl}
              alt="Post content"
              fill
              className="object-cover"
              priority={isVisible}
            />
          </div>
          {isDoubleTapLiked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-7xl animate-heart-beat">
                ❤️
              </div>
            </div>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 pt-2 flex justify-between">
        <div className="flex space-x-1">
          <div className="relative">
            <button
              className={`p-2 rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${showReactions ? 'bg-neutral-100 dark:bg-neutral-800' : ''}`}
              onClick={() => setShowReactions(!showReactions)}
              ref={reactionsRef}
            >
              {currentReaction ? (
                <span className="text-xl">{getReactionEmoji()}</span>
              ) : (
                <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">favorite_border</span>
              )}
            </button>

            {/* Reactions panel */}
            {showReactions && (
              <div className="absolute -top-16 left-0 bg-white dark:bg-neutral-800 rounded-full shadow-lg p-1 flex space-x-1 animate-fade-in z-10">
                {reactions.map(reaction => (
                  <button
                    key={reaction.id}
                    className={`p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-transform hover:scale-110 ${currentReaction === reaction.id ? 'bg-neutral-100 dark:bg-neutral-700 scale-110' : ''}`}
                    onClick={() => handleReaction(reaction.id)}
                    title={reaction.label}
                  >
                    <span className="text-xl">{reaction.emoji}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">chat_bubble_outline</span>
          </button>

          <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">share</span>
          </button>
        </div>

        <div className="flex space-x-1">
          <button
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={handleSave}
          >
            {isSaved ? (
              <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300 fill-icon">bookmark</span>
            ) : (
              <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">bookmark_border</span>
            )}
          </button>

          {post.collections && (
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <span className="material-symbols-rounded text-2xl text-neutral-700 dark:text-neutral-300">add_to_collection</span>
            </button>
          )}
        </div>
      </div>

      {/* Likes and reactions count */}
      <div className="px-4 mt-1">
        <p className="font-semibold text-sm">
          {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
        </p>
      </div>

      {/* Caption */}
      <div className="px-4 mt-1">
        <p className={`text-sm ${post.caption.length > 150 && !isExpanded ? 'line-clamp-2' : ''}`}>
          <Link href={`/profile/${post.user.username}`} className="font-semibold mr-1">
            {post.user.username}
          </Link>
          {post.caption}
        </p>
        {post.caption.length > 150 && (
          <button
            className="text-neutral-500 dark:text-neutral-400 text-sm mt-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* View comments button */}
      {post.commentsCount > 0 && !showComments && (
        <button
          className="px-4 mt-1 text-sm text-neutral-500 dark:text-neutral-400"
          onClick={() => setShowComments(true)}
        >
          View all {post.commentsCount} comments
        </button>
      )}

      {/* Comments section */}
      {showComments && <PostComments postId={post.id} />}

      {/* Posted time */}
      <div className="px-4 py-3">
        <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">
          {timeAgo} ago
        </p>
      </div>
    </article>
  );
}
