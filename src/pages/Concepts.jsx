import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Progress from '../components/common/Progress';

const Concepts = () => {
  const { concepts, conceptProgress } = useAppStore();

  const categoryStats = CATEGORIES.map((category) => {
    const categoryConcepts = concepts.filter((c) => c.category === category.id);
    const categoryCompleted = conceptProgress.filter(
      (p) =>
        (p.status === 'completed' || p.status === 'mastered') &&
        categoryConcepts.find((c) => c.id === p.concept_id)
    ).length;

    return {
      ...category,
      total: categoryConcepts.length,
      completed: categoryCompleted,
      progress: categoryConcepts.length > 0 ? (categoryCompleted / categoryConcepts.length) * 100 : 0,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Concepts</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Master key concepts across 6 categories
            </p>
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryStats.map((category) => (
          <Link key={category.id} to={`/concepts/${category.id}`}>
            <Card hover className="h-full group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl" aria-hidden="true">
                    {category.icon}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                      {category.name}
                      <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {category.completed}/{category.total} concepts
                  </span>
                </div>
                <Progress value={category.progress} color="blue" />
              </div>

              {category.total === 0 && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    No concepts available yet
                  </p>
                </div>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="mt-8">
        <Card.Header>
          <Card.Title>Overall Progress</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Concepts</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{concepts.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {conceptProgress.filter((p) => p.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Concepts;
