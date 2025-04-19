'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SuggestionSidebar() {
  // Mock data for suggestions
  const suggestions = [
    {
      id: 1,
      name: 'Neha Gupta',
      username: 'neha_gupta',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isFollowing: false,
      reason: 'New to BITians',
      department: 'Computer Science',
      year: '2nd Year',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Vikram Singh',
      username: 'vikram_singh',
      avatar: 'https://i.pravatar.cc/150?img=6',
      isFollowing: false,
      reason: 'Followed by rahul_sharma',
      department: 'Electrical Engineering',
      year: '3rd Year',
    },
    {
      id: 3,
      name: 'Ananya Das',
      username: 'ananya_das',
      avatar: 'https://i.pravatar.cc/150?img=7',
      isFollowing: false,
      reason: 'In your department',
      department: 'Computer Science',
      year: '1st Year',
    },
    {
      id: 4,
      name: 'Rohan Joshi',
      username: 'rohan_joshi',
      avatar: 'https://i.pravatar.cc/150?img=8',
      isFollowing: false,
      reason: 'Followed by priya_patel',
      department: 'Mechanical Engineering',
      year: '4th Year',
      isVerified: true,
    },
    {
      id: 5,
      name: 'Deepika Sharma',
      username: 'deepika_sharma',
      avatar: 'https://i.pravatar.cc/150?img=9',
      isFollowing: false,
      reason: 'Suggested for you',
      department: 'Civil Engineering',
      year: '2nd Year',
    },
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
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">Suggestions For You</h2>
      </div>

      {/* User profile */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-14 w-14 rounded-full overflow-hidden mr-4 ring-2 ring-primary-100 dark:ring-primary-900">
              <Image
                src="https://i.pravatar.cc/150?img=1"
                alt="Your profile"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center">
                <Link href="/profile" className="font-semibold text-sm hover:underline">
                  your_username
                </Link>
                <span className="ml-1 text-primary-500 dark:text-primary-400">
                  <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                </span>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Your Name</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Computer Science • 3rd Year</p>
            </div>
          </div>
          <button className="text-primary-600 dark:text-primary-400 text-xs font-medium px-3 py-1 rounded-full border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="flex justify-between mt-4 text-center">
          <div className="flex-1">
            <p className="font-semibold">42</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Posts</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">256</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Followers</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">189</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Following</p>
          </div>
        </div>
      </div>

      {/* Suggestions list */}
      <div className="p-4">
        <div className="space-y-4">
          {suggestions.map(suggestion => (
            <div key={suggestion.id} className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3 ring-2 ring-primary-100 dark:ring-primary-900">
                  <Image
                    src={suggestion.avatar}
                    alt={suggestion.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <Link href={`/profile/${suggestion.username}`} className="text-sm font-semibold hover:underline">
                      {suggestion.name}
                    </Link>
                    {suggestion.isVerified && (
                      <span className="ml-1 text-primary-500 dark:text-primary-400">
                        <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">@{suggestion.username}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {suggestion.department} • {suggestion.year}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 italic">
                    {suggestion.reason}
                  </p>
                </div>
              </div>
              <button
                className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${followState[suggestion.id]
                  ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'}`}
                onClick={() => handleFollow(suggestion.id)}
              >
                {followState[suggestion.id] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-sm text-primary-600 dark:text-primary-400 font-medium py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
          See All Suggestions
        </button>
      </div>

      {/* Footer links */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex flex-wrap gap-x-1 gap-y-1 mb-4">
          <Link href="#" className="hover:underline">About</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Help</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Privacy</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Terms</Link>
          <span>·</span>
          <Link href="#" className="hover:underline">Contact</Link>
        </div>
        <p>© 2023 BITIANS FROM BIT MESRA</p>
      </div>
    </div>
  );
}
