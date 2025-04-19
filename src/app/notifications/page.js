import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Notifications | BITians',
  description: 'Your notifications on BITians',
};

export default function NotificationsPage() {
  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'Rahul Sharma',
        username: 'rahul_sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
        isVerified: true,
      },
      content: 'liked your post',
      target: 'Campus life at BIT Mesra ❤️ #college #bitians',
      time: '5 minutes ago',
      isRead: false,
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Priya Patel',
        username: 'priya_patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isVerified: false,
      },
      content: 'commented on your post',
      target: 'Great photo! Where was this taken?',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: 3,
      type: 'follow',
      user: {
        name: 'Amit Kumar',
        username: 'amit_kumar',
        avatar: 'https://i.pravatar.cc/150?img=4',
        isVerified: true,
      },
      content: 'started following you',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Neha Gupta',
        username: 'neha_gupta',
        avatar: 'https://i.pravatar.cc/150?img=5',
        isVerified: false,
      },
      content: 'mentioned you in a comment',
      target: 'I think @your_username would know about this!',
      time: '3 hours ago',
      isRead: false,
    },
    {
      id: 5,
      type: 'circle_invite',
      user: {
        name: 'Vikram Singh',
        username: 'vikram_singh',
        avatar: 'https://i.pravatar.cc/150?img=6',
        isVerified: false,
      },
      content: 'invited you to join a circle',
      target: 'Project Team',
      time: '5 hours ago',
      isRead: true,
    },
    {
      id: 6,
      type: 'event',
      user: {
        name: 'Tech Club',
        username: 'tech_club',
        avatar: 'https://picsum.photos/id/1/100/100',
        isVerified: true,
      },
      content: 'posted a new event',
      target: 'Tech Fest 2023',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: 7,
      type: 'hub_post',
      user: {
        name: 'Campus Life',
        username: 'campus_life',
        avatar: 'https://picsum.photos/id/20/100/100',
        isVerified: true,
        isHub: true,
      },
      content: 'New trending post in',
      target: 'Campus Life hub',
      time: '4 hours ago',
      isRead: false,
    },
    {
      id: 8,
      type: 'birthday',
      user: {
        name: 'Ananya Das',
        username: 'ananya_das',
        avatar: 'https://i.pravatar.cc/150?img=7',
        isVerified: false,
      },
      content: 'is celebrating a birthday today',
      time: '12 hours ago',
      isRead: true,
    },
  ];

  // Group notifications by date
  const today = notifications.filter(n => 
    n.time.includes('minute') || 
    n.time.includes('hour') || 
    n.time.includes('just now')
  );
  
  const yesterday = notifications.filter(n => 
    n.time.includes('1 day')
  );
  
  const older = notifications.filter(n => 
    n.time.includes('week') || 
    n.time.includes('month') ||
    (n.time.includes('day') && !n.time.includes('1 day'))
  );

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <span className="material-symbols-rounded text-accent-500 fill-icon">favorite</span>;
      case 'comment':
        return <span className="material-symbols-rounded text-primary-500">chat</span>;
      case 'follow':
        return <span className="material-symbols-rounded text-secondary-500">person_add</span>;
      case 'mention':
        return <span className="material-symbols-rounded text-tertiary-500">alternate_at</span>;
      case 'circle_invite':
        return <span className="material-symbols-rounded text-primary-500">group_add</span>;
      case 'event':
        return <span className="material-symbols-rounded text-secondary-500">event</span>;
      case 'hub_post':
        return <span className="material-symbols-rounded text-tertiary-500">hub</span>;
      case 'birthday':
        return <span className="material-symbols-rounded text-accent-500">cake</span>;
      default:
        return <span className="material-symbols-rounded text-primary-500">notifications</span>;
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <span className="material-symbols-rounded">settings</span>
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
              <span className="material-symbols-rounded">mark_email_read</span>
            </button>
          </div>
        </div>

        {/* Notification Filters */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden mb-6">
          <div className="flex border-b border-neutral-200 dark:border-neutral-800">
            <button className="flex-1 py-3 px-4 text-center font-medium text-sm border-b-2 border-primary-500 text-primary-600 dark:text-primary-400">
              All
            </button>
            <button className="flex-1 py-3 px-4 text-center font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              Mentions
            </button>
            <button className="flex-1 py-3 px-4 text-center font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              Circles
            </button>
            <button className="flex-1 py-3 px-4 text-center font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
              Hubs
            </button>
          </div>
        </div>

        {/* Today's Notifications */}
        {today.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Today</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {today.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                      !notification.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image 
                            src={notification.user.avatar} 
                            alt={notification.user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <Link href={`/profile/${notification.user.username}`} className="font-semibold hover:underline">
                            {notification.user.name}
                          </Link>
                          {notification.user.isVerified && (
                            <span className="ml-1 text-primary-500 dark:text-primary-400">
                              <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                            </span>
                          )}
                          {notification.user.isHub && (
                            <span className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">
                              (Hub)
                            </span>
                          )}
                          <span className="ml-1">{notification.content}</span>
                          {notification.target && (
                            <span className="ml-1 font-medium">
                              {notification.target}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <span className="h-2 w-2 rounded-full bg-primary-500"></span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons for specific notification types */}
                    {(notification.type === 'follow' || notification.type === 'circle_invite') && (
                      <div className="mt-3 ml-16 flex space-x-2">
                        <button className="px-4 py-1.5 rounded-full bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors">
                          {notification.type === 'follow' ? 'Follow Back' : 'Accept'}
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors">
                          {notification.type === 'follow' ? 'Ignore' : 'Decline'}
                        </button>
                      </div>
                    )}
                    
                    {notification.type === 'event' && (
                      <div className="mt-3 ml-16">
                        <button className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-sm font-medium">
                          Interested
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Yesterday's Notifications */}
        {yesterday.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Yesterday</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {yesterday.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                      !notification.isRead ? 'bg-primary-50 dark:bg-primary-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image 
                            src={notification.user.avatar} 
                            alt={notification.user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <Link href={`/profile/${notification.user.username}`} className="font-semibold hover:underline">
                            {notification.user.name}
                          </Link>
                          {notification.user.isVerified && (
                            <span className="ml-1 text-primary-500 dark:text-primary-400">
                              <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                            </span>
                          )}
                          <span className="ml-1">{notification.content}</span>
                          {notification.target && (
                            <span className="ml-1 font-medium">
                              {notification.target}
                            </span>
                          )}
                        </p>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Older Notifications */}
        {older.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Older</h2>
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden">
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {older.map(notification => (
                  <div 
                    key={notification.id}
                    className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  >
                    <div className="flex items-start">
                      <div className="relative mr-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image 
                            src={notification.user.avatar} 
                            alt={notification.user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <Link href={`/profile/${notification.user.username}`} className="font-semibold hover:underline">
                            {notification.user.name}
                          </Link>
                          {notification.user.isVerified && (
                            <span className="ml-1 text-primary-500 dark:text-primary-400">
                              <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                            </span>
                          )}
                          <span className="ml-1">{notification.content}</span>
                          {notification.target && (
                            <span className="ml-1 font-medium">
                              {notification.target}
                            </span>
                          )}
                        </p>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
