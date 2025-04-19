'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function StoryBar() {
  // Mock data for stories
  const stories = [
    { id: 1, username: 'your_story', image: 'https://i.pravatar.cc/150?img=1', isYourStory: true, hasNewStory: false, viewed: false },
    { id: 2, username: 'rahul_sharma', image: 'https://i.pravatar.cc/150?img=2', isYourStory: false, hasNewStory: true, viewed: false, isVerified: true },
    { id: 3, username: 'priya_patel', image: 'https://i.pravatar.cc/150?img=3', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 4, username: 'amit_kumar', image: 'https://i.pravatar.cc/150?img=4', isYourStory: false, hasNewStory: true, viewed: true },
    { id: 5, username: 'neha_gupta', image: 'https://i.pravatar.cc/150?img=5', isYourStory: false, hasNewStory: true, viewed: false, isVerified: true },
    { id: 6, username: 'vikram_singh', image: 'https://i.pravatar.cc/150?img=6', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 7, username: 'ananya_das', image: 'https://i.pravatar.cc/150?img=7', isYourStory: false, hasNewStory: true, viewed: true },
    { id: 8, username: 'rohan_joshi', image: 'https://i.pravatar.cc/150?img=8', isYourStory: false, hasNewStory: true, viewed: false },
    // Add spotlight stories
    { id: 9, username: 'tech_hub', image: 'https://picsum.photos/id/1/200/200', isSpotlight: true, title: 'Tech Spotlight', viewed: false },
    { id: 10, username: 'campus_news', image: 'https://picsum.photos/id/20/200/200', isSpotlight: true, title: 'Campus News', viewed: false },
  ];

  const [viewedStories, setViewedStories] = useState(
    stories.reduce((acc, story) => {
      acc[story.id] = story.viewed;
      return acc;
    }, {})
  );

  const handleStoryClick = (id) => {
    setViewedStories(prev => ({
      ...prev,
      [id]: true
    }));
    // In a real app, this would open the story viewer
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-4 rounded-xl shadow-card mb-4">
      <div className="flex space-x-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center space-y-1 min-w-[80px] group"
            onClick={() => handleStoryClick(story.id)}
          >
            <div
              className={`relative rounded-full p-[2px] transition-transform duration-200 group-hover:scale-105 ${
                story.isSpotlight
                  ? 'bg-gradient-to-tr from-tertiary-400 via-tertiary-500 to-primary-500'
                : story.hasNewStory && !viewedStories[story.id]
                  ? 'bg-gradient-to-tr from-primary-400 via-secondary-500 to-accent-500'
                  : 'bg-neutral-200 dark:bg-neutral-700'
              }`}
            >
              <div className="bg-white dark:bg-neutral-900 p-[2px] rounded-full">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.username}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {story.isYourStory && (
                <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-md">
                  <span className="material-symbols-rounded text-white text-sm">add</span>
                </div>
              )}
              {story.isSpotlight && (
                <div className="absolute bottom-0 right-0 bg-tertiary-500 rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-neutral-900 shadow-md">
                  <span className="material-symbols-rounded text-white text-sm">auto_awesome</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs truncate w-full text-center font-medium">
                {story.isYourStory ? 'Your story' : story.isSpotlight ? story.title : story.username}
              </span>
              {story.isVerified && (
                <span className="text-primary-500 dark:text-primary-400">
                  <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
