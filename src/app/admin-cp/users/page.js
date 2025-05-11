'use client';

import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Image from 'next/image';
import Link from 'next/link';

// Metadata moved to layout.js since this is a client component

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for users
  const users = [
    {
      id: 1,
      name: 'Rahul Sharma',
      username: 'rahul_sharma',
      email: 'rahul.sharma@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'student',
      department: 'Computer Science',
      year: '3rd Year',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2023-05-10T14:30:00',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Priya Patel',
      username: 'priya_patel',
      email: 'priya.patel@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'student',
      department: 'Electrical Engineering',
      year: '2nd Year',
      status: 'active',
      joinDate: '2023-02-20',
      lastActive: '2023-05-09T10:15:00',
      isVerified: false,
    },
    {
      id: 3,
      name: 'Dr. Amit Kumar',
      username: 'amit_kumar',
      email: 'amit.kumar@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'faculty',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2022-11-05',
      lastActive: '2023-05-08T16:45:00',
      isVerified: true,
    },
    {
      id: 4,
      name: 'Neha Gupta',
      username: 'neha_gupta',
      email: 'neha.gupta@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'student',
      department: 'Mechanical Engineering',
      year: '4th Year',
      status: 'inactive',
      joinDate: '2022-09-10',
      lastActive: '2023-04-15T09:20:00',
      isVerified: true,
    },
    {
      id: 5,
      name: 'Vikram Singh',
      username: 'vikram_singh',
      email: 'vikram.singh@example.com',
      avatar: 'https://i.pravatar.cc/150?img=6',
      role: 'student',
      department: 'Civil Engineering',
      year: '3rd Year',
      status: 'suspended',
      joinDate: '2022-10-18',
      lastActive: '2023-05-01T11:30:00',
      isVerified: false,
    },
    {
      id: 6,
      name: 'Prof. Ananya Das',
      username: 'ananya_das',
      email: 'ananya.das@example.com',
      avatar: 'https://i.pravatar.cc/150?img=7',
      role: 'faculty',
      department: 'Electrical Engineering',
      status: 'active',
      joinDate: '2022-08-25',
      lastActive: '2023-05-10T08:45:00',
      isVerified: true,
    },
    {
      id: 7,
      name: 'Rohan Joshi',
      username: 'rohan_joshi',
      email: 'rohan.joshi@example.com',
      avatar: 'https://i.pravatar.cc/150?img=8',
      role: 'student',
      department: 'Computer Science',
      year: '1st Year',
      status: 'active',
      joinDate: '2023-03-05',
      lastActive: '2023-05-09T19:10:00',
      isVerified: false,
    },
  ];

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format last active time
  const formatLastActive = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return formatDate(dateTimeString);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300">Inactive</span>;
      case 'suspended':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Suspended</span>;
      default:
        return null;
    }
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case 'student':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Student</span>;
      case 'faculty':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">Faculty</span>;
      case 'admin':
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Admin</span>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout
      activePage="users"
      title="User Management"
      subtitle="Manage and monitor user accounts"
    >
      {/* Filters and Search */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users by name, username, or email..."
              className="w-full py-2 px-4 pr-10 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500">search</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="py-2 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admins</option>
            </select>
            <select
              className="py-2 px-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-sm border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <span className="material-symbols-rounded text-sm mr-1">add</span>
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 dark:bg-neutral-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">User</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Role</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Department</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Joined</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Last Active</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-neutral-600 dark:text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {paginatedUsers.map(user => (
                <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{user.name}</p>
                          {user.isVerified && (
                            <span className="ml-1 text-primary-500 dark:text-primary-400">
                              <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-neutral-500 dark:text-neutral-400">
                          <span>@{user.username}</span>
                          <span className="hidden sm:inline mx-1">•</span>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      <p>{user.department}</p>
                      {user.year && <p className="text-neutral-500 dark:text-neutral-400">{user.year}</p>}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {formatLastActive(user.lastActive)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-rounded text-neutral-600 dark:text-neutral-300">visibility</span>
                      </button>
                      <button className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-rounded text-blue-600 dark:text-blue-400">edit</span>
                      </button>
                      <button className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-rounded text-red-600 dark:text-red-400">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex space-x-1">
            <button
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                } transition-colors`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
