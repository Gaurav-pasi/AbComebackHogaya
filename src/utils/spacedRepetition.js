import { addDays } from 'date-fns';
import { REPETITION_INTERVALS } from './constants';

/**
 * Calculate next review date based on spaced repetition algorithm
 * Uses simplified SM-2 algorithm with confidence adjustment
 * @param {number} reviewCount - Number of times reviewed
 * @param {string} lastReviewDate - ISO date of last review
 * @param {number} confidenceRating - 1-5 rating (optional)
 */
export function calculateNextReview(reviewCount, lastReviewDate, confidenceRating = 3) {
  // Adjust interval based on confidence (1=very hard, 5=very easy)
  let intervalIndex = Math.min(reviewCount, REPETITION_INTERVALS.length - 1);

  // Lower confidence reduces interval, higher confidence increases it
  if (confidenceRating <= 2) {
    // Hard: reduce interval or repeat sooner
    intervalIndex = Math.max(0, intervalIndex - 1);
  } else if (confidenceRating >= 4) {
    // Easy: can skip ahead slightly
    intervalIndex = Math.min(intervalIndex + 1, REPETITION_INTERVALS.length - 1);
  }

  const intervalDays = REPETITION_INTERVALS[intervalIndex];
  const lastReview = lastReviewDate ? new Date(lastReviewDate) : new Date();
  return addDays(lastReview, intervalDays).toISOString();
}

/**
 * Get items due for review today
 */
export function getItemsDueForReview(items) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return items.filter((item) => {
    if (!item.next_review_date) return false;

    const reviewDate = new Date(item.next_review_date);
    reviewDate.setHours(0, 0, 0, 0);

    return reviewDate <= today;
  });
}

/**
 * Check if item is due for review
 */
export function isDueForReview(nextReviewDate) {
  if (!nextReviewDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const reviewDate = new Date(nextReviewDate);
  reviewDate.setHours(0, 0, 0, 0);

  return reviewDate <= today;
}
