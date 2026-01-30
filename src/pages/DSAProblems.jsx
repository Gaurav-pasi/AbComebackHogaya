import { useState, useMemo } from 'react';
import { Code2, Search, Filter, CheckCircle2, Circle, Award } from 'lucide-react';
import { useAppStore } from '../store';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Progress from '../components/common/Progress';
import EmptyState from '../components/common/EmptyState';

const DSAProblems = () => {
  const { dsaProblems, dsaProgress, updateDSAProgress } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterPattern, setFilterPattern] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Get unique patterns
  const allPatterns = useMemo(() => {
    const patterns = new Set();
    dsaProblems.forEach((problem) => {
      problem.patterns?.forEach((pattern) => patterns.add(pattern));
    });
    return Array.from(patterns).sort();
  }, [dsaProblems]);

  const filteredProblems = useMemo(() => {
    let filtered = [...dsaProblems];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.patterns?.some((pattern) => pattern.toLowerCase().includes(query))
      );
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === filterDifficulty);
    }

    // Pattern filter
    if (filterPattern !== 'all') {
      filtered = filtered.filter((p) => p.patterns?.includes(filterPattern));
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((p) => {
        const progress = dsaProgress.find((pr) => pr.problem_id === p.id);
        if (filterStatus === 'solved') {
          return progress?.is_solved === true;
        } else {
          return !progress?.is_solved;
        }
      });
    }

    return filtered;
  }, [dsaProblems, searchQuery, filterDifficulty, filterPattern, filterStatus, dsaProgress]);

  const stats = useMemo(() => {
    const total = dsaProblems.length;
    const solved = dsaProgress.filter((p) => p.is_solved).length;
    const byDifficulty = {
      easy: dsaProblems.filter((p) => p.difficulty === 'easy').length,
      medium: dsaProblems.filter((p) => p.difficulty === 'medium').length,
      hard: dsaProblems.filter((p) => p.difficulty === 'hard').length,
    };
    const solvedByDifficulty = {
      easy: dsaProgress.filter((p) => {
        const problem = dsaProblems.find((pr) => pr.id === p.problem_id);
        return p.is_solved && problem?.difficulty === 'easy';
      }).length,
      medium: dsaProgress.filter((p) => {
        const problem = dsaProblems.find((pr) => pr.id === p.problem_id);
        return p.is_solved && problem?.difficulty === 'medium';
      }).length,
      hard: dsaProgress.filter((p) => {
        const problem = dsaProblems.find((pr) => pr.id === p.problem_id);
        return p.is_solved && problem?.difficulty === 'hard';
      }).length,
    };

    return {
      total,
      solved,
      unsolved: total - solved,
      progress: total > 0 ? (solved / total) * 100 : 0,
      byDifficulty,
      solvedByDifficulty,
    };
  }, [dsaProblems, dsaProgress]);

  const handleToggleSolved = (problemId) => {
    const progress = dsaProgress.find((p) => p.problem_id === problemId);
    const isSolved = progress?.is_solved || false;

    updateDSAProgress({
      problem_id: problemId,
      is_solved: !isSolved,
      solved_at: !isSolved ? new Date().toISOString() : null,
    });
  };

  const isProblemSolved = (problemId) => {
    const progress = dsaProgress.find((p) => p.problem_id === problemId);
    return progress?.is_solved || false;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
            <Code2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DSA Problems</h1>
            <p className="text-gray-600 dark:text-gray-400">
              60 curated problems covering all important patterns
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Solved</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.solved}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unsolved</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.unsolved}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progress</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(stats.progress)}%
          </p>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Overall Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stats.solved}/{stats.total} solved
              </span>
            </div>
            <Progress value={stats.progress} color="green" />
          </div>

          {/* Difficulty Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Easy</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.solvedByDifficulty.easy}/{stats.byDifficulty.easy}
                </span>
              </div>
              <Progress
                value={(stats.solvedByDifficulty.easy / stats.byDifficulty.easy) * 100}
                color="green"
                size="sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.solvedByDifficulty.medium}/{stats.byDifficulty.medium}
                </span>
              </div>
              <Progress
                value={(stats.solvedByDifficulty.medium / stats.byDifficulty.medium) * 100}
                color="yellow"
                size="sm"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hard</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stats.solvedByDifficulty.hard}/{stats.byDifficulty.hard}
                </span>
              </div>
              <Progress
                value={(stats.solvedByDifficulty.hard / stats.byDifficulty.hard) * 100}
                color="red"
                size="sm"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="mb-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pattern
              </label>
              <select
                value={filterPattern}
                onChange={(e) => setFilterPattern(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Patterns</option>
                {allPatterns.map((pattern) => (
                  <option key={pattern} value={pattern}>
                    {pattern}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Problems List */}
      {filteredProblems.length === 0 ? (
        <EmptyState
          icon={Code2}
          title="No problems found"
          description="Try adjusting your filters or search query."
        />
      ) : (
        <div className="space-y-3">
          {filteredProblems.map((problem, index) => {
            const solved = isProblemSolved(problem.id);

            return (
              <Card
                key={problem.id}
                className={solved ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : ''}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleSolved(problem.id)}
                    className="mt-1 flex-shrink-0"
                    aria-label={solved ? 'Mark as unsolved' : 'Mark as solved'}
                  >
                    {solved ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>

                  {/* Problem Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3
                        className={`text-lg font-semibold ${
                          solved
                            ? 'text-green-900 dark:text-green-300 line-through'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {index + 1}. {problem.title}
                      </h3>
                      <Badge variant={problem.difficulty} className="ml-2 flex-shrink-0">
                        {problem.difficulty}
                      </Badge>
                    </div>

                    {problem.patterns && problem.patterns.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {problem.patterns.map((pattern) => (
                          <Badge key={pattern} variant="default" size="sm">
                            {pattern}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Achievement */}
      {stats.solved === stats.total && stats.total > 0 && (
        <Card className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 border-0">
          <div className="flex items-center justify-center space-x-3 text-white">
            <Award className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Congratulations!</h3>
              <p className="text-white/90">You've solved all {stats.total} problems!</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DSAProblems;
