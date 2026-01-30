import { format, formatDistance, isToday, isYesterday, parseISO } from 'date-fns';

// Date formatting
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
};

export const formatRelativeDate = (date) => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(parsedDate)) return 'Today';
  if (isYesterday(parsedDate)) return 'Yesterday';

  return formatDistance(parsedDate, new Date(), { addSuffix: true });
};

// Time formatting
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Number formatting
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (value, total) => {
  if (total === 0) return '0%';
  return Math.round((value / total) * 100) + '%';
};

// String utilities
export const truncate = (str, length = 100) => {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
};

export const sortBy = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    not_started: 'text-gray-500',
    not_attempted: 'text-gray-500',
    in_progress: 'text-blue-500',
    attempted: 'text-blue-500',
    completed: 'text-green-500',
    solved: 'text-green-500',
    mastered: 'text-purple-500',
  };
  return colors[status] || 'text-gray-500';
};

// Get difficulty color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    beginner: 'text-green-500',
    easy: 'text-green-500',
    intermediate: 'text-yellow-500',
    medium: 'text-yellow-500',
    advanced: 'text-red-500',
    hard: 'text-red-500',
  };
  return colors[difficulty] || 'text-gray-500';
};
