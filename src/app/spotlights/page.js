import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Spotlights | BITians',
  description: 'Featured content and creators on BITians',
};

export default function SpotlightsPage() {
  // Mock data for featured spotlights
  const featuredSpotlights = [
    {
      id: 1,
      title: 'Tech Fest 2023 Highlights',
      type: 'event',
      image: 'https://picsum.photos/id/1/1200/600',
      author: {
        name: 'Tech Club',
        avatar: 'https://picsum.photos/id/1/100/100',
        isVerified: true,
      },
      views: 1240,
      likes: 356,
      date: '2 days ago',
      description: 'Relive the exciting moments from this year\'s Tech Fest with competitions, workshops, and guest lectures.',
      tags: ['event', 'technology', 'campus'],
    },
    {
      id: 2,
      title: 'Campus Photography Contest Winners',
      type: 'gallery',
      image: 'https://picsum.photos/id/20/1200/600',
      author: {
        name: 'Photography Club',
        avatar: 'https://picsum.photos/id/20/100/100',
        isVerified: true,
      },
      views: 890,
      likes: 245,
      date: '1 week ago',
      description: 'Check out the stunning winning entries from our annual campus photography contest.',
      tags: ['photography', 'contest', 'campus'],
    },
    {
      id: 3,
      title: 'Interview with Campus Placement Toppers',
      type: 'interview',
      image: 'https://picsum.photos/id/30/1200/600',
      author: {
        name: 'Career Cell',
        avatar: 'https://picsum.photos/id/30/100/100',
        isVerified: true,
      },
      views: 1560,
      likes: 423,
      date: '3 days ago',
      description: 'Learn from the experiences and strategies of students who secured top placements this year.',
      tags: ['career', 'placements', 'interview'],
    },
  ];

  // Mock data for creator spotlights
  const creatorSpotlights = [
    {
      id: 1,
      name: 'Rahul Sharma',
      username: 'rahul_sharma',
      avatar: 'https://i.pravatar.cc/150?img=2',
      coverImage: 'https://picsum.photos/id/2/1200/400',
      department: 'Computer Science',
      year: '3rd Year',
      followers: 1240,
      posts: 87,
      bio: 'Tech enthusiast | Competitive programmer | Web developer',
      featured: {
        title: 'How I secured an internship at Google',
        image: 'https://picsum.photos/id/2/600/400',
        likes: 356,
      },
      isVerified: true,
    },
    {
      id: 2,
      name: 'Priya Patel',
      username: 'priya_patel',
      avatar: 'https://i.pravatar.cc/150?img=3',
      coverImage: 'https://picsum.photos/id/3/1200/400',
      department: 'Electrical Engineering',
      year: '2nd Year',
      followers: 890,
      posts: 65,
      bio: 'Photography enthusiast | Robotics club member | Loves to travel',
      featured: {
        title: 'My journey through campus photography',
        image: 'https://picsum.photos/id/3/600/400',
        likes: 245,
      },
      isVerified: false,
    },
    {
      id: 3,
      name: 'Amit Kumar',
      username: 'amit_kumar',
      avatar: 'https://i.pravatar.cc/150?img=4',
      coverImage: 'https://picsum.photos/id/4/1200/400',
      department: 'Mechanical Engineering',
      year: '4th Year',
      followers: 1560,
      posts: 112,
      bio: 'Sports enthusiast | College basketball team | Fitness freak',
      featured: {
        title: 'Balancing academics and sports',
        image: 'https://picsum.photos/id/4/600/400',
        likes: 423,
      },
      isVerified: true,
    },
  ];

  // Mock data for trending topics
  const trendingTopics = [
    { id: 1, name: 'Tech Fest', count: 156, icon: 'rocket_launch' },
    { id: 2, name: 'Placements', count: 124, icon: 'work' },
    { id: 3, name: 'Campus Life', count: 98, icon: 'school' },
    { id: 4, name: 'Photography', count: 87, icon: 'photo_camera' },
    { id: 5, name: 'Sports', count: 76, icon: 'sports_soccer' },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-tertiary-600 to-primary-600">
          <div className="absolute inset-0 mix-blend-overlay opacity-20">
            <Image 
              src="https://picsum.photos/id/1/1200/400" 
              alt="Spotlights" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="relative z-10 py-16 px-8 text-white">
            <div className="flex items-center mb-4">
              <span className="material-symbols-rounded text-3xl mr-2">auto_awesome</span>
              <h1 className="text-4xl font-bold">Spotlights</h1>
            </div>
            <p className="text-xl max-w-2xl mb-6">
              Discover featured content, trending topics, and outstanding creators from the BIT Mesra community.
            </p>
            <div className="flex flex-wrap gap-3">
              {trendingTopics.map(topic => (
                <Link 
                  key={topic.id}
                  href={`/spotlights/topics/${topic.id}`}
                  className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <span className="material-symbols-rounded mr-2">{topic.icon}</span>
                  <span>{topic.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Spotlights */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="material-symbols-rounded mr-2 text-tertiary-500">featured_play_list</span>
              Featured Spotlights
            </h2>
            <Link 
              href="/spotlights/featured"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center"
            >
              View All
              <span className="material-symbols-rounded ml-1">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSpotlights.map(spotlight => (
              <div 
                key={spotlight.id}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-video">
                  <Image 
                    src={spotlight.image} 
                    alt={spotlight.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {spotlight.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{spotlight.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                      <Image 
                        src={spotlight.author.avatar} 
                        alt={spotlight.author.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{spotlight.author.name}</span>
                      {spotlight.author.isVerified && (
                        <span className="ml-1 text-primary-500 dark:text-primary-400">
                          <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-auto">
                      {spotlight.date}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2 mb-3">
                    {spotlight.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <span className="material-symbols-rounded text-sm mr-1">visibility</span>
                        {spotlight.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <span className="material-symbols-rounded text-sm mr-1">favorite</span>
                        {spotlight.likes.toLocaleString()}
                      </span>
                    </div>
                    <Link 
                      href={`/spotlights/${spotlight.id}`}
                      className="text-tertiary-600 dark:text-tertiary-400 font-medium hover:underline"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Creator Spotlights */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <span className="material-symbols-rounded mr-2 text-accent-500">person_celebrate</span>
              Creator Spotlights
            </h2>
            <Link 
              href="/spotlights/creators"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center"
            >
              View All
              <span className="material-symbols-rounded ml-1">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creatorSpotlights.map(creator => (
              <div 
                key={creator.id}
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-32">
                  <Image 
                    src={creator.coverImage} 
                    alt={creator.name} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute -bottom-10 left-4 h-20 w-20 rounded-xl overflow-hidden border-4 border-white dark:border-neutral-900">
                    <Image 
                      src={creator.avatar} 
                      alt={creator.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-12 p-4">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">{creator.name}</h3>
                    {creator.isVerified && (
                      <span className="ml-1 text-primary-500 dark:text-primary-400">
                        <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-2">
                    @{creator.username} • {creator.department} • {creator.year}
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-3">
                    {creator.bio}
                  </p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex flex-col items-center">
                        <span className="font-semibold">{creator.followers.toLocaleString()}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Followers</span>
                      </span>
                      <span className="flex flex-col items-center">
                        <span className="font-semibold">{creator.posts}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">Posts</span>
                      </span>
                    </div>
                    <button className="text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full font-medium">
                      Follow
                    </button>
                  </div>
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3">
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Featured Post</p>
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <Image 
                          src={creator.featured.image} 
                          alt={creator.featured.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{creator.featured.title}</p>
                        <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="material-symbols-rounded text-xs mr-1">favorite</span>
                          {creator.featured.likes} likes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
