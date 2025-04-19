'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function EventCalendar({ isOpen, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', or 'day'
  
  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Tech Fest 2023',
      description: 'Annual technology festival with competitions, workshops, and guest lectures.',
      startDate: new Date(2023, 4, 15, 9, 0), // May 15, 2023, 9:00 AM
      endDate: new Date(2023, 4, 17, 18, 0), // May 17, 2023, 6:00 PM
      location: 'Main Auditorium',
      organizer: 'Tech Club',
      image: 'https://picsum.photos/id/1/300/200',
      attendees: 245,
      category: 'academic',
      color: '#3b82f6', // blue
    },
    {
      id: 2,
      title: 'Campus Photography Contest',
      description: 'Show your photography skills and win amazing prizes. Theme: Campus Life.',
      startDate: new Date(2023, 3, 30, 10, 0), // April 30, 2023, 10:00 AM
      endDate: new Date(2023, 3, 30, 16, 0), // April 30, 2023, 4:00 PM
      location: 'Central Lawn',
      organizer: 'Photography Club',
      image: 'https://picsum.photos/id/11/300/200',
      attendees: 78,
      category: 'cultural',
      color: '#8b5cf6', // purple
    },
    {
      id: 3,
      title: 'Workshop: AI Basics',
      description: 'Introduction to artificial intelligence concepts and applications.',
      startDate: new Date(2023, 4, 20, 14, 0), // May 20, 2023, 2:00 PM
      endDate: new Date(2023, 4, 20, 17, 0), // May 20, 2023, 5:00 PM
      location: 'CS Department',
      organizer: 'AI Club',
      image: 'https://picsum.photos/id/9/300/200',
      attendees: 45,
      category: 'academic',
      color: '#10b981', // green
    },
    {
      id: 4,
      title: 'Alumni Meetup',
      description: 'Connect with alumni and learn from their experiences.',
      startDate: new Date(2023, 4, 28, 18, 0), // May 28, 2023, 6:00 PM
      endDate: new Date(2023, 4, 28, 21, 0), // May 28, 2023, 9:00 PM
      location: 'Central Lawn',
      organizer: 'Alumni Association',
      image: 'https://picsum.photos/id/8/300/200',
      attendees: 156,
      category: 'social',
      color: '#f59e0b', // amber
    },
  ];
  
  // Helper functions for calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Navigate to today
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  
  // Render calendar grid
  const renderCalendarGrid = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    const today = new Date();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const isToday = date.getDate() === today.getDate() && 
                      date.getMonth() === today.getMonth() && 
                      date.getFullYear() === today.getFullYear();
      const isSelected = date.getDate() === selectedDate.getDate() && 
                         date.getMonth() === selectedDate.getMonth() && 
                         date.getFullYear() === selectedDate.getFullYear();
      const dayEvents = getEventsForDate(date);
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-neutral-200 dark:border-neutral-700 p-1 overflow-hidden ${
            isToday ? 'bg-primary-50 dark:bg-primary-900/20' : ''
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`inline-block w-6 h-6 text-center ${
              isSelected 
                ? 'bg-primary-500 text-white rounded-full' 
                : isToday 
                  ? 'text-primary-600 dark:text-primary-400 font-bold' 
                  : ''
            }`}>
              {day}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div 
                key={event.id} 
                className="text-xs truncate px-1 py-0.5 rounded" 
                style={{ backgroundColor: `${event.color}20`, color: event.color }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 pl-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  // Get selected date events
  const selectedDateEvents = getEventsForDate(selectedDate);
  
  // Format date for display
  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold flex items-center">
            <span className="material-symbols-rounded mr-2 text-primary-500">event</span>
            Event Calendar
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        
        {/* Calendar Controls */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={prevMonth}
            >
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
            <h3 className="text-lg font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={nextMonth}
            >
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
            <button 
              className="ml-2 px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full"
              onClick={goToToday}
            >
              Today
            </button>
          </div>
          <div className="flex items-center space-x-1">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                view === 'month' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                view === 'week' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${
                view === 'day' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium' 
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 h-[calc(90vh-12rem)] overflow-hidden">
          {/* Calendar */}
          <div className="col-span-5 overflow-auto">
            {view === 'month' && (
              <div>
                {/* Day headers */}
                <div className="grid grid-cols-7 text-center py-2 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 sticky top-0 z-10">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="font-medium">{day}</div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                  {renderCalendarGrid()}
                </div>
              </div>
            )}
            
            {/* Week and Day views would be implemented here */}
            {(view === 'week' || view === 'day') && (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500 dark:text-neutral-400">
                  {view === 'week' ? 'Week' : 'Day'} view coming soon!
                </p>
              </div>
            )}
          </div>
          
          {/* Selected Date Events */}
          <div className="col-span-2 border-l border-neutral-200 dark:border-neutral-700 overflow-auto">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800 sticky top-0 z-10">
              <h3 className="font-medium">
                {formatDisplayDate(selectedDate)}
              </h3>
            </div>
            
            {selectedDateEvents.length > 0 ? (
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {selectedDateEvents.map(event => (
                  <div key={event.id} className="p-4">
                    <div className="flex items-start">
                      <div 
                        className="w-1 h-full rounded-full mr-3 self-stretch" 
                        style={{ backgroundColor: event.color }}
                      ></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 space-y-1">
                          <div className="flex items-center">
                            <span className="material-symbols-rounded text-sm mr-1">schedule</span>
                            <span>
                              {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                              {event.endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-symbols-rounded text-sm mr-1">location_on</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="material-symbols-rounded text-sm mr-1">group</span>
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <p className="text-sm mt-2">{event.description}</p>
                        <div className="mt-3 flex space-x-2">
                          <button className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
                            Interested
                          </button>
                          <button className="px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-neutral-500 dark:text-neutral-400">
                <span className="material-symbols-rounded text-4xl mb-2">event_busy</span>
                <p>No events scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#3b82f6] mr-1"></span>
              <span className="text-sm">Academic</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#8b5cf6] mr-1"></span>
              <span className="text-sm">Cultural</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] mr-1"></span>
              <span className="text-sm">Social</span>
            </div>
          </div>
          <Link 
            href="/events"
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            onClick={onClose}
          >
            View All Events
          </Link>
        </div>
      </div>
    </div>
  );
}
