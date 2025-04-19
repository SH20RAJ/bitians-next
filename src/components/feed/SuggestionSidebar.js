'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SuggestionSidebar() {
  // Mock data for suggestions
  const suggestions = [
    { id: 1, username: 'neha_gupta', avatar: 'https://i.pravatar.cc/150?img=5', isFollowing: false, reason: 'New to Instagram' },
    { id: 2, username: 'vikram_singh', avatar: 'https://i.pravatar.cc/150?img=6', isFollowing: false, reason: 'Followed by rahul_sharma' },
    { id: 3, username: 'ananya_das', avatar: 'https://i.pravatar.cc/150?img=7', isFollowing: false, reason: 'Suggested for you' },
    { id: 4, username: 'rohan_joshi', avatar: 'https://i.pravatar.cc/150?img=8', isFollowing: false, reason: 'Followed by priya_patel' },
    { id: 5, username: 'deepika_sharma', avatar: 'https://i.pravatar.cc/150?img=9', isFollowing: false, reason: 'Suggested for you' },
  ];

  const [followState, setFollowState] = useState(
    suggestions.reduce((acc, suggestion) => {
      acc[suggestion.id] = suggestion.isFollowing;
      return acc;
    }, {})
  );

  const handleFollow = (id) => {
    setFollowState(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="hidden lg:block w-[320px] pl-8">
      {/* User profile */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
            <Image
              src="https://i.pravatar.cc/150?img=1"
              alt="Your profile"
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
          <div>
            <Link href="/profile" className="font-semibold text-sm">
              your_username
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your Name</p>
          </div>
        </div>
        <button className="text-blue-500 text-xs font-semibold">Switch</button>
      </div>

      {/* Suggestions header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Suggestions For You</h3>
        <button className="text-xs font-semibold">See All</button>
      </div>

      {/* Suggestions list */}
      <div className="space-y-3">
        {suggestions.map(suggestion => (
          <div key={suggestion.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full overflow-hidden mr-3">
                <Image
                  src={suggestion.avatar}
                  alt={suggestion.username}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </div>
              <div>
                <Link href={`/profile/${suggestion.username}`} className="text-sm font-semibold">
                  {suggestion.username}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400">{suggestion.reason}</p>
              </div>
            </div>
            <button 
              className={`text-xs font-semibold ${followState[suggestion.id] ? 'text-gray-800 dark:text-gray-200' : 'text-blue-500'}`}
              onClick={() => handleFollow(suggestion.id)}
            >
              {followState[suggestion.id] ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap gap-x-1 gap-y-1 mb-4">
          <Link href="#" className="hover:underline">About</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Help</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Press</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">API</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Jobs</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Privacy</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Terms</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Locations</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Language</Link>
        </div>
        <p>© 2023 BITIANS FROM BIT MESRA</p>
      </div>
    </div>
  );
}
