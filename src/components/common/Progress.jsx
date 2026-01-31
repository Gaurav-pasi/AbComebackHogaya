import { cn } from '../../lib/utils';

const Progress = ({ value = 0, max = 100, size = 'md', color = 'blue', showLabel = false, className, ...props }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const colors = {
    blue: 'bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600',
    teal: 'bg-gradient-to-r from-teal-400 to-emerald-500 dark:from-teal-500 dark:to-emerald-600',
    green: 'bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600',
    red: 'bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-500 dark:to-pink-600',
    yellow: 'bg-gradient-to-r from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600',
    purple: 'bg-gradient-to-r from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600',
    gray: 'bg-gradient-to-r from-gray-400 to-slate-500 dark:from-gray-500 dark:to-slate-600',
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden shadow-inner',
          sizes[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out shadow-sm', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
