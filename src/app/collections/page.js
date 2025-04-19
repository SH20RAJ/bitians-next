import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Collections | BITians',
  description: 'Your saved content organized in collections on BITians',
};

export default function CollectionsPage() {
  // Mock data for collections
  const collections = [
    {
      id: 1,
      name: 'Study Resources',
      description: 'Useful study materials and resources',
      coverImage: 'https://picsum.photos/id/1/600/400',
      itemCount: 24,
      isPrivate: false,
      lastUpdated: '2 days ago',
    },
    {
      id: 2,
      name: 'Project Ideas',
      description: 'Inspiration for future projects',
      coverImage: 'https://picsum.photos/id/2/600/400',
      itemCount: 15,
      isPrivate: true,
      lastUpdated: '1 week ago',
    },
    {
      id: 3,
      name: 'Campus Photos',
      description: 'Beautiful shots from around the campus',
      coverImage: 'https://picsum.photos/id/3/600/400',
      itemCount: 42,
      isPrivate: false,
      lastUpdated: '3 days ago',
    },
    {
      id: 4,
      name: 'Career Resources',
      description: 'Job opportunities and placement preparation',
      coverImage: 'https://picsum.photos/id/4/600/400',
      itemCount: 18,
      isPrivate: false,
      lastUpdated: '5 days ago',
    },
  ];

  // Mock data for recently saved items
  const recentlySaved = [
    {
      id: 1,
      type: 'post',
      title: 'Tips for Cracking Technical Interviews',
      image: 'https://picsum.photos/id/10/300/200',
      author: {
        name: 'Rahul Sharma',
        username: 'rahul_sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
        isVerified: true,
      },
      savedTime: '2 hours ago',
      collection: 'Career Resources',
    },
    {
      id: 2,
      type: 'photo',
      title: 'Sunset at Main Building',
      image: 'https://picsum.photos/id/11/300/200',
      author: {
        name: 'Priya Patel',
        username: 'priya_patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isVerified: false,
      },
      savedTime: '1 day ago',
      collection: 'Campus Photos',
    },
    {
      id: 3,
      type: 'article',
      title: 'Understanding Data Structures and Algorithms',
      image: 'https://picsum.photos/id/12/300/200',
      author: {
        name: 'Amit Kumar',
        username: 'amit_kumar',
        avatar: 'https://i.pravatar.cc/150?img=4',
        isVerified: true,
      },
      savedTime: '3 days ago',
      collection: 'Study Resources',
    },
    {
      id: 4,
      type: 'event',
      title: 'Tech Fest 2023',
      image: 'https://picsum.photos/id/13/300/200',
      author: {
        name: 'Tech Club',
        username: 'tech_club',
        avatar: 'https://picsum.photos/id/1/100/100',
        isVerified: true,
      },
      savedTime: '5 days ago',
      collection: null,
    },
  ];

  // Mock data for collection stats
  const stats = {
    totalItems: 99,
    totalCollections: 8,
    privateCollections: 3,
    publicCollections: 5,
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Collections</h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Organize and manage your saved content
            </p>
          </div>
          <button className="flex items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors">
            <span className="material-symbols-rounded mr-2">add</span>
            New Collection
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                <span className="material-symbols-rounded">bookmark</span>
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Total Saved Items</p>
                <p className="text-2xl font-bold">{stats.totalItems}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 mr-3">
                <span className="material-symbols-rounded">folder</span>
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Collections</p>
                <p className="text-2xl font-bold">{stats.totalCollections}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-tertiary-100 dark:bg-tertiary-900/30 flex items-center justify-center text-tertiary-600 dark:text-tertiary-400 mr-3">
                <span className="material-symbols-rounded">public</span>
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Public Collections</p>
                <p className="text-2xl font-bold">{stats.publicCollections}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 mr-3">
                <span className="material-symbols-rounded">lock</span>
              </div>
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Private Collections</p>
                <p className="text-2xl font-bold">{stats.privateCollections}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Collections */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-primary-500">collections_bookmark</span>
                  Your Collections
                </h2>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search collections..." 
                    className="py-1.5 px-4 pr-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500 text-sm">search</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {collections.map(collection => (
                  <Link 
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-40">
                      <Image 
                        src={collection.coverImage} 
                        alt={collection.name} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold">{collection.name}</h3>
                          {collection.isPrivate && (
                            <span className="material-symbols-rounded text-white">lock</span>
                          )}
                        </div>
                        <p className="text-white/80 text-sm">{collection.itemCount} items</p>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
                        {collection.description}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                        Last updated {collection.lastUpdated}
                      </p>
                    </div>
                  </Link>
                ))}
                
                {/* Create New Collection Card */}
                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center h-64 hover:border-primary-500 dark:hover:border-primary-500 transition-colors cursor-pointer">
                  <span className="material-symbols-rounded text-4xl text-neutral-400 dark:text-neutral-600 mb-2">add_circle</span>
                  <p className="text-neutral-600 dark:text-neutral-400 font-medium">Create New Collection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Recently Saved */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden sticky top-8">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h2 className="text-lg font-semibold flex items-center">
                  <span className="material-symbols-rounded mr-2 text-secondary-500">history</span>
                  Recently Saved
                </h2>
              </div>
              
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {recentlySaved.map(item => (
                  <div key={item.id} className="p-4">
                    <div className="flex">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                          {item.type}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="relative h-4 w-4 rounded-full overflow-hidden mr-1.5">
                            <Image 
                              src={item.author.avatar} 
                              alt={item.author.name} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {item.author.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                          <span>Saved {item.savedTime}</span>
                          {item.collection && (
                            <span className="flex items-center">
                              <span className="material-symbols-rounded text-xs mr-0.5">folder</span>
                              {item.collection}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <Link 
                    href="/collections/all-saved"
                    className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    View All Saved Items
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
