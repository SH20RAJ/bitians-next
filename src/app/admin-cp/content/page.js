'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Image from 'next/image';
import Link from 'next/link';

// Metadata moved to layout.js since this is a client component

export default function ContentModeration() {
  const [activeTab, setActiveTab] = useState('reported');
  const [selectedContentType, setSelectedContentType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for reported content
  const reportedContent = [
    {
      id: 1,
      type: 'post',
      title: 'Campus life at BIT Mesra',
      content: 'This is a post about campus life with potentially inappropriate content...',
      thumbnail: 'https://picsum.photos/id/1/300/200',
      author: {
        name: 'Rahul Sharma',
        username: 'rahul_sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      reportedBy: {
        name: 'Neha Gupta',
        username: 'neha_gupta',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      reportReason: 'Inappropriate content',
      reportedAt: '2023-05-10T10:30:00',
      status: 'pending',
    },
    {
      id: 2,
      type: 'comment',
      content: 'This comment contains offensive language and personal attacks...',
      author: {
        name: 'Vikram Singh',
        username: 'vikram_singh',
        avatar: 'https://i.pravatar.cc/150?img=6',
      },
      reportedBy: {
        name: 'Priya Patel',
        username: 'priya_patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      reportReason: 'Harassment',
      reportedAt: '2023-05-09T15:45:00',
      status: 'pending',
    },
    {
      id: 3,
      type: 'hub',
      title: 'Controversial Topics',
      description: 'This hub discusses controversial topics that may violate guidelines...',
      thumbnail: 'https://picsum.photos/id/3/300/200',
      author: {
        name: 'Amit Kumar',
        username: 'amit_kumar',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      reportedBy: {
        name: 'Rohan Joshi',
        username: 'rohan_joshi',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      reportReason: 'Inappropriate content',
      reportedAt: '2023-05-08T09:15:00',
      status: 'pending',
    },
    {
      id: 4,
      type: 'post',
      title: 'Party photos',
      content: 'Photos from the recent party that may contain inappropriate content...',
      thumbnail: 'https://picsum.photos/id/4/300/200',
      author: {
        name: 'Ananya Das',
        username: 'ananya_das',
        avatar: 'https://i.pravatar.cc/150?img=7',
      },
      reportedBy: {
        name: 'Amit Kumar',
        username: 'amit_kumar',
        avatar: 'https://i.pravatar.cc/150?img=4',
      },
      reportReason: 'Inappropriate content',
      reportedAt: '2023-05-07T18:20:00',
      status: 'reviewed',
      reviewedBy: 'Admin',
      reviewedAt: '2023-05-08T10:30:00',
      action: 'no_action',
    },
    {
      id: 5,
      type: 'comment',
      content: 'This comment contains spam links to external websites...',
      author: {
        name: 'Unknown User',
        username: 'unknown_user',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
      reportedBy: {
        name: 'Rahul Sharma',
        username: 'rahul_sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      reportReason: 'Spam',
      reportedAt: '2023-05-06T14:10:00',
      status: 'reviewed',
      reviewedBy: 'Admin',
      reviewedAt: '2023-05-07T09:45:00',
      action: 'removed',
    },
  ];

  // Filter content based on type and status
  const filteredContent = reportedContent.filter(content => {
    const matchesType = selectedContentType === 'all' || content.type === selectedContentType;
    const matchesStatus = selectedStatus === 'all' || content.status === selectedStatus;

    return matchesType && matchesStatus;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get content type icon
  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'post':
        return <span className="material-symbols-rounded text-blue-500">post</span>;
      case 'comment':
        return <span className="material-symbols-rounded text-green-500">comment</span>;
      case 'hub':
        return <span className="material-symbols-rounded text-purple-500">hub</span>;
      case 'circle':
        return <span className="material-symbols-rounded text-amber-500">groups</span>;
      default:
        return <span className="material-symbols-rounded">article</span>;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Pending</span>;
      case 'reviewed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Reviewed</span>;
      default:
        return null;
    }
  };

  // Get action badge
  const getActionBadge = (action) => {
    switch (action) {
      case 'no_action':
        return <span className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">No Action</span>;
      case 'removed':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Removed</span>;
      case 'warning':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Warning</span>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout
      activePage="content"
      title="Content Moderation"
      subtitle="Review and moderate user-generated content"
    >
      {/* Tabs */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-neutral-200 dark:border-neutral-700">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
              activeTab === 'reported'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors'
            }`}
            onClick={() => setActiveTab('reported')}
          >
            Reported Content
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
              activeTab === 'flagged'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors'
            }`}
            onClick={() => setActiveTab('flagged')}
          >
            Auto-Flagged Content
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium text-sm ${
              activeTab === 'reviewed'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors'
            }`}
            onClick={() => setActiveTab('reviewed')}
          >
            Reviewed Content
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select
            className="py-2 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedContentType}
            onChange={(e) => setSelectedContentType(e.target.value)}
          >
            <option value="all">All Content Types</option>
            <option value="post">Posts</option>
            <option value="comment">Comments</option>
            <option value="hub">Hubs</option>
            <option value="circle">Circles</option>
          </select>
          <select
            className="py-2 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {filteredContent.map(content => (
            <div key={content.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
              <div className="flex">
                {/* Content thumbnail for posts and hubs */}
                {(content.type === 'post' || content.type === 'hub') && (
                  <div className="relative h-20 w-32 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={content.thumbnail}
                      alt={content.title || 'Content thumbnail'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {getContentTypeIcon(content.type)}
                      </div>
                      <div>
                        {content.title && (
                          <h3 className="font-medium">{content.title}</h3>
                        )}
                        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                          <span>By</span>
                          <div className="relative h-4 w-4 rounded-full overflow-hidden mx-1">
                            <Image
                              src={content.author.avatar}
                              alt={content.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span>{content.author.name}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(content.status)}
                      {content.action && getActionBadge(content.action)}
                    </div>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 mb-2">
                    {content.content || content.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center">
                      <span>Reported by</span>
                      <div className="relative h-4 w-4 rounded-full overflow-hidden mx-1">
                        <Image
                          src={content.reportedBy.avatar}
                          alt={content.reportedBy.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{content.reportedBy.name}</span>
                      <span className="mx-1">•</span>
                      <span>Reason: {content.reportReason}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(content.reportedAt)}</span>
                    </div>

                    {content.status === 'pending' ? (
                      <div className="flex space-x-2 mt-2 sm:mt-0">
                        <button className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
                          Remove
                        </button>
                        <button className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
                          Warn
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                          Approve
                        </button>
                      </div>
                    ) : (
                      <div>
                        <span>Reviewed by {content.reviewedBy} • {formatDate(content.reviewedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredContent.length === 0 && (
            <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
              <span className="material-symbols-rounded text-4xl mb-2">content_paste_off</span>
              <p>No content found matching the selected filters</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
