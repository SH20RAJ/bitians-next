import MainLayout from '../../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Messages | BITians',
  description: 'Your conversations on BITians',
};

export default function MessagesPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      user: {
        name: 'Rahul Sharma',
        username: 'rahul_sharma',
        avatar: 'https://i.pravatar.cc/150?img=2',
        isOnline: true,
        isVerified: true,
      },
      lastMessage: {
        text: 'Hey, did you complete the assignment for tomorrow?',
        time: '5 min ago',
        isRead: true,
        isSent: false,
      },
      unreadCount: 0,
      isActive: true,
    },
    {
      id: 2,
      user: {
        name: 'Priya Patel',
        username: 'priya_patel',
        avatar: 'https://i.pravatar.cc/150?img=3',
        isOnline: false,
        lastSeen: '2 hours ago',
        isVerified: false,
      },
      lastMessage: {
        text: 'I\'ll send you the notes by evening.',
        time: '2 hours ago',
        isRead: true,
        isSent: true,
      },
      unreadCount: 0,
      isActive: false,
    },
    {
      id: 3,
      user: {
        name: 'CS Department Circle',
        username: 'cs_department',
        avatar: 'https://picsum.photos/id/237/200/200',
        isGroup: true,
        members: 156,
      },
      lastMessage: {
        text: 'Important: Class schedule for next week has been updated.',
        time: '1 day ago',
        isRead: false,
        sender: 'Prof. Gupta',
      },
      unreadCount: 3,
      isActive: false,
    },
    {
      id: 4,
      user: {
        name: 'Amit Kumar',
        username: 'amit_kumar',
        avatar: 'https://i.pravatar.cc/150?img=4',
        isOnline: true,
        isVerified: true,
      },
      lastMessage: {
        text: 'Let\'s meet at the library around 4 PM.',
        time: '3 hours ago',
        isRead: false,
        isSent: false,
      },
      unreadCount: 1,
      isActive: false,
    },
    {
      id: 5,
      user: {
        name: 'Project Team',
        username: 'project_team',
        avatar: 'https://picsum.photos/id/238/200/200',
        isGroup: true,
        members: 12,
      },
      lastMessage: {
        text: 'I\'ve pushed the latest changes to the repository.',
        time: '5 hours ago',
        isRead: true,
        sender: 'Vikram Singh',
      },
      unreadCount: 0,
      isActive: false,
    },
  ];

  // Mock data for active conversation
  const activeConversation = {
    id: 1,
    user: {
      name: 'Rahul Sharma',
      username: 'rahul_sharma',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isOnline: true,
      isVerified: true,
      department: 'Computer Science',
      year: '3rd Year',
    },
    messages: [
      {
        id: 1,
        text: 'Hey there! How\'s your day going?',
        time: '11:30 AM',
        isSent: false,
        isRead: true,
      },
      {
        id: 2,
        text: 'Pretty good! Working on that project for Software Engineering.',
        time: '11:32 AM',
        isSent: true,
        isRead: true,
      },
      {
        id: 3,
        text: 'Nice! How far along are you?',
        time: '11:33 AM',
        isSent: false,
        isRead: true,
      },
      {
        id: 4,
        text: 'Almost done with the frontend part. Need to work on the backend integration.',
        time: '11:35 AM',
        isSent: true,
        isRead: true,
      },
      {
        id: 5,
        text: 'That\'s great progress! By the way, did you complete the assignment for tomorrow?',
        time: '11:40 AM',
        isSent: false,
        isRead: true,
      },
    ],
  };

  // Mock data for suggested contacts
  const suggestedContacts = [
    {
      id: 1,
      name: 'Neha Gupta',
      username: 'neha_gupta',
      avatar: 'https://i.pravatar.cc/150?img=5',
      department: 'Electrical Engineering',
      isVerified: true,
    },
    {
      id: 2,
      name: 'Vikram Singh',
      username: 'vikram_singh',
      avatar: 'https://i.pravatar.cc/150?img=6',
      department: 'Mechanical Engineering',
      isVerified: false,
    },
    {
      id: 3,
      name: 'Ananya Das',
      username: 'ananya_das',
      avatar: 'https://i.pravatar.cc/150?img=7',
      department: 'Computer Science',
      isVerified: false,
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden h-[calc(100vh-12rem)]">
          <div className="flex h-full">
            {/* Left Sidebar - Conversations */}
            <div className="w-80 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Messages</h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <span className="material-symbols-rounded">edit_square</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <span className="material-symbols-rounded">filter_list</span>
                  </button>
                </div>
              </div>
              
              {/* Search */}
              <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    className="w-full py-2 px-4 pr-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 material-symbols-rounded text-neutral-500">search</span>
                </div>
              </div>
              
              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer ${
                      conversation.isActive ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative mr-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image 
                            src={conversation.user.avatar} 
                            alt={conversation.user.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        {conversation.user.isOnline && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-tertiary-500 border-2 border-white dark:border-neutral-900"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <div className="flex items-center">
                            <h3 className="font-medium text-sm truncate">
                              {conversation.user.name}
                            </h3>
                            {conversation.user.isVerified && (
                              <span className="ml-1 text-primary-500 dark:text-primary-400">
                                <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                              </span>
                            )}
                            {conversation.user.isGroup && (
                              <span className="ml-1 text-xs text-neutral-500 dark:text-neutral-400">
                                ({conversation.user.members})
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap ml-2">
                            {conversation.lastMessage.time}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className={`text-xs truncate ${
                            conversation.unreadCount > 0 
                              ? 'font-medium text-neutral-900 dark:text-neutral-100' 
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}>
                            {conversation.user.isGroup && !conversation.lastMessage.isSent && (
                              <span className="font-medium mr-1">{conversation.lastMessage.sender}:</span>
                            )}
                            {conversation.lastMessage.isSent && (
                              <span className="mr-1">You:</span>
                            )}
                            {conversation.lastMessage.text}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Side - Active Conversation */}
            <div className="flex-1 flex flex-col h-full">
              {/* Conversation Header */}
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image 
                        src={activeConversation.user.avatar} 
                        alt={activeConversation.user.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    {activeConversation.user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-tertiary-500 border-2 border-white dark:border-neutral-900"></span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">
                        {activeConversation.user.name}
                      </h3>
                      {activeConversation.user.isVerified && (
                        <span className="ml-1 text-primary-500 dark:text-primary-400">
                          <span className="material-symbols-rounded text-sm fill-icon">verified</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {activeConversation.user.isOnline ? 'Online' : 'Offline'}
                      {activeConversation.user.department && ` • ${activeConversation.user.department}`}
                      {activeConversation.user.year && ` • ${activeConversation.user.year}`}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <span className="material-symbols-rounded">call</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <span className="material-symbols-rounded">videocam</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <span className="material-symbols-rounded">info</span>
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeConversation.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isSent && (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0 mt-1">
                        <Image 
                          src={activeConversation.user.avatar} 
                          alt={activeConversation.user.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                        message.isSent 
                          ? 'bg-primary-500 text-white rounded-tr-none' 
                          : 'bg-neutral-100 dark:bg-neutral-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`text-xs mt-1 flex justify-end ${
                        message.isSent ? 'text-white/70' : 'text-neutral-500 dark:text-neutral-400'
                      }`}>
                        {message.time}
                        {message.isSent && (
                          <span className="ml-1 material-symbols-rounded text-xs">
                            {message.isRead ? 'done_all' : 'done'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center">
                  <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mr-2">
                    <span className="material-symbols-rounded">add_circle</span>
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="w-full py-2 px-4 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <button className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-rounded text-neutral-500">mood</span>
                      </button>
                      <button className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        <span className="material-symbols-rounded text-neutral-500">attach_file</span>
                      </button>
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-primary-500 text-white ml-2 hover:bg-primary-600 transition-colors">
                    <span className="material-symbols-rounded">send</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Sidebar - Suggested Contacts */}
            <div className="w-64 border-l border-neutral-200 dark:border-neutral-800 hidden xl:block">
              <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="font-medium">Suggested Contacts</h3>
              </div>
              <div className="p-4 space-y-4">
                {suggestedContacts.map(contact => (
                  <div key={contact.id} className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <Image 
                        src={contact.avatar} 
                        alt={contact.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm truncate">
                          {contact.name}
                        </h4>
                        {contact.isVerified && (
                          <span className="ml-1 text-primary-500 dark:text-primary-400">
                            <span className="material-symbols-rounded text-xs fill-icon">verified</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                        {contact.department}
                      </p>
                    </div>
                    <button className="ml-2 text-primary-500 dark:text-primary-400">
                      <span className="material-symbols-rounded">chat</span>
                    </button>
                  </div>
                ))}
                <button className="w-full text-center text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline mt-2">
                  View All Contacts
                </button>
              </div>
              
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                <h3 className="font-medium mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm">
                    <span className="material-symbols-rounded mr-2 text-primary-500">group_add</span>
                    Create Group Chat
                  </button>
                  <button className="w-full flex items-center p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm">
                    <span className="material-symbols-rounded mr-2 text-secondary-500">bookmark</span>
                    Saved Messages
                  </button>
                  <button className="w-full flex items-center p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm">
                    <span className="material-symbols-rounded mr-2 text-tertiary-500">settings</span>
                    Message Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
