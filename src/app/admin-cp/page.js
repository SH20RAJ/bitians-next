'use client';

import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import Image from 'next/image';
import Link from 'next/link';

// Metadata moved to layout.js since this is a client component

export default function AdminDashboard() {
  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'user_report',
      user: {
        name: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      content: 'reported a post for inappropriate content',
      time: '10 minutes ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'content_removed',
      user: {
        name: 'Admin',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'removed a post that violated community guidelines',
      time: '1 hour ago',
      status: 'completed',
    },
    {
      id: 3,
      type: 'user_banned',
      user: {
        name: 'Admin',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: 'temporarily banned user vikram_singh for 3 days',
      time: '3 hours ago',
      status: 'completed',
    },
    {
      id: 4,
      type: 'hub_created',
      user: {
        name: 'Priya Patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      content: 'created a new hub "Photography Enthusiasts"',
      time: '5 hours ago',
      status: 'approved',
    },
    {
      id: 5,
      type: 'system_update',
      user: {
        name: 'System',
        avatar: '/logo.svg',
      },
      content: 'performed database maintenance',
      time: '1 day ago',
      status: 'completed',
    },
  ];

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      type: 'hub',
      name: 'Competitive Programming',
      creator: 'Amit Kumar',
      createdAt: '2 hours ago',
      members: 0,
    },
    {
      id: 2,
      type: 'circle',
      name: 'Final Year Projects',
      creator: 'Neha Gupta',
      createdAt: '5 hours ago',
      members: 8,
    },
    {
      id: 3,
      type: 'event',
      name: 'Hackathon 2023',
      creator: 'Tech Club',
      createdAt: '1 day ago',
      attendees: 56,
    },
  ];

  // Get activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_report':
        return <span className="material-symbols-rounded text-red-500">flag</span>;
      case 'content_removed':
        return <span className="material-symbols-rounded text-amber-500">delete</span>;
      case 'user_banned':
        return <span className="material-symbols-rounded text-red-500">block</span>;
      case 'hub_created':
        return <span className="material-symbols-rounded text-purple-500">hub</span>;
      case 'system_update':
        return <span className="material-symbols-rounded text-blue-500">system_update</span>;
      default:
        return <span className="material-symbols-rounded">info</span>;
    }
  };

  // Get status badge based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Approved</span>;
      default:
        return null;
    }
  };

  // Get approval type icon
  const getApprovalTypeIcon = (type) => {
    switch (type) {
      case 'hub':
        return <span className="material-symbols-rounded text-purple-500">hub</span>;
      case 'circle':
        return <span className="material-symbols-rounded text-blue-500">groups</span>;
      case 'event':
        return <span className="material-symbols-rounded text-green-500">event</span>;
      default:
        return <span className="material-symbols-rounded">info</span>;
    }
  };

  return (
    <AdminLayout
      activePage="dashboard"
      title="Admin Dashboard"
      subtitle="Overview of platform activity and metrics"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Users"
          value="5,248"
          change={12.5}
          icon="group"
          color="blue"
        />
        <StatsCard
          title="Active Users (24h)"
          value="1,856"
          change={8.3}
          icon="person"
          color="green"
        />
        <StatsCard
          title="New Posts"
          value="342"
          change={-3.2}
          icon="post_add"
          color="purple"
        />
        <StatsCard
          title="Reports"
          value="18"
          change={5.7}
          icon="flag"
          color="red"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Link
                href="/admin-cp/activity"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {recentActivities.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-start">
                    <div className="mr-3">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div className="relative h-5 w-5 rounded-full overflow-hidden mr-2">
                          <Image
                            src={activity.user.avatar}
                            alt={activity.user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user.name}</span> {activity.content}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {activity.time}
                        </span>
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <Link
                href="/admin-cp/approvals"
                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {pendingApprovals.map(approval => (
                <div key={approval.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-start">
                    <div className="mr-3">
                      {getApprovalTypeIcon(approval.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{approval.name}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Created by {approval.creator}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {approval.createdAt}
                        </span>
                        <div className="flex space-x-2">
                          <button className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded">
                            Approve
                          </button>
                          <button className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                  <p>No pending approvals</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <Link
                href="/admin-cp/users/create"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              >
                <span className="material-symbols-rounded text-blue-500 text-2xl mb-2">person_add</span>
                <span className="text-sm text-center">Add User</span>
              </Link>
              <Link
                href="/admin-cp/content/review"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              >
                <span className="material-symbols-rounded text-amber-500 text-2xl mb-2">content_paste_search</span>
                <span className="text-sm text-center">Review Content</span>
              </Link>
              <Link
                href="/admin-cp/announcements/create"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              >
                <span className="material-symbols-rounded text-green-500 text-2xl mb-2">campaign</span>
                <span className="text-sm text-center">Announcement</span>
              </Link>
              <Link
                href="/admin-cp/reports/export"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors"
              >
                <span className="material-symbols-rounded text-purple-500 text-2xl mb-2">download</span>
                <span className="text-sm text-center">Export Data</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
