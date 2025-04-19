import MainLayout from '../../components/layout/MainLayout';
import DiscoverSection from '../../components/feed/DiscoverSection';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Discover | BITians',
  description: 'Discover new content, people, and communities on BITians',
};

export default function DiscoverPage() {
  // Mock data for trending topics
  const trendingTopics = [
    { id: 1, name: 'Campus Events', count: 156, image: 'https://picsum.photos/id/1/300/300' },
    { id: 2, name: 'Tech Innovations', count: 89, image: 'https://picsum.photos/id/2/300/300' },
    { id: 3, name: 'Placement Tips', count: 124, image: 'https://picsum.photos/id/3/300/300' },
    { id: 4, name: 'Hostel Life', count: 78, image: 'https://picsum.photos/id/4/300/300' },
    { id: 5, name: 'Academic Help', count: 112, image: 'https://picsum.photos/id/5/300/300' },
    { id: 6, name: 'Sports', count: 67, image: 'https://picsum.photos/id/6/300/300' },
  ];

  // Mock data for featured content
  const featuredContent = [
    {
      id: 1,
      title: 'Annual Tech Fest 2023',
      description: 'Join us for the biggest tech event of the year with exciting competitions and workshops.',
      image: 'https://picsum.photos/id/10/600/400',
      type: 'event',
      date: 'May 15-17, 2023',
    },
    {
      id: 2,
      title: 'Campus Photography Contest',
      description: 'Show your photography skills and win amazing prizes. Theme: Campus Life.',
      image: 'https://picsum.photos/id/11/600/400',
      type: 'contest',
      deadline: 'April 30, 2023',
    },
    {
      id: 3,
      title: 'Internship Opportunities',
      description: 'Exclusive internship opportunities for BIT Mesra students. Apply now!',
      image: 'https://picsum.photos/id/12/600/400',
      type: 'opportunity',
      deadline: 'Ongoing',
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-primary-600 to-secondary-600">
          <div className="absolute inset-0 opacity-20">
            <Image 
              src="https://picsum.photos/id/1/1200/400" 
              alt="Discover" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="relative z-10 py-16 px-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Discover What's Happening</h1>
            <p className="text-xl max-w-2xl mb-6">
              Explore trending topics, connect with new people, and find communities that match your interests.
            </p>
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search for topics, people, or content..." 
                className="w-full py-3 px-5 pr-12 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 material-symbols-rounded">search</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trending Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-primary-500">trending_up</span>
                  Trending Topics
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {trendingTopics.map(topic => (
                    <Link 
                      key={topic.id}
                      href={`/discover/topics/${topic.id}`}
                      className="group relative rounded-lg overflow-hidden aspect-square shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Image 
                        src={topic.image} 
                        alt={topic.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                        <h3 className="text-white font-medium text-sm">{topic.name}</h3>
                        <p className="text-white/80 text-xs">{topic.count} posts</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-primary-600 dark:text-primary-400 font-medium py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  View All Topics
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Featured Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-accent-500">auto_awesome</span>
                  Featured Content
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {featuredContent.map(item => (
                    <div 
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {item.type}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-neutral-600 dark:text-neutral-300 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-neutral-500 dark:text-neutral-400">
                            {item.date ? (
                              <span className="flex items-center">
                                <span className="material-symbols-rounded text-sm mr-1">event</span>
                                {item.date}
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <span className="material-symbols-rounded text-sm mr-1">schedule</span>
                                Deadline: {item.deadline}
                              </span>
                            )}
                          </div>
                          <button className="text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full font-medium">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Discover Section */}
            <DiscoverSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
