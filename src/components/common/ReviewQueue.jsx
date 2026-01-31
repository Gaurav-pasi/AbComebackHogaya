import { useState } from 'react';
import { RefreshCw, CheckCircle, BookOpen } from 'lucide-react';
import { useAppStore } from '../../store';
import { getItemsDueForReview, calculateNextReview } from '../../utils/spacedRepetition';
import { CATEGORIES } from '../../utils/constants';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import Modal from './Modal';

const ReviewQueue = () => {
  const { concepts, conceptProgress, updateConceptProgress } = useAppStore();
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [showConfidenceModal, setShowConfidenceModal] = useState(false);

  // Get concepts due for review
  const dueForReview = getItemsDueForReview(conceptProgress);

  // Get full concept details for due items
  const dueConceptsWithDetails = dueForReview.map((progress) => {
    const concept = concepts.find((c) => c.id === progress.concept_id);
    const category = CATEGORIES.find((cat) => cat.id === concept?.category);
    return {
      ...progress,
      concept,
      category,
    };
  }).filter((item) => item.concept); // Filter out any missing concepts

  const handleStartReview = (concept) => {
    setSelectedConcept(concept);
    setShowConfidenceModal(true);
  };

  const handleConfidenceRating = (rating) => {
    if (!selectedConcept) return;

    const currentReviewCount = selectedConcept.review_count || 0;
    const nextReviewDate = calculateNextReview(
      currentReviewCount + 1,
      new Date().toISOString(),
      rating
    );

    updateConceptProgress({
      concept_id: selectedConcept.concept_id,
      status: rating >= 4 ? 'mastered' : 'completed',
      review_count: currentReviewCount + 1,
      next_review_date: nextReviewDate,
      last_review_date: new Date().toISOString(),
      confidence_rating: rating,
    });

    setShowConfidenceModal(false);
    setSelectedConcept(null);
  };

  if (dueConceptsWithDetails.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Review Queue
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              You're all caught up! No reviews due today.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Keep learning new concepts to build your review queue.
            </p>
          </div>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Review Queue
            <Badge variant="primary">{dueConceptsWithDetails.length}</Badge>
          </Card.Title>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Concepts due for review today
          </p>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dueConceptsWithDetails.map((item) => (
              <div
                key={item.concept_id}
                className="flex items-start justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.category?.icon}</span>
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {item.concept?.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.category?.name}</span>
                    <span>•</span>
                    <span>Reviewed {item.review_count || 0} times</span>
                    {item.confidence_rating && (
                      <>
                        <span>•</span>
                        <span>Confidence: {item.confidence_rating}/5</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleStartReview(item)}
                  className="flex-shrink-0"
                >
                  <BookOpen className="w-4 h-4 mr-1" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Confidence Rating Modal */}
      <Modal
        isOpen={showConfidenceModal}
        onClose={() => {
          setShowConfidenceModal(false);
          setSelectedConcept(null);
        }}
        title="How well did you recall this concept?"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Rate your confidence in recalling{' '}
            <span className="font-medium text-gray-900 dark:text-white">
              {selectedConcept?.concept?.title}
            </span>
          </p>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleConfidenceRating(rating)}
                className={`
                  p-4 rounded-lg border-2 transition-all text-center
                  hover:border-teal-500 dark:hover:border-teal-400
                  ${rating === 1 ? 'border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20' : ''}
                  ${rating === 2 ? 'border-orange-200 hover:bg-orange-50 dark:border-orange-800 dark:hover:bg-orange-900/20' : ''}
                  ${rating === 3 ? 'border-yellow-200 hover:bg-yellow-50 dark:border-yellow-800 dark:hover:bg-yellow-900/20' : ''}
                  ${rating === 4 ? 'border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20' : ''}
                  ${rating === 5 ? 'border-teal-200 hover:bg-teal-50 dark:border-teal-800 dark:hover:bg-teal-900/20' : ''}
                `}
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {rating}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {rating === 1 && 'Forgot'}
                  {rating === 2 && 'Hard'}
                  {rating === 3 && 'Medium'}
                  {rating === 4 && 'Easy'}
                  {rating === 5 && 'Perfect'}
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            Lower ratings will schedule this concept for earlier review
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ReviewQueue;
