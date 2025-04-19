'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function DiscoverSection() {
  const [activeTab, setActiveTab] = useState('trending');
  
  const tabs = [
    { id: 'trending', label: 'Trending', icon: 'trending_up' },
    { id: 'hubs', label: 'Hubs', icon: 'hub' },
    { id: 'events', label: 'Events', icon: 'event' },
    { id: 'people', label: 'People', icon: 'group' },
  ];
  
  // Mock data for trending content
  const trendingItems = [
    {
      id: 1,
      type: 'hub',
      title: 'Tech Innovations',
      image: 'https://picsum.photos/id/1/300/300',
      members: 1240,
      growth: '+15%',
    },
    {
      id: 2,
      type: 'event',
      title: 'Campus Hackathon',
      image: 'https://picsum.photos/id/2/300/300',
      date: 'May 15',
      attendees: 89,
    },
    {
      id: 3,
      type: 'topic',
      title: '#AIResearch',
      image: 'https://picsum.photos/id/3/300/300',
      posts: 156,
      growth: '+32%',
    },
    {
      id: 4,
      type: 'hub',
      title: 'Photography Club',
      image: 'https://picsum.photos/id/4/300/300',
      members: 567,
      growth: '+8%',
    },
  ];
  
  // Mock data for hubs
  const hubItems = [
    {
      id: 1,
      name: 'Tech Innovations',
      image: 'https://picsum.photos/id/1/300/300',
      members: 1240,
      description: 'Discuss the latest in technology and innovation',
    },
    {
      id: 2,
      name: 'Photography Club',
      image: 'https://picsum.photos/id/4/300/300',
      members: 567,
      description: 'Share your best shots and photography tips',
    },
    {
      id: 3,
      name: 'Campus Life',
      image: 'https://picsum.photos/id/5/300/300',
      members: 3450,
      description: 'Everything about life at BIT Mesra',
    },
    {
      id: 4,
      name: 'Career Advice',
      image: 'https://picsum.photos/id/6/300/300',
      members: 890,
      description: 'Get career guidance and job opportunities',
    },
  ];
  
  // Mock data for events
  const eventItems = [
    {
      id: 1,
      title: 'Campus Hackathon',
      image: 'https://picsum.photos/id/2/300/300',
      date: 'May 15',
      time: '9:00 AM',
      location: 'Main Auditorium',
      attendees: 89,
    },
    {
      id: 2,
      title: 'Tech Fest 2023',
      image: 'https://picsum.photos/id/7/300/300',
      date: 'June 5-7',
      time: 'All day',
      location: 'Campus Grounds',
      attendees: 1200,
    },
    {
      id: 3,
      title: 'Alumni Meetup',
      image: 'https://picsum.photos/id/8/300/300',
      date: 'May 28',
      time: '6:00 PM',
      location: 'Central Lawn',
      attendees: 156,
    },
    {
      id: 4,
      title: 'Workshop: AI Basics',
      image: 'https://picsum.photos/id/9/300/300',
      date: 'May 20',
      time: '2:00 PM',
      location: 'CS Department',
      attendees: 45,
    },
  ];
  
  // Mock data for people
  const peopleItems = [
    {
      id: 1,
      name: 'Rahul Sharma',
      username: 'rahul_sharma',
      image: 'https://i.pravatar.cc/150?img=2',
      department: 'Computer Science',
      year: '3rd Year',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Priya Patel',
      username: 'priya_patel',
      image: 'https://i.pravatar.cc/150?img=3',
      department: 'Electrical Engineering',
      year: '2nd Year',
    },
    {
      id: 3,
      name: 'Neha Gupta',
      username: 'neha_gupta',
      image: 'https://i.pravatar.cc/150?img=5',
      department: 'Mechanical Engineering',
      year: '4th Year',
      isVerified: true,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      username: 'vikram_singh',
      image: 'https://i.pravatar.cc/150?img=6',
      department: 'Civil Engineering',
      year: '3rd Year',
    },
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'trending':
        return (
          <div className="grid grid-cols-2 gap-3">
            {trendingItems.map(item => (
              <Link 
                key={item.id} 
                href={`/${item.type}s/${item.id}`}
                className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {item.type === 'hub' && 'Hub'}
                    {item.type === 'event' && 'Event'}
                    {item.type === 'topic' && 'Topic'}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {item.type === 'hub' && `${item.members.toLocaleString()} members`}
                      {item.type === 'event' && `${item.date}`}
                      {item.type === 'topic' && `${item.posts} posts`}
                    </span>
                    {item.growth && (
                      <span className="text-xs text-tertiary-600 dark:text-tertiary-400 font-medium">
                        {item.growth}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      
      case 'hubs':
        return (
          <div className="space-y-3">
            {hubItems.map(hub => (
              <Link 
                key={hub.id} 
                href={`/hubs/${hub.id}`}
                className="flex items-center bg-white dark:bg-neutral-800 p-3 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-3">
                  <Image
                    src={hub.image}
                    alt={hub.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{hub.name}</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{hub.description}</p>
                </div>
                <div className="ml-3 text-right">
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{hub.members.toLocaleString()} members</span>
                  <button className="block mt-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-2 py-1 rounded-full">
                    Join
                  </button>
                </div>
              </Link>
            ))}
          </div>
        );
      
      case 'events':
        return (
          <div className="space-y-3">
            {eventItems.map(event => (
              <Link 
                key={event.id} 
                href={`/events/${event.id}`}
                className="flex bg-white dark:bg-neutral-800 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-24 w-24">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <p className="flex items-center">
                      <span className="material-symbols-rounded text-sm mr-1">calendar_today</span>
                      {event.date}
                    </p>
                    <p className="flex items-center mt-1">
                      <span className="material-symbols-rounded text-sm mr-1">schedule</span>
                      {event.time} • {event.location}
                    </p>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-full">
                      {event.attendees} attending
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      
      case 'people':
        return (
          <div className="space-y-3">
            {peopleItems.map(person => (
              <Link 
                key={person.id} 
                href={`/profile/${person.username}`}
                className="flex items-center bg-white dark:bg-neutral-800 p-3 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ring-2 ring-primary-100 dark:ring-primary-900">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-sm">{person.name}</h3>
                    {person.isVerified && (
                      <span className="ml-1 text-primary-500 dark:text-primary-400">
                        <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">@{person.username}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {person.department} • {person.year}
                  </p>
                </div>
                <button className="ml-3 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 px-3 py-1 rounded-full">
                  Follow
                </button>
              </Link>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card mb-4 overflow-hidden">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">Discover</h2>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 py-3 px-2 text-sm font-medium flex flex-col items-center transition-colors ${
              activeTab === tab.id
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 dark:border-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="material-symbols-rounded mb-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>
      
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
        <Link 
          href={`/discover/${activeTab}`}
          className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          See all {activeTab}
        </Link>
      </div>
    </div>
  );
}
