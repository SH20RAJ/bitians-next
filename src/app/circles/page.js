import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Circles | BITians',
  description: 'Your private groups and communities on BITians',
};

export default function CirclesPage() {
  // Mock data for user's circles
  const myCircles = [
    {
      id: 1,
      name: 'CS Department',
      image: 'https://picsum.photos/id/237/200/200',
      members: 156,
      unreadPosts: 5,
      lastActive: '2 hours ago',
      description: 'Official circle for Computer Science department students and faculty.',
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Project Team',
      image: 'https://picsum.photos/id/238/200/200',
      members: 12,
      unreadPosts: 0,
      lastActive: '5 minutes ago',
      description: 'Team working on the semester project for Software Engineering course.',
      isAdmin: false,
    },
    {
      id: 3,
      name: 'Study Group',
      image: 'https://picsum.photos/id/239/200/200',
      members: 8,
      unreadPosts: 3,
      lastActive: '1 day ago',
      description: 'Group for preparing for upcoming exams and assignments.',
      isAdmin: true,
    },
    {
      id: 4,
      name: 'Campus Events',
      image: 'https://picsum.photos/id/240/200/200',
      members: 245,
      unreadPosts: 0,
      lastActive: '3 hours ago',
      description: 'Updates and discussions about events happening on campus.',
      isAdmin: false,
    },
  ];

  // Mock data for suggested circles
  const suggestedCircles = [
    {
      id: 5,
      name: 'Coding Club',
      image: 'https://picsum.photos/id/241/200/200',
      members: 89,
      description: 'For coding enthusiasts to share knowledge and participate in competitions.',
      mutualMembers: 5,
    },
    {
      id: 6,
      name: 'Photography Society',
      image: 'https://picsum.photos/id/242/200/200',
      members: 67,
      description: 'Share your photography skills and learn from others.',
      mutualMembers: 3,
    },
    {
      id: 7,
      name: 'Placement Preparation',
      image: 'https://picsum.photos/id/243/200/200',
      members: 124,
      description: 'Prepare for campus placements with tips, resources, and mock interviews.',
      mutualMembers: 8,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Circles</h1>
          <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            <span className="material-symbols-rounded mr-2">add_circle</span>
            Create New Circle
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - My Circles */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-primary-500">groups</span>
                  My Circles
                </h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search circles..." 
                    className="py-1.5 px-4 pr-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500 text-sm">search</span>
                </div>
              </div>
              
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {myCircles.map(circle => (
                  <Link 
                    key={circle.id}
                    href={`/circles/${circle.id}`}
                    className="block p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                        <Image 
                          src={circle.image} 
                          alt={circle.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg truncate pr-2">{circle.name}</h3>
                          {circle.unreadPosts > 0 && (
                            <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                              {circle.unreadPosts} new
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2 mb-2">
                          {circle.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                          <div className="flex items-center">
                            <span className="material-symbols-rounded text-sm mr-1">group</span>
                            {circle.members} members
                            {circle.isAdmin && (
                              <span className="ml-2 bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
                                Admin
                              </span>
                            )}
                          </div>
                          <span>Active {circle.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Suggested Circles & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <div className="flex items-center">
                    <span className="material-symbols-rounded text-primary-500 mr-3">add_circle</span>
                    <span>Create New Circle</span>
                  </div>
                  <span className="material-symbols-rounded">arrow_forward</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <div className="flex items-center">
                    <span className="material-symbols-rounded text-secondary-500 mr-3">manage_accounts</span>
                    <span>Manage Invitations</span>
                  </div>
                  <span className="material-symbols-rounded">arrow_forward</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                  <div className="flex items-center">
                    <span className="material-symbols-rounded text-tertiary-500 mr-3">settings</span>
                    <span>Circle Settings</span>
                  </div>
                  <span className="material-symbols-rounded">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Suggested Circles */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-secondary-500">recommend</span>
                  Suggested Circles
                </h2>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {suggestedCircles.map(circle => (
                  <div key={circle.id} className="p-4">
                    <div className="flex items-start">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <Image 
                          src={circle.image} 
                          alt={circle.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{circle.name}</h3>
                        <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                          {circle.members} members • {circle.mutualMembers} mutual
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <button className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full font-medium">
                            Join
                          </button>
                          <button className="text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full">
                            Ignore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                    View More Suggestions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
