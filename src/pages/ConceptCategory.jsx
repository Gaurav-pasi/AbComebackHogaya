import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, BookOpen, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Progress from '../components/common/Progress';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';

const ConceptCategory = () => {
  const { categoryId } = useParams();
  const { concepts, conceptProgress, updateConceptProgress } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const category = CATEGORIES.find((c) => c.id === categoryId);

  const categoryConcepts = useMemo(() => {
    let filtered = concepts.filter((c) => c.category === categoryId);

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter((c) => {
        const progress = conceptProgress.find((p) => p.concept_id === c.id);
        return progress?.status === filterStatus || (!progress && filterStatus === 'not_started');
      });
    }

    // Difficulty filter
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter((c) => c.difficulty === filterDifficulty);
    }

    return filtered;
  }, [concepts, categoryId, searchQuery, filterStatus, filterDifficulty, conceptProgress]);

  const stats = useMemo(() => {
    const total = concepts.filter((c) => c.category === categoryId).length;
    const completed = conceptProgress.filter(
      (p) =>
        (p.status === 'completed' || p.status === 'mastered') &&
        concepts.find((c) => c.id === p.concept_id && c.category === categoryId)
    ).length;
    const inProgress = conceptProgress.filter(
      (p) =>
        p.status === 'in_progress' &&
        concepts.find((c) => c.id === p.concept_id && c.category === categoryId)
    ).length;

    return {
      total,
      completed,
      inProgress,
      notStarted: total - completed - inProgress,
      progress: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [concepts, conceptProgress, categoryId]);

  const handleStatusChange = (conceptId, status) => {
    updateConceptProgress({
      concept_id: conceptId,
      status,
    });
  };

  const getConceptProgress = (conceptId) => {
    return conceptProgress.find((p) => p.concept_id === conceptId);
  };

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState title="Category not found" description="The requested category does not exist." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link to="/concepts">
          <Button variant="ghost" size="sm" icon={ArrowLeft} className="mb-4">
            Back to Concepts
          </Button>
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{category.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
            </div>
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Not Started</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.notStarted}</p>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Overall Progress</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {stats.completed}/{stats.total} completed
          </span>
        </div>
        <Progress value={stats.progress} color="blue" />
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
              placeholder="Search concepts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Status and Difficulty Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="mastered">Mastered</option>
              </select>
            </div>

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
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Concepts List */}
      {categoryConcepts.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No concepts found"
          description="Try adjusting your filters or search query."
        />
      ) : (
        <div className="space-y-4">
          {categoryConcepts.map((concept) => {
            const progress = getConceptProgress(concept.id);
            const status = progress?.status || 'not_started';

            return (
              <Card key={concept.id} hover>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3 mb-2">
                      <div className="mt-1">
                        {status === 'completed' || status === 'mastered' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : status === 'in_progress' ? (
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {concept.title}
                        </h3>
                        {concept.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {concept.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={concept.difficulty}>{concept.difficulty}</Badge>
                          {concept.tags?.map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <select
                      value={status}
                      onChange={(e) => handleStatusChange(concept.id, e.target.value)}
                      className="px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      aria-label={`Change status for ${concept.title}`}
                    >
                      <option value="not_started">Not Started</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="mastered">Mastered</option>
                    </select>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConceptCategory;
