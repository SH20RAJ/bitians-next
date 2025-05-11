'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function ProfilePage() {
  const { username } = useParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  // Check if this is the current user's profile
  const isCurrentUser = session?.user?.email === profile?.email;

  useEffect(() => {
    if (status !== 'loading' && username) {
      const fetchProfileData = async () => {
        try {
          // Make sure username is defined before making the request
          const response = await fetch(`/api/users/${encodeURIComponent(username)}`);

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();

          // Transform the data to match the component's expected format
          const profileData = {
            username: data.user.username,
            name: data.user.name,
            avatar: data.user.image || `https://i.pravatar.cc/300?u=${username}`,
            bio: data.user.bio || 'Student at BIT Mesra',
            postsCount: data.user.stats.postsCount,
            followersCount: data.user.stats.followersCount,
            followingCount: data.user.stats.followingCount,
            isVerified: data.user.isVerified,
            department: data.user.department,
            year: data.user.year,
            email: data.user.email,
            isFollowing: data.user.isFollowing,
          };

          // Transform posts data
          const postsData = data.user.posts.map(post => ({
            id: post.id,
            imageUrl: post.media && post.media.length > 0 ? post.media[0].url : `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/600/600`,
            likesCount: post.likesCount,
            commentsCount: post.commentsCount,
            caption: post.content,
          }));

          setProfile(profileData);
          setPosts(postsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching profile data:', error);

          // Fallback to mock data if API fails
          const mockProfile = {
            username,
            name: username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            avatar: `https://i.pravatar.cc/300?u=${username}`,
            bio: 'Student at BIT Mesra | Computer Science | Web Developer | AI Enthusiast',
            postsCount: Math.floor(Math.random() * 100) + 10,
            followersCount: Math.floor(Math.random() * 1000) + 100,
            followingCount: Math.floor(Math.random() * 500) + 50,
            isVerified: Math.random() > 0.7,
            department: 'Computer Science',
            year: '3rd Year',
            email: Math.random() > 0.5 ? session?.user?.email : `${username}@example.com`,
            isFollowing: Math.random() > 0.5,
          };

          // Mock posts data
          const mockPosts = Array.from({ length: 12 }, (_, i) => ({
            id: i + 1,
            imageUrl: `https://picsum.photos/id/${((i + 1) * 10) % 1000}/600/600`,
            likesCount: Math.floor(Math.random() * 100) + 5,
            commentsCount: Math.floor(Math.random() * 20) + 1,
            caption: ['Enjoying the weekend!', 'Study session', 'Campus vibes', 'New project coming soon'][i % 4],
          }));

          setProfile(mockProfile);
          setPosts(mockPosts);
          setLoading(false);
        }
      };

      fetchProfileData();
    }
  }, [username, status, session]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
                <h1 className="text-2xl font-bold flex items-center justify-center md:justify-start">
                  {profile.name}
                  {profile.isVerified && (
                    <span className="ml-1 text-primary-500 dark:text-primary-400">
                      <span className="material-symbols-rounded text-lg fill-icon">verified</span>
                    </span>
                  )}
                </h1>

                {isCurrentUser ? (
                  <Link
                    href="/settings/profile"
                    className="px-4 py-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Edit Profile
                  </Link>
                ) : (
                  <button
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      profile.isFollowing
                        ? 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                        : 'bg-primary-500 hover:bg-primary-600 text-white'
                    }`}
                  >
                    {profile.isFollowing ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-6 mb-4">
                <div className="text-center">
                  <div className="font-bold">{profile.postsCount}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.followersCount}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">{profile.followingCount}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Following</div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm mb-2">{profile.bio}</p>

              {/* Additional Info */}
              <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                <div className="flex items-center justify-center md:justify-start">
                  <span className="material-symbols-rounded text-sm mr-1">school</span>
                  <span>{profile.department}, {profile.year}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="material-symbols-rounded text-sm mr-1">location_on</span>
                  <span>BIT Mesra, Ranchi</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-6">
          <div className="flex border-b border-neutral-200 dark:border-neutral-800">
            <button
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                activeTab === 'posts'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <span className="material-symbols-rounded align-middle mr-1">grid_on</span>
              Posts
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                activeTab === 'circles'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
              onClick={() => setActiveTab('circles')}
            >
              <span className="material-symbols-rounded align-middle mr-1">groups</span>
              Circles
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                activeTab === 'collections'
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
              onClick={() => setActiveTab('collections')}
            >
              <span className="material-symbols-rounded align-middle mr-1">bookmark</span>
              Saved
            </button>
          </div>

          {/* Posts Grid */}
          {activeTab === 'posts' && (
            <div className="p-4">
              {posts.length > 0 ? (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {posts.map(post => (
                    <div key={post.id} className="aspect-square relative group overflow-hidden rounded-md">
                      <Image
                        src={post.imageUrl}
                        alt={post.caption}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex space-x-4 text-white">
                          <div className="flex items-center">
                            <span className="material-symbols-rounded mr-1">favorite</span>
                            <span>{post.likesCount}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-symbols-rounded mr-1">chat_bubble</span>
                            <span>{post.commentsCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-neutral-400 dark:text-neutral-500 mb-2">
                    <span className="material-symbols-rounded text-4xl">photo_camera</span>
                  </div>
                  <h3 className="text-lg font-medium mb-1">No Posts Yet</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    When {isCurrentUser ? 'you' : profile.name} shares photos, they'll appear here.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Circles */}
          {activeTab === 'circles' && (
            <div className="p-4">
              <div className="text-center py-12">
                <div className="text-neutral-400 dark:text-neutral-500 mb-2">
                  <span className="material-symbols-rounded text-4xl">groups</span>
                </div>
                <h3 className="text-lg font-medium mb-1">No Circles Yet</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {isCurrentUser ? 'You haven\'t' : `${profile.name} hasn't`} joined any circles yet.
                </p>
                {isCurrentUser && (
                  <button className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Discover Circles
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Collections */}
          {activeTab === 'collections' && (
            <div className="p-4">
              <div className="text-center py-12">
                <div className="text-neutral-400 dark:text-neutral-500 mb-2">
                  <span className="material-symbols-rounded text-4xl">bookmark</span>
                </div>
                <h3 className="text-lg font-medium mb-1">No Saved Items</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {isCurrentUser ? 'You haven\'t' : `${profile.name} hasn't`} saved any posts yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
