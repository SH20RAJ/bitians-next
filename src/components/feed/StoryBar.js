'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function StoryBar() {
  // Mock data for stories
  const stories = [
    { id: 1, username: 'your_story', image: 'https://i.pravatar.cc/150?img=1', isYourStory: true, hasNewStory: false, viewed: false },
    { id: 2, username: 'rahul_sharma', image: 'https://i.pravatar.cc/150?img=2', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 3, username: 'priya_patel', image: 'https://i.pravatar.cc/150?img=3', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 4, username: 'amit_kumar', image: 'https://i.pravatar.cc/150?img=4', isYourStory: false, hasNewStory: true, viewed: true },
    { id: 5, username: 'neha_gupta', image: 'https://i.pravatar.cc/150?img=5', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 6, username: 'vikram_singh', image: 'https://i.pravatar.cc/150?img=6', isYourStory: false, hasNewStory: true, viewed: false },
    { id: 7, username: 'ananya_das', image: 'https://i.pravatar.cc/150?img=7', isYourStory: false, hasNewStory: true, viewed: true },
    { id: 8, username: 'rohan_joshi', image: 'https://i.pravatar.cc/150?img=8', isYourStory: false, hasNewStory: true, viewed: false },
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
    <div className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="flex space-x-4 overflow-x-auto px-4 pb-1 hide-scrollbar">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center space-y-1 min-w-[72px]"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className={`relative rounded-full p-[2px] ${
              story.hasNewStory && !viewedStories[story.id]
                ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}>
              <div className="bg-white dark:bg-black p-[2px] rounded-full">
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.username}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {story.isYourStory && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full h-6 w-6 flex items-center justify-center border-2 border-white dark:border-black">
                  <span className="material-symbols-rounded text-white text-sm">add</span>
                </div>
              )}
            </div>
            <span className="text-xs truncate w-full text-center">
              {story.isYourStory ? 'Your story' : story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
