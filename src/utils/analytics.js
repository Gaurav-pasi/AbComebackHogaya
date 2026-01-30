import { parseISO, format, subDays, eachDayOfInterval } from 'date-fns';

/**
 * Calculate current and longest streak
 */
export function calculateStreak(sessions) {
  if (!sessions || sessions.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Get unique dates sorted in reverse
  const uniqueDates = [...new Set(sessions.map((s) => s.session_date))].sort().reverse();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = format(new Date(), 'yyyy-MM-dd');
  let expectedDate = today;

  for (const date of uniqueDates) {
    if (date === expectedDate) {
      tempStreak++;
      if (date === today || date === getPreviousDate(today)) {
        currentStreak = tempStreak;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      expectedDate = getPreviousDate(expectedDate);
    } else if (date < expectedDate) {
      tempStreak = 1;
      expectedDate = getPreviousDate(date);
    }
  }

  return { currentStreak, longestStreak };
}

/**
 * Get previous date in YYYY-MM-DD format
 */
function getPreviousDate(dateStr) {
  const date = parseISO(dateStr);
  const previous = subDays(date, 1);
  return format(previous, 'yyyy-MM-dd');
}

/**
 * Get activity heatmap data for the last N days
 */
export function getHeatmapData(sessions, days = 90) {
  const today = new Date();
  const startDate = subDays(today, days - 1);

  const dateRange = eachDayOfInterval({ start: startDate, end: today });

  return dateRange.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const daySessions = sessions.filter((s) => s.session_date === dateStr);
    const totalMinutes = daySessions.reduce((sum, s) => sum + s.duration_minutes, 0);

    return {
      date: dateStr,
      count: daySessions.length,
      minutes: totalMinutes,
    };
  });
}

/**
 * Get total study time
 */
export function getTotalStudyTime(sessions) {
  return sessions.reduce((total, session) => total + session.duration_minutes, 0);
}

/**
 * Group sessions by date
 */
export function groupSessionsByDate(sessions) {
  return sessions.reduce((groups, session) => {
    const date = session.session_date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(session);
    return groups;
  }, {});
}

/**
 * Calculate category distribution
 */
export function getCategoryDistribution(progressData) {
  return progressData.reduce((dist, item) => {
    const category = item.category_id || item.category;
    if (!dist[category]) {
      dist[category] = { total: 0, completed: 0 };
    }
    dist[category].total++;
    if (item.status === 'completed' || item.status === 'solved' || item.status === 'mastered') {
      dist[category].completed++;
    }
    return dist;
  }, {});
}
