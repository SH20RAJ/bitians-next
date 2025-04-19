export default function StatsCard({ title, value, change, icon, color }) {
  // Determine if change is positive, negative, or neutral
  const isPositive = change > 0;
  const isNegative = change < 0;
  const isNeutral = change === 0;
  
  // Format change as percentage with sign
  const formattedChange = isNeutral 
    ? '0%' 
    : `${isPositive ? '+' : ''}${change}%`;
  
  // Determine color class for change
  const changeColorClass = isPositive 
    ? 'text-green-600 dark:text-green-400' 
    : isNegative 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-neutral-600 dark:text-neutral-400';
  
  // Determine background color for icon
  const bgColorClass = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  }[color] || 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400';

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${changeColorClass}`}>
              {formattedChange}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
              vs last period
            </span>
          </div>
        </div>
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${bgColorClass}`}>
          <span className="material-symbols-rounded text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}
