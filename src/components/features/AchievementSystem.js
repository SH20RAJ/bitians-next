'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AchievementSystem({ isOpen, onClose }) {
  // Mock data for achievements
  const achievements = [
    {
      id: 1,
      name: 'Welcome Aboard',
      description: 'Complete your profile setup',
      icon: 'emoji_events',
      progress: 100,
      isCompleted: true,
      points: 10,
      dateEarned: '2 days ago',
    },
    {
      id: 2,
      name: 'Social Butterfly',
      description: 'Connect with 10 fellow students',
      icon: 'diversity_3',
      progress: 70,
      isCompleted: false,
      points: 20,
      currentValue: 7,
      maxValue: 10,
    },
    {
      id: 3,
      name: 'Content Creator',
      description: 'Create your first post',
      icon: 'edit_square',
      progress: 100,
      isCompleted: true,
      points: 15,
      dateEarned: '1 day ago',
    },
    {
      id: 4,
      name: 'Knowledge Sharer',
      description: 'Share 5 study resources',
      icon: 'school',
      progress: 40,
      isCompleted: false,
      points: 25,
      currentValue: 2,
      maxValue: 5,
    },
    {
      id: 5,
      name: 'Event Enthusiast',
      description: 'Attend 3 campus events',
      icon: 'event',
      progress: 33,
      isCompleted: false,
      points: 30,
      currentValue: 1,
      maxValue: 3,
    },
  ];

  // User stats
  const userStats = {
    level: 3,
    totalPoints: 45,
    pointsToNextLevel: 30,
    rank: 'Rising Star',
    completedAchievements: 2,
    totalAchievements: achievements.length,
  };

  // Filter achievements
  const [filter, setFilter] = useState('all');
  const filteredAchievements = filter === 'all' 
    ? achievements 
    : filter === 'completed' 
      ? achievements.filter(a => a.isCompleted) 
      : achievements.filter(a => !a.isCompleted);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="material-symbols-rounded mr-2 text-yellow-500 fill-icon">emoji_events</span>
            Achievements
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        
        {/* User Stats */}
        <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-bold">Level {userStats.level}</span>
                <span className="ml-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {userStats.rank}
                </span>
              </div>
              <p className="text-white/80 mt-1">
                {userStats.completedAchievements} of {userStats.totalAchievements} achievements completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">{userStats.totalPoints} XP</p>
              <p className="text-white/80 text-sm">{userStats.pointsToNextLevel} XP to next level</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3 bg-white/20 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full" 
              style={{ width: `${(userStats.totalPoints / (userStats.totalPoints + userStats.pointsToNextLevel)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex space-x-2">
          <button 
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              filter === 'all' 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              filter === 'completed' 
                ? 'bg-tertiary-100 dark:bg-tertiary-900/30 text-tertiary-800 dark:text-tertiary-300' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              filter === 'in-progress' 
                ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300' 
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
            }`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </button>
        </div>
        
        {/* Achievements List */}
        <div className="overflow-y-auto max-h-[50vh]">
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filteredAchievements.map(achievement => (
              <div key={achievement.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-start">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mr-4 ${
                    achievement.isCompleted 
                      ? 'bg-tertiary-100 dark:bg-tertiary-900/30 text-tertiary-600 dark:text-tertiary-400' 
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}>
                    <span className="material-symbols-rounded text-2xl fill-icon">{achievement.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{achievement.name}</h3>
                      <span className="text-sm font-medium text-yellow-500">+{achievement.points} XP</span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {achievement.description}
                    </p>
                    
                    {/* Progress bar */}
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mr-3">
                        <div 
                          className={`h-full rounded-full ${
                            achievement.isCompleted 
                              ? 'bg-tertiary-500' 
                              : 'bg-secondary-500'
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 min-w-[60px] text-right">
                        {achievement.isCompleted 
                          ? 'Completed' 
                          : `${achievement.currentValue}/${achievement.maxValue}`
                        }
                      </span>
                    </div>
                    
                    {achievement.isCompleted && (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Earned {achievement.dateEarned}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <Link 
            href="/achievements"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            onClick={onClose}
          >
            View All Achievements
          </Link>
        </div>
      </div>
    </div>
  );
}
