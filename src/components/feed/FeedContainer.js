'use client';

import { useState, useEffect, useRef } from 'react';
import FeedPost from './FeedPost';
import StoryBar from './StoryBar';
import SuggestionSidebar from './SuggestionSidebar';

export default function FeedContainer() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);
  const loaderRef = useRef(null);

  // Mock data for posts
  const generateMockPosts = (page, perPage = 5) => {
    const startIndex = (page - 1) * perPage;
    return Array.from({ length: perPage }, (_, i) => {
      const id = startIndex + i + 1;
      return {
        id,
        user: {
          username: ['rahul_sharma', 'priya_patel', 'amit_kumar', 'neha_gupta', 'vikram_singh'][id % 5],
          avatar: `https://i.pravatar.cc/150?img=${(id % 10) + 1}`,
        },
        imageUrl: `https://picsum.photos/id/${(id * 10) % 1000}/600/600`,
        caption: [
          'Enjoying the weekend! #weekend #fun',
          'Beautiful sunset today 🌅 #nature #photography',
          'New project coming soon! Stay tuned 👀',
          'Campus life at BIT Mesra ❤️ #college #bitians',
          'Study session with friends #study #exams'
        ][id % 5],
        likesCount: Math.floor(Math.random() * 1000) + 10,
        commentsCount: Math.floor(Math.random() * 50) + 1,
        isLiked: Math.random() > 0.7,
        isSaved: Math.random() > 0.8,
        location: Math.random() > 0.5 ? 'BIT Mesra, Ranchi' : null,
      };
    });
  };

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(generateMockPosts(1));
      setIsLoading(false);
    }, 1000);

    // Simulate new posts notification after some time (psychological hook)
    const newPostTimer = setTimeout(() => {
      setNewPostsAvailable(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(newPostTimer);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading]);

  const loadMorePosts = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newPosts = generateMockPosts(page + 1);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);
      setIsLoading(false);
      
      // Stop after 5 pages (for demo purposes)
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setNewPostsAvailable(false);
    
    // Simulate API call
    setTimeout(() => {
      const newPosts = generateMockPosts(1);
      setPosts(newPosts);
      setIsLoading(false);
      setPage(1);
      setHasMore(true);
    }, 1000);
  };

  return (
    <div className="max-w-[935px] mx-auto pt-4 pb-20 md:pb-0 flex">
      <div className="flex-1 max-w-[630px]">
        {/* New posts notification */}
        {newPostsAvailable && (
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 flex items-center justify-center"
            onClick={handleRefresh}
          >
            <span className="material-symbols-rounded mr-1">refresh</span>
            New posts available
          </button>
        )}
        
        {/* Stories */}
        <StoryBar />
        
        {/* Feed posts */}
        <div className="mt-4">
          {posts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          )}
          
          {/* Infinite scroll trigger */}
          {hasMore && <div ref={loaderRef} className="h-10" />}
          
          {/* End of feed message */}
          {!hasMore && !isLoading && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>You're all caught up!</p>
              <p className="text-sm mt-1">You've seen all new posts from the past 3 days.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Suggestions sidebar */}
      <SuggestionSidebar />
    </div>
  );
}
