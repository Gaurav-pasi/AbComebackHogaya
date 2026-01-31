import { Link, useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Calendar, Flame, Brain, Play } from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import { Card, Progress, Badge, ReviewQueue, Button } from '../components/common';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Home = () => {
  const navigate = useNavigate();
  const { concepts, conceptProgress, streak } = useAppStore();

  // Calculate daily goal progress (default: 5 concepts/day)
  const DAILY_GOAL = 5;
  const today = new Date().toISOString().split('T')[0];
  const todayProgress = conceptProgress.filter(
    (p) => p.updated_at?.startsWith(today) && (p.status === 'completed' || p.status === 'mastered')
  ).length;
  const goalProgress = Math.min((todayProgress / DAILY_GOAL) * 100, 100);

  // Calculate category stats for overview
  const categoryStats = CATEGORIES.map((category) => {
    const categoryConcepts = concepts.filter((c) => c.category === category.id);
    const notStarted = categoryConcepts.filter(
      (c) => !conceptProgress.find((p) => p.concept_id === c.id)
    ).length;
    const inProgress = categoryConcepts.filter((c) =>
      conceptProgress.find((p) => p.concept_id === c.id && p.status === 'in_progress')
    ).length;
    const completed = categoryConcepts.filter((c) =>
      conceptProgress.find((p) => p.concept_id === c.id && p.status === 'completed')
    ).length;
    const mastered = categoryConcepts.filter((c) =>
      conceptProgress.find((p) => p.concept_id === c.id && p.status === 'mastered')
    ).length;

    return {
      ...category,
      total: categoryConcepts.length,
      notStarted,
      inProgress,
      completed,
      mastered,
      completedPercent:
        categoryConcepts.length > 0
          ? Math.round(((completed + mastered) / categoryConcepts.length) * 100)
          : 0,
    };
  });

  const COLORS = {
    notStarted: '#9ca3af',
    inProgress: '#3b82f6',
    completed: '#10b981',
    mastered: '#8b5cf6',
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Header - Mobile Optimized */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Track your learning progress and stay consistent
        </p>
      </div>

      {/* Top Stats - Mobile First Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 mb-6 sm:mb-8">
        {/* Streak Card */}
        <Card className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center">
            <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {streak.current_streak || 0}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Day Streak
            </div>
          </div>
        </Card>

        {/* Daily Goal Card */}
        <Card className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center">
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600 dark:text-teal-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {todayProgress}/{DAILY_GOAL}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Daily Goal
            </div>
          </div>
        </Card>

        {/* Total Concepts Card */}
        <Card className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
        </Card>

        {/* Study Days Card */}
        <Card className="p-3 sm:p-4">
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400 mb-2" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {streak.total_study_days || 0}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Study Days
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Goal Progress Bar */}
      <Card className="mb-6 sm:mb-8">
        <Card.Header>
          <Card.Title className="text-base sm:text-lg">Today's Progress</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Review {todayProgress} of {DAILY_GOAL} concepts today
              </span>
              <Badge variant={goalProgress >= 100 ? 'success' : 'primary'}>
                {Math.round(goalProgress)}%
              </Badge>
            </div>
            <Progress value={goalProgress} color="teal" />
            {goalProgress >= 100 && (
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">
                🎉 Daily goal achieved! Keep up the momentum!
              </p>
            )}

            {/* Focused Study Button */}
            <Button
              onClick={() => navigate('/study')}
              className="w-full"
              size="lg"
            >
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Start Focused Study Session
            </Button>
          </div>
        </Card.Content>
      </Card>

      {/* Review Queue - Most Important */}
      <div className="mb-6 sm:mb-8">
        <ReviewQueue />
      </div>

      {/* Category Overview with Mini Pie Charts */}
      <Card>
        <Card.Header>
          <Card.Title className="text-base sm:text-lg">Category Progress</Card.Title>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Quick overview of your progress across all categories
          </p>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categoryStats.map((category) => {
              const pieData = [
                { name: 'Not Started', value: category.notStarted, color: COLORS.notStarted },
                { name: 'In Progress', value: category.inProgress, color: COLORS.inProgress },
                { name: 'Completed', value: category.completed, color: COLORS.completed },
                { name: 'Mastered', value: category.mastered, color: COLORS.mastered },
              ].filter((item) => item.value > 0);

              return (
                <Link
                  key={category.id}
                  to={`/concepts/${category.id}`}
                  className="block"
                >
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-500 dark:hover:border-teal-400 transition-all hover:shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl sm:text-3xl">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {category.completed + category.mastered}/{category.total} concepts
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Mini Pie Chart */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                        {pieData.length > 0 ? (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="100%"
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={index} fill={entry.color} />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="w-full h-full rounded-full border-4 border-gray-200 dark:border-gray-700" />
                        )}
                      </div>

                      {/* Progress Info */}
                      <div className="flex-1">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {category.completedPercent}%
                        </div>
                        <Progress value={category.completedPercent} color="teal" size="sm" />
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="mt-3 grid grid-cols-2 gap-1 text-xs">
                      {category.mastered > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-purple-600" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {category.mastered} mastered
                          </span>
                        </div>
                      )}
                      {category.completed > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-600" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {category.completed} done
                          </span>
                        </div>
                      )}
                      {category.inProgress > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-600" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {category.inProgress} in progress
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Home;
