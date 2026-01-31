import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Clock, X, BookOpen, Brain } from 'lucide-react';
import { useAppStore } from '../store';
import { getItemsDueForReview, calculateNextReview } from '../utils/spacedRepetition';
import { CATEGORIES } from '../utils/constants';
import { Card, Button, Badge, Progress } from '../components/common';

const FocusedStudy = () => {
  const navigate = useNavigate();
  const { concepts, conceptProgress, updateConceptProgress } = useAppStore();

  // Get concepts due for review or pick new ones
  const dueForReview = getItemsDueForReview(conceptProgress);
  const dueConceptIds = new Set(dueForReview.map((p) => p.concept_id));

  // Get concepts to study (due for review + some new ones)
  const studyConcepts = [
    ...concepts.filter((c) => dueConceptIds.has(c.id)),
    ...concepts
      .filter((c) => !conceptProgress.find((p) => p.concept_id === c.id))
      .slice(0, 5), // Add 5 new concepts
  ];

  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    reviewed: 0,
    mastered: 0,
    completed: 0,
  });
  const [showConcept, setShowConcept] = useState(false);

  const currentConcept = studyConcepts[currentIndex];
  const currentProgress = conceptProgress.find((p) => p.concept_id === currentConcept?.id);
  const category = CATEGORIES.find((cat) => cat.id === currentConcept?.category);

  // Session timer
  useEffect(() => {
    if (!sessionStarted) return;

    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    setShowConcept(false);
    setCurrentIndex(0);
    setSessionTime(0);
    setSessionStats({ reviewed: 0, mastered: 0, completed: 0 });
  };

  const handleRevealConcept = () => {
    setShowConcept(true);
  };

  const handleRateConfidence = (rating) => {
    const reviewCount = (currentProgress?.review_count || 0) + 1;
    const nextReviewDate = calculateNextReview(reviewCount, new Date().toISOString(), rating);

    updateConceptProgress({
      concept_id: currentConcept.id,
      status: rating >= 4 ? 'mastered' : 'completed',
      review_count: reviewCount,
      next_review_date: nextReviewDate,
      last_review_date: new Date().toISOString(),
      confidence_rating: rating,
    });

    // Update session stats
    setSessionStats((prev) => ({
      reviewed: prev.reviewed + 1,
      mastered: rating >= 4 ? prev.mastered + 1 : prev.mastered,
      completed: rating < 4 ? prev.completed + 1 : prev.completed,
    }));

    // Move to next concept
    if (currentIndex < studyConcepts.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowConcept(false);
    } else {
      // Session complete
      handleEndSession();
    }
  };

  const handleEndSession = () => {
    setSessionStarted(false);
  };

  if (!sessionStarted) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <Card>
          <Card.Header>
            <Card.Title className="text-xl sm:text-2xl flex items-center gap-2">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400" />
              Focused Study Mode
            </Card.Title>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
              Distraction-free learning with active recall
            </p>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4 sm:space-y-6">
              {/* Session Info */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 sm:p-6 border border-teal-200 dark:border-teal-800">
                <div className="flex items-start gap-3 sm:gap-4">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Ready to Study
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
                      You have <strong>{dueForReview.length} concepts</strong> due for review today.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-sm">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center">
                        <div className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {studyConcepts.length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Concepts</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center">
                        <div className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
                          {dueForReview.length}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Due Today</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 text-center col-span-2 sm:col-span-1">
                        <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ~{Math.ceil(studyConcepts.length * 1.5)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3">
                  How it works:
                </h4>
                <ol className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                      1
                    </span>
                    <span>Try to recall the concept before revealing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                      2
                    </span>
                    <span>Click "Reveal" to check your understanding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                      3
                    </span>
                    <span>Rate your confidence (1-5) to schedule next review</span>
                  </li>
                </ol>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleStartSession}
                  className="flex-1"
                  disabled={studyConcepts.length === 0}
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Session
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} className="flex-1 sm:flex-none">
                  Cancel
                </Button>
              </div>

              {studyConcepts.length === 0 && (
                <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400">
                  No concepts available. Complete some concepts first!
                </p>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  // Session complete
  if (sessionStarted && !currentConcept) {
    return (
      <div className="max-w-2xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <Card>
          <Card.Header>
            <Card.Title className="text-xl sm:text-2xl flex items-center gap-2">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              Session Complete!
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Great job! You've completed your study session.
              </p>

              {/* Session Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">
                    {sessionStats.reviewed}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Reviewed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {sessionStats.mastered}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Mastered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {formatTime(sessionTime)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Time</div>
                </div>
              </div>

              <Button onClick={() => navigate('/')} className="w-full">
                Back to Dashboard
              </Button>
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }

  // Active study session
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-3 sm:px-4 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Session Header */}
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="primary" className="text-xs sm:text-sm">
              {currentIndex + 1} / {studyConcepts.length}
            </Badge>
            <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-mono">{formatTime(sessionTime)}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleEndSession}>
            <X className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">End</span>
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6">
          <Progress value={((currentIndex + 1) / studyConcepts.length) * 100} color="teal" />
        </div>

        {/* Concept Card */}
        <Card className="mb-4 sm:mb-6">
          <Card.Content className="p-6 sm:p-8 lg:p-12">
            <div className="text-center space-y-4 sm:space-y-6">
              {/* Category Badge */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl">{category?.icon}</span>
                <Badge className="text-xs sm:text-sm">{category?.name}</Badge>
                {currentProgress && (
                  <Badge variant="secondary" className="text-xs sm:text-sm">
                    {currentProgress.review_count || 0}x reviewed
                  </Badge>
                )}
              </div>

              {/* Concept Title */}
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white px-4">
                {currentConcept.title}
              </h2>

              {/* Reveal Button or Description */}
              {!showConcept ? (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
                    Try to recall what you know before revealing...
                  </p>
                  <Button onClick={handleRevealConcept} size="lg">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Reveal Concept
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {currentConcept.description && (
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 px-4">
                      {currentConcept.description}
                    </p>
                  )}

                  {/* Confidence Rating */}
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      How well did you recall this?
                    </p>
                    <div className="grid grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRateConfidence(rating)}
                          className={`
                            p-3 sm:p-4 lg:p-6 rounded-lg border-2 transition-all
                            hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md
                            ${rating === 1 ? 'border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20' : ''}
                            ${rating === 2 ? 'border-orange-300 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-900/20' : ''}
                            ${rating === 3 ? 'border-yellow-300 hover:bg-yellow-50 dark:border-yellow-700 dark:hover:bg-yellow-900/20' : ''}
                            ${rating === 4 ? 'border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20' : ''}
                            ${rating === 5 ? 'border-teal-300 hover:bg-teal-50 dark:border-teal-700 dark:hover:bg-teal-900/20' : ''}
                          `}
                        >
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                            {rating}
                          </div>
                          <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                            {rating === 1 && 'Forgot'}
                            {rating === 2 && 'Hard'}
                            {rating === 3 && 'OK'}
                            {rating === 4 && 'Easy'}
                            {rating === 5 && 'Perfect'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>

        {/* Session Stats */}
        <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed: {sessionStats.reviewed} | Mastered: {sessionStats.mastered}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FocusedStudy;
