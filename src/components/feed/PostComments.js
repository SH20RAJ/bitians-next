'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Mock comments data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockComments = [
        {
          id: 1,
          username: 'rahul_sharma',
          avatar: 'https://i.pravatar.cc/150?img=2',
          text: 'This is amazing! 🔥',
          likes: 12,
          timeAgo: '2h',
          isLiked: false
        },
        {
          id: 2,
          username: 'priya_patel',
          avatar: 'https://i.pravatar.cc/150?img=3',
          text: 'Love the composition!',
          likes: 5,
          timeAgo: '1h',
          isLiked: true
        },
        {
          id: 3,
          username: 'amit_kumar',
          avatar: 'https://i.pravatar.cc/150?img=4',
          text: 'Where is this place?',
          likes: 2,
          timeAgo: '45m',
          isLiked: false
        }
      ];
      setComments(mockComments);
      setIsLoading(false);
    }, 500);
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Add new comment to the list
    const newCommentObj = {
      id: Date.now(),
      username: 'your_username', // This would come from auth context in a real app
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: newComment,
      likes: 0,
      timeAgo: 'now',
      isLiked: false
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  return (
    <div className="px-4 mt-2">
      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start">
                <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={comment.avatar}
                    alt={comment.username}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <Link href={`/profile/${comment.username}`} className="font-semibold text-sm mr-1">
                        {comment.username}
                      </Link>
                      <span className="text-sm">{comment.text}</span>
                      <div className="flex items-center mt-1 space-x-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timeAgo}</span>
                        {comment.likes > 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">{comment.likes} likes</span>
                        )}
                        <button className="text-xs text-gray-500 dark:text-gray-400">Reply</button>
                      </div>
                    </div>
                    <button 
                      className="ml-2"
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      {comment.isLiked ? (
                        <span className="material-symbols-rounded text-sm text-red-500 fill-icon">favorite</span>
                      ) : (
                        <span className="material-symbols-rounded text-sm">favorite</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleCommentSubmit} className="mt-3 flex items-center border-t border-gray-200 dark:border-gray-800 pt-3">
            <button 
              type="button"
              className="mr-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <span className="material-symbols-rounded">mood</span>
            </button>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 bg-transparent focus:outline-none text-sm"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button 
              type="submit"
              className={`text-blue-500 font-semibold text-sm ${!newComment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!newComment.trim()}
            >
              Post
            </button>
          </form>
        </>
      )}
    </div>
  );
}
