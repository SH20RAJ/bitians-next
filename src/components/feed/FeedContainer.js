'use client';

import { useState, useEffect, useRef } from 'react';
import FeedPost from './FeedPost';
import StoryBar from './StoryBar';
import SuggestionSidebar from './SuggestionSidebar';
import DiscoverSection from './DiscoverSection';

export default function FeedContainer() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);
  const [activeTab, setActiveTab] = useState('for-you');
  const loaderRef = useRef(null);

  // Mock data for posts
  const generateMockPosts = (page, perPage = 5) => {
    const startIndex = (page - 1) * perPage;
    return Array.from({ length: perPage }, (_, i) => {
      const id = startIndex + i + 1;
      const postType = Math.random();
      const isVerified = Math.random() > 0.7;

      // Randomly assign some posts to circles or hubs
      const isFromCircle = Math.random() > 0.7;
      const isFromHub = !isFromCircle && Math.random() > 0.7;

      // Randomly create different post types
      const hasMultipleImages = Math.random() > 0.8;
      const isVideo = !hasMultipleImages && Math.random() > 0.8;
      const isPoll = !hasMultipleImages && !isVideo && Math.random() > 0.8;
      const isEvent = !hasMultipleImages && !isVideo && !isPoll && Math.random() > 0.8;

      const basePost = {
        id,
        user: {
          username: ['rahul_sharma', 'priya_patel', 'amit_kumar', 'neha_gupta', 'vikram_singh'][id % 5],
          avatar: `https://i.pravatar.cc/150?img=${(id % 10) + 1}`,
          isVerified,
        },
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
        reaction: Math.random() > 0.7 ? ['like', 'love', 'haha', 'wow', 'sad', 'angry'][Math.floor(Math.random() * 6)] : null,
      };

      // Add circle or hub info if applicable
      if (isFromCircle) {
        basePost.circle = {
          id: Math.floor(Math.random() * 4) + 1,
          name: ['CS Department', 'Project Team', 'Study Group', 'Campus Events'][Math.floor(Math.random() * 4)],
        };
      } else if (isFromHub) {
        basePost.hub = {
          id: Math.floor(Math.random() * 4) + 1,
          name: ['Tech Discussions', 'Campus Life', 'Career Advice', 'Hobby Club'][Math.floor(Math.random() * 4)],
        };
      }

      // Add specific content based on post type
      if (isVideo) {
        return {
          ...basePost,
          videoUrl: 'https://example.com/video.mp4', // This would be a real video URL in a real app
          thumbnailUrl: `https://picsum.photos/id/${(id * 10) % 1000}/600/400`,
          videoDuration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        };
      } else if (hasMultipleImages) {
        return {
          ...basePost,
          images: Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (_, i) =>
            `https://picsum.photos/id/${((id + i) * 10) % 1000}/600/600`
          ),
        };
      } else if (isPoll) {
        return {
          ...basePost,
          poll: {
            question: [
              'What\'s your favorite programming language?',
              'Best place to study on campus?',
              'Should we have more online classes?',
              'Favorite campus food?'
            ][id % 4],
            options: [
              { text: 'Option A', percentage: Math.floor(Math.random() * 100) },
              { text: 'Option B', percentage: Math.floor(Math.random() * 100) },
              { text: 'Option C', percentage: Math.floor(Math.random() * 100) },
            ],
            votes: Math.floor(Math.random() * 500) + 50,
            timeLeft: `${Math.floor(Math.random() * 24) + 1} hours`,
          },
        };
      } else if (isEvent) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[Math.floor(Math.random() * 12)];
        const day = Math.floor(Math.random() * 28) + 1;

        return {
          ...basePost,
          event: {
            title: [
              'Campus Hackathon',
              'Tech Fest 2023',
              'Alumni Meetup',
              'Workshop: AI Basics'
            ][id % 4],
            month,
            day,
            time: `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
            location: ['Main Auditorium', 'CS Department', 'Central Lawn', 'Library'][id % 4],
            attendees: Math.floor(Math.random() * 200) + 20,
          },
        };
      } else {
        return {
          ...basePost,
          imageUrl: `https://picsum.photos/id/${(id * 10) % 1000}/600/600`,
        };
      }
    });
  };

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/posts?page=1&limit=5');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();

        // Transform the data to match the component's expected format
        const transformedPosts = data.posts.map(post => {
          // Base post object
          const basePost = {
            id: post.id,
            user: {
              username: post.user.username,
              avatar: post.user.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
              isVerified: post.user.isVerified,
            },
            caption: post.content,
            likesCount: post.likesCount,
            commentsCount: post.commentsCount,
            isLiked: false, // We'll need to implement this with the actual user data
            isSaved: false, // We'll need to implement this with the actual user data
            location: null, // Add location if available in the API
          };

          // Add media
          if (post.media && post.media.length > 0) {
            if (post.media.length === 1) {
              basePost.imageUrl = post.media[0].url;
            } else {
              basePost.images = post.media.map(m => m.url);
            }
          }

          return basePost;
        });

        setPosts(transformedPosts);
        setHasMore(data.pagination.hasMore);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to mock data if API fails
        setPosts(generateMockPosts(1));
        setIsLoading(false);
      }
    };

    fetchPosts();

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
      { threshold: 0.5 }
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

  const loadMorePosts = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/posts?page=${nextPage}&limit=5`);

      if (!response.ok) {
        throw new Error('Failed to fetch more posts');
      }

      const data = await response.json();

      // Transform the data to match the component's expected format
      const transformedPosts = data.posts.map(post => {
        // Base post object
        const basePost = {
          id: post.id,
          user: {
            username: post.user.username,
            avatar: post.user.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
            isVerified: post.user.isVerified,
          },
          caption: post.content,
          likesCount: post.likesCount,
          commentsCount: post.commentsCount,
          isLiked: false,
          isSaved: false,
          location: null,
        };

        // Add media
        if (post.media && post.media.length > 0) {
          if (post.media.length === 1) {
            basePost.imageUrl = post.media[0].url;
          } else {
            basePost.images = post.media.map(m => m.url);
          }
        }

        return basePost;
      });

      setPosts(prev => [...prev, ...transformedPosts]);
      setPage(nextPage);
      setHasMore(data.pagination.hasMore);
    } catch (error) {
      console.error('Error fetching more posts:', error);
      // Fallback to mock data if API fails
      const newPosts = generateMockPosts(page + 1);
      setPosts(prev => [...prev, ...newPosts]);
      setPage(prev => prev + 1);

      // Stop after 5 pages (for demo purposes)
      if (page >= 5) {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setNewPostsAvailable(false);

    try {
      const response = await fetch('/api/posts?page=1&limit=5');

      if (!response.ok) {
        throw new Error('Failed to refresh posts');
      }

      const data = await response.json();

      // Transform the data to match the component's expected format
      const transformedPosts = data.posts.map(post => {
        // Base post object
        const basePost = {
          id: post.id,
          user: {
            username: post.user.username,
            avatar: post.user.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
            isVerified: post.user.isVerified,
          },
          caption: post.content,
          likesCount: post.likesCount,
          commentsCount: post.commentsCount,
          isLiked: false,
          isSaved: false,
          location: null,
        };

        // Add media
        if (post.media && post.media.length > 0) {
          if (post.media.length === 1) {
            basePost.imageUrl = post.media[0].url;
          } else {
            basePost.images = post.media.map(m => m.url);
          }
        }

        return basePost;
      });

      setPosts(transformedPosts);
      setHasMore(data.pagination.hasMore);
    } catch (error) {
      console.error('Error refreshing posts:', error);
      // Fallback to mock data if API fails
      const newPosts = generateMockPosts(1);
      setPosts(newPosts);
    } finally {
      setIsLoading(false);
      setPage(1);
      setHasMore(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-24 md:pb-0 px-2 sm:px-4 lg:px-8 flex flex-col lg:flex-row gap-4 overflow-x-hidden">
      {/* Main feed column */}
      <div className="flex-1 max-w-full sm:max-w-[650px] mx-auto lg:mx-0 w-full">
        {/* Feed tabs */}
        <div className="flex mb-4 bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
          <button
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${activeTab === 'for-you' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-600 dark:text-neutral-400'}`}
            onClick={() => setActiveTab('for-you')}
          >
            For You
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${activeTab === 'following' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-600 dark:text-neutral-400'}`}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
          <button
            className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${activeTab === 'circles' ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500' : 'text-neutral-600 dark:text-neutral-400'}`}
            onClick={() => setActiveTab('circles')}
          >
            Circles
          </button>
        </div>

        {/* New posts notification */}
        {newPostsAvailable && (
          <button
            className="w-full bg-primary-500 text-white py-2 rounded-xl mb-4 flex items-center justify-center shadow-md hover:bg-primary-600 transition-colors"
            onClick={handleRefresh}
          >
            <span className="material-symbols-rounded mr-1">refresh</span>
            New posts available
          </button>
        )}

        {/* Stories */}
        <StoryBar />

        {/* Feed posts */}
        <div className="space-y-4 max-w-full overflow-hidden">
          {posts.map(post => (
            <FeedPost key={post.id} post={post} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
            </div>
          )}

          {/* Infinite scroll trigger */}
          {hasMore && <div ref={loaderRef} className="h-10" />}

          {/* End of feed message */}
          {!hasMore && !isLoading && (
            <div className="text-center py-8 px-4 bg-white dark:bg-neutral-900 rounded-xl shadow-card">
              <div className="text-tertiary-500 mb-2">
                <span className="material-symbols-rounded text-3xl">check_circle</span>
              </div>
              <p className="font-medium">You're all caught up!</p>
              <p className="text-sm mt-1 text-neutral-500 dark:text-neutral-400">You've seen all new posts from the past 3 days.</p>
              <button className="mt-4 text-sm text-primary-600 dark:text-primary-400 font-medium px-4 py-2 rounded-full border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                Browse older posts
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="hidden lg:block w-[350px] space-y-4 flex-shrink-0">
        {/* Discover section */}
        <DiscoverSection />

        {/* Suggestions sidebar */}
        <SuggestionSidebar />
      </div>
    </div>
  );
}
