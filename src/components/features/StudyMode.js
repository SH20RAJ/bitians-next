'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function StudyMode({ isOpen, onClose, content }) {
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [notes, setNotes] = useState('');
  const [focusScore, setFocusScore] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [timerDuration, setTimerDuration] = useState(25);
  const [ambientSound, setAmbientSound] = useState('none');
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    let interval;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        // Increment focus score every minute
        if (timer % 60 === 0) {
          setFocusScore(prevScore => prevScore + 1);
        }
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      // Play sound or notification when timer ends
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);
  
  // Handle timer controls
  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(timerDuration * 60);
  };
  
  // Handle timer duration change
  const handleDurationChange = (minutes) => {
    setTimerDuration(minutes);
    setTimer(minutes * 60);
  };
  
  // Ambient sound options
  const ambientSounds = [
    { id: 'none', name: 'None', icon: 'volume_off' },
    { id: 'rain', name: 'Rain', icon: 'water_drop' },
    { id: 'cafe', name: 'Café', icon: 'coffee' },
    { id: 'nature', name: 'Nature', icon: 'forest' },
    { id: 'whitenoise', name: 'White Noise', icon: 'waves' },
  ];
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 overflow-auto">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="material-symbols-rounded text-3xl text-primary-500 mr-2">school</span>
            <h1 className="text-2xl font-bold">Study Mode</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setShowSettings(!showSettings)}
            >
              <span className="material-symbols-rounded">settings</span>
            </button>
            <button 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={onClose}
            >
              <span className="material-symbols-rounded">close</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">{content?.title || 'Study Material'}</h2>
              <div className="prose dark:prose-invert max-w-none">
                {content?.body || (
                  <div>
                    <p>This is your distraction-free study environment. Use the timer to stay focused and take notes as you study.</p>
                    <p className="mt-4">Tips for effective studying:</p>
                    <ul>
                      <li>Break your study session into 25-minute focused blocks</li>
                      <li>Take short 5-minute breaks between sessions</li>
                      <li>After 4 sessions, take a longer 15-30 minute break</li>
                      <li>Stay hydrated and maintain good posture</li>
                      <li>Use the notes section to summarize key concepts</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Notes */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Notes</h2>
              <textarea
                className="w-full h-40 p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Take notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Timer and Tools */}
          <div className="space-y-6">
            {/* Timer */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Focus Timer</h2>
              <div className="text-center">
                <div className="text-5xl font-bold mb-6">{formatTime(timer)}</div>
                <div className="flex justify-center space-x-3 mb-6">
                  {!isTimerRunning ? (
                    <button 
                      className="p-3 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                      onClick={startTimer}
                    >
                      <span className="material-symbols-rounded">play_arrow</span>
                    </button>
                  ) : (
                    <button 
                      className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                      onClick={pauseTimer}
                    >
                      <span className="material-symbols-rounded">pause</span>
                    </button>
                  )}
                  <button 
                    className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                    onClick={resetTimer}
                  >
                    <span className="material-symbols-rounded">refresh</span>
                  </button>
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                  {[5, 15, 25, 45].map(duration => (
                    <button 
                      key={duration}
                      className={`px-3 py-1 rounded-full text-sm ${
                        timerDuration === duration
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 font-medium'
                          : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                      }`}
                      onClick={() => handleDurationChange(duration)}
                    >
                      {duration}m
                    </button>
                  ))}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  Focus Score: {focusScore} points
                </div>
              </div>
            </div>
            
            {/* Ambient Sounds */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Ambient Sound</h2>
              <div className="grid grid-cols-3 gap-2">
                {ambientSounds.map(sound => (
                  <button
                    key={sound.id}
                    className={`p-3 rounded-lg flex flex-col items-center ${
                      ambientSound === sound.id
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    } transition-colors`}
                    onClick={() => setAmbientSound(sound.id)}
                  >
                    <span className="material-symbols-rounded text-2xl mb-1">{sound.icon}</span>
                    <span className="text-xs">{sound.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Focus Stats */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6">
              <h2 className="text-xl font-semibold mb-4">Focus Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Today's Focus Time</span>
                  <span className="font-medium">1h 45m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Weekly Focus Time</span>
                  <span className="font-medium">8h 20m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Focus Streak</span>
                  <span className="font-medium">3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Focus Score</span>
                  <span className="font-medium">145 points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
