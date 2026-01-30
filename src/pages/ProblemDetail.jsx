import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { useAppStore } from '../store';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const ProblemDetail = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { dsaProblems, dsaProgress, updateDSAProgress } = useAppStore();

  const problem = dsaProblems.find((p) => p.id === problemId);
  const progress = dsaProgress.find((p) => p.problem_id === problemId);
  const isSolved = progress?.is_solved || false;

  const handleToggleSolved = () => {
    updateDSAProgress({
      problem_id: problemId,
      is_solved: !isSolved,
      solved_at: !isSolved ? new Date().toISOString() : null,
    });
  };

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          title="Problem not found"
          description="The requested problem does not exist."
          action
          actionLabel="Back to Problems"
          onAction={() => navigate('/dsa')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/dsa">
          <Button variant="ghost" size="sm" icon={ArrowLeft} className="mb-4">
            Back to Problems
          </Button>
        </Link>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
              {problem.patterns?.map((pattern) => (
                <Badge key={pattern} variant="default">
                  {pattern}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Solved Status */}
        <Card className={isSolved ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : ''}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isSolved ? (
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              ) : (
                <Circle className="w-8 h-8 text-gray-400" />
              )}
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isSolved ? 'Solved' : 'Not Solved'}
                </p>
                {isSolved && progress?.solved_at && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Solved on {new Date(progress.solved_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant={isSolved ? 'outline' : 'success'}
              onClick={handleToggleSolved}
            >
              {isSolved ? 'Mark as Unsolved' : 'Mark as Solved'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Problem Info */}
      <div className="space-y-6">
        {/* Description Note */}
        <Card>
          <Card.Header>
            <Card.Title>About This Problem</Card.Title>
          </Card.Header>
          <Card.Content>
            <p className="text-gray-600 dark:text-gray-400">
              This is a {problem.difficulty} level problem focusing on{' '}
              {problem.patterns?.join(', ') || 'various patterns'}.
            </p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-300">
                <strong>Note:</strong> This application is designed for tracking your problem-solving progress.
                For problem descriptions, examples, and constraints, please refer to LeetCode, HackerRank, or
                your preferred coding platform.
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Patterns */}
        {problem.patterns && problem.patterns.length > 0 && (
          <Card>
            <Card.Header>
              <Card.Title>Patterns & Techniques</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="flex flex-wrap gap-2">
                {problem.patterns.map((pattern) => (
                  <Badge key={pattern} variant="primary" size="lg">
                    {pattern}
                  </Badge>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}

        {/* External Resources */}
        <Card>
          <Card.Header>
            <Card.Title>Practice Resources</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="space-y-2">
              <a
                href={`https://leetcode.com/problemset/all/?search=${encodeURIComponent(problem.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">LeetCode</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Search problem →</span>
                </div>
              </a>
              <a
                href={`https://www.hackerrank.com/dashboard`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">HackerRank</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Practice problems →</span>
                </div>
              </a>
              <a
                href={`https://www.geeksforgeeks.org/`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">GeeksforGeeks</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Learn concepts →</span>
                </div>
              </a>
            </div>
          </Card.Content>
        </Card>

        {/* Notes Section */}
        <Card>
          <Card.Header>
            <Card.Title>Your Notes</Card.Title>
            <Card.Description>Add personal notes, approach, or solutions here (coming soon)</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="p-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400">Notes feature coming soon!</p>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ProblemDetail;
