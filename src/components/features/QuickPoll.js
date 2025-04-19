'use client';

import { useState } from 'react';

export default function QuickPoll({ poll, onVote, className }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(poll.hasVoted || false);
  const [results, setResults] = useState(poll.options.map(option => ({
    ...option,
    percentage: option.percentage || 0
  })));
  
  // Find the most voted option for highlighting
  const maxPercentage = Math.max(...results.map(option => option.percentage));
  
  const handleVote = () => {
    if (selectedOption === null || hasVoted) return;
    
    // In a real app, this would call an API
    // For now, we'll simulate the vote locally
    const newResults = results.map(option => {
      if (option.id === selectedOption) {
        // Increment the selected option's votes
        const newVotes = option.votes + 1;
        const totalVotes = poll.totalVotes + 1;
        return {
          ...option,
          votes: newVotes,
          percentage: Math.round((newVotes / totalVotes) * 100)
        };
      } else {
        // Recalculate percentages for other options
        const totalVotes = poll.totalVotes + 1;
        return {
          ...option,
          percentage: Math.round((option.votes / totalVotes) * 100)
        };
      }
    });
    
    setResults(newResults);
    setHasVoted(true);
    
    // Call the parent component's onVote handler if provided
    if (onVote) {
      onVote(selectedOption);
    }
  };

  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-xl shadow-card overflow-hidden ${className || ''}`}>
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{poll.question}</h3>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {poll.totalVotes} votes • {poll.timeLeft}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {results.map(option => (
            <div key={option.id}>
              {hasVoted ? (
                // Results view
                <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <div 
                    className={`absolute top-0 left-0 bottom-0 z-0 ${
                      option.percentage === maxPercentage && option.percentage > 0
                        ? 'bg-primary-100 dark:bg-primary-900/30'
                        : 'bg-neutral-100 dark:bg-neutral-800/50'
                    }`}
                    style={{ width: `${option.percentage}%` }}
                  />
                  <div className="relative z-10 flex justify-between items-center p-3">
                    <span className="font-medium">{option.text}</span>
                    <span className="font-medium">{option.percentage}%</span>
                  </div>
                </div>
              ) : (
                // Voting view
                <button
                  className={`w-full text-left p-3 rounded-lg border ${
                    selectedOption === option.id
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  } transition-colors`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  {option.text}
                </button>
              )}
            </div>
          ))}
        </div>
        
        {!hasVoted && (
          <button
            className={`w-full mt-4 py-2 rounded-lg font-medium ${
              selectedOption !== null
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
            } transition-colors`}
            onClick={handleVote}
            disabled={selectedOption === null}
          >
            Vote
          </button>
        )}
      </div>
    </div>
  );
}
