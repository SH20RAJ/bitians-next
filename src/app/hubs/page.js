import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Hubs | BITians',
  description: 'Explore public interest-based communities on BITians',
};

export default function HubsPage() {
  // Mock data for featured hubs
  const featuredHubs = [
    {
      id: 1,
      name: 'Tech Innovations',
      image: 'https://picsum.photos/id/1/600/400',
      coverImage: 'https://picsum.photos/id/1/1200/400',
      members: 1240,
      posts: 567,
      description: 'Discuss the latest in technology and innovation. Share ideas, projects, and stay updated with tech trends.',
      categories: ['Technology', 'Innovation', 'Programming'],
      isJoined: true,
    },
    {
      id: 2,
      name: 'Campus Life',
      image: 'https://picsum.photos/id/20/600/400',
      coverImage: 'https://picsum.photos/id/20/1200/400',
      members: 3450,
      posts: 1289,
      description: 'Everything about life at BIT Mesra. Share your experiences, photos, and memories from campus.',
      categories: ['Campus', 'Student Life', 'Events'],
      isJoined: false,
    },
    {
      id: 3,
      name: 'Career Advice',
      image: 'https://picsum.photos/id/30/600/400',
      coverImage: 'https://picsum.photos/id/30/1200/400',
      members: 890,
      posts: 345,
      description: 'Get career guidance, job opportunities, and advice from seniors and alumni.',
      categories: ['Career', 'Jobs', 'Internships'],
      isJoined: true,
    },
  ];

  // Mock data for hub categories
  const hubCategories = [
    { id: 1, name: 'Technology', count: 15, icon: 'devices' },
    { id: 2, name: 'Academics', count: 12, icon: 'school' },
    { id: 3, name: 'Sports', count: 8, icon: 'sports_soccer' },
    { id: 4, name: 'Arts', count: 6, icon: 'palette' },
    { id: 5, name: 'Career', count: 10, icon: 'work' },
    { id: 6, name: 'Entertainment', count: 7, icon: 'movie' },
    { id: 7, name: 'Food', count: 5, icon: 'restaurant' },
    { id: 8, name: 'Travel', count: 4, icon: 'flight' },
  ];

  // Mock data for trending hubs
  const trendingHubs = [
    {
      id: 4,
      name: 'Placement Preparation',
      image: 'https://picsum.photos/id/40/200/200',
      members: 756,
      growth: '+15%',
      isJoined: false,
    },
    {
      id: 5,
      name: 'Coding Challenges',
      image: 'https://picsum.photos/id/50/200/200',
      members: 432,
      growth: '+23%',
      isJoined: true,
    },
    {
      id: 6,
      name: 'Photography Club',
      image: 'https://picsum.photos/id/60/200/200',
      members: 567,
      growth: '+8%',
      isJoined: false,
    },
    {
      id: 7,
      name: 'Fitness & Wellness',
      image: 'https://picsum.photos/id/70/200/200',
      members: 321,
      growth: '+12%',
      isJoined: false,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <Image 
              src="https://picsum.photos/id/1/1200/400" 
              alt="Hubs" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-800/70"></div>
          </div>
          <div className="relative z-10 py-16 px-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Explore Hubs</h1>
            <p className="text-xl max-w-2xl mb-6">
              Join public communities based on your interests. Connect with people who share your passions.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-secondary-800 px-6 py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors">
                Browse All Hubs
              </button>
              <button className="bg-secondary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-secondary-700 transition-colors">
                Create a Hub
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Categories & Trending */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-secondary-500">category</span>
                  Categories
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {hubCategories.map(category => (
                    <Link 
                      key={category.id}
                      href={`/hubs/categories/${category.id}`}
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-center"
                    >
                      <span className="material-symbols-rounded text-3xl text-secondary-500 mb-2">{category.icon}</span>
                      <span className="font-medium text-sm">{category.name}</span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{category.count} hubs</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Trending Hubs */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-accent-500">trending_up</span>
                  Trending Hubs
                </h2>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {trendingHubs.map(hub => (
                  <div key={hub.id} className="p-4">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <Image 
                          src={hub.image} 
                          alt={hub.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/hubs/${hub.id}`} className="font-medium text-sm hover:underline">
                          {hub.name}
                        </Link>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                            {hub.members.toLocaleString()} members
                          </p>
                          <span className="text-xs text-tertiary-600 dark:text-tertiary-400 font-medium">
                            {hub.growth}
                          </span>
                        </div>
                      </div>
                      <button 
                        className={`ml-3 text-xs px-3 py-1 rounded-full font-medium ${
                          hub.isJoined 
                            ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200' 
                            : 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300'
                        }`}
                      >
                        {hub.isJoined ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Featured Hubs */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-secondary-500">hub</span>
                  Featured Hubs
                </h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search hubs..." 
                    className="py-1.5 px-4 pr-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500 text-sm">search</span>
                </div>
              </div>
              
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {featuredHubs.map(hub => (
                  <div key={hub.id} className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0">
                        <Image 
                          src={hub.image} 
                          alt={hub.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{hub.name}</h3>
                            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                              <span className="flex items-center mr-4">
                                <span className="material-symbols-rounded text-sm mr-1">group</span>
                                {hub.members.toLocaleString()} members
                              </span>
                              <span className="flex items-center">
                                <span className="material-symbols-rounded text-sm mr-1">forum</span>
                                {hub.posts.toLocaleString()} posts
                              </span>
                            </div>
                          </div>
                          <button 
                            className={`px-4 py-2 rounded-full font-medium ${
                              hub.isJoined 
                                ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200' 
                                : 'bg-secondary-600 text-white hover:bg-secondary-700'
                            }`}
                          >
                            {hub.isJoined ? 'Joined' : 'Join Hub'}
                          </button>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                          {hub.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {hub.categories.map((category, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <Link 
                            href={`/hubs/${hub.id}`}
                            className="text-secondary-600 dark:text-secondary-400 font-medium text-sm hover:underline"
                          >
                            View Hub →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center border-t border-neutral-200 dark:border-neutral-800">
                <button className="text-secondary-600 dark:text-secondary-400 font-medium hover:underline">
                  View All Hubs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
