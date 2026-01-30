import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Code2,
  MessageSquare,
  FolderGit2,
  TrendingUp,
  Flame,
  Clock,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Progress from '../components/common/Progress';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const Dashboard = () => {
  const { concepts, dsaProblems, questions, projects, conceptProgress, dsaProgress, projectProgress, streak, studySessions } =
    useAppStore();

  // Calculate stats
  const stats = useMemo(() => {
    const completedConcepts = conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length;
    const solvedProblems = dsaProgress.filter((p) => p.is_solved).length;
    const activeProjects = projectProgress.filter((p) => p.status === 'in_progress').length;

    return {
      concepts: {
        total: concepts.length,
        completed: completedConcepts,
        progress: concepts.length > 0 ? (completedConcepts / concepts.length) * 100 : 0,
      },
      dsa: {
        total: dsaProblems.length,
        completed: solvedProblems,
        progress: dsaProblems.length > 0 ? (solvedProblems / dsaProblems.length) * 100 : 0,
      },
      questions: {
        total: questions.length,
      },
      projects: {
        total: projects.length,
        active: activeProjects,
      },
    };
  }, [concepts, dsaProblems, questions, projects, conceptProgress, dsaProgress, projectProgress]);

  // Recent activity
  const recentActivity = useMemo(() => {
    const activities = [];

    // Recent concept progress
    const recentConcepts = conceptProgress
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 3);

    recentConcepts.forEach((cp) => {
      const concept = concepts.find((c) => c.id === cp.concept_id);
      if (concept) {
        activities.push({
          type: 'concept',
          title: concept.title,
          category: concept.category,
          status: cp.status,
          date: new Date(cp.updated_at),
        });
      }
    });

    // Recent DSA progress
    const recentDSA = dsaProgress
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 3);

    recentDSA.forEach((dp) => {
      const problem = dsaProblems.find((p) => p.id === dp.problem_id);
      if (problem) {
        activities.push({
          type: 'dsa',
          title: problem.title,
          difficulty: problem.difficulty,
          date: new Date(dp.updated_at),
        });
      }
    });

    return activities.sort((a, b) => b.date - a.date).slice(0, 5);
  }, [concepts, dsaProblems, conceptProgress, dsaProgress]);

  // Category progress
  const categoryProgress = useMemo(() => {
    return CATEGORIES.map((category) => {
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
  }, [concepts, conceptProgress]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your learning progress and stay motivated!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Concepts */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Concepts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.concepts.completed}/{stats.concepts.total}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <Progress value={stats.concepts.progress} color="blue" />
        </Card>

        {/* DSA Problems */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">DSA Problems</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.dsa.completed}/{stats.dsa.total}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <Progress value={stats.dsa.progress} color="green" />
        </Card>

        {/* Interview Questions */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Questions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.questions.total}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <Link to="/questions">
            <Button variant="outline" size="sm" className="w-full mt-2">
              View All
            </Button>
          </Link>
        </Card>

        {/* Projects */}
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.projects.active}/{stats.projects.total}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <FolderGit2 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <Link to="/projects">
            <Button variant="outline" size="sm" className="w-full mt-2">
              View All
            </Button>
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Streak Card */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Streak</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {streak.current_streak} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Longest Streak</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {streak.longest_streak} days
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Study Days</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {streak.total_study_days}
              </span>
            </div>
          </div>
        </Card>

        {/* Study Time */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
              <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Study Time</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{studySessions.length}</span>
            </div>
            <Link to="/study-session">
              <Button variant="primary" size="sm" className="w-full mt-2">
                Log Session
              </Button>
            </Link>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="space-y-2">
            <Link to="/concepts">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Study Concepts
              </Button>
            </Link>
            <Link to="/dsa">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Code2 className="w-4 h-4 mr-2" />
                Solve Problems
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Category Progress */}
      <Card className="mb-8">
        <Card.Header>
          <Card.Title>Progress by Category</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            {categoryProgress.map((category) => (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {category.completed}/{category.total}
                  </span>
                </div>
                <Progress value={category.progress} color="blue" />
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <Card.Title>Recent Activity</Card.Title>
            <Link to="/analytics">
              <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                View All
              </Button>
            </Link>
          </div>
        </Card.Header>
        <Card.Content>
          {recentActivity.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <div className={`p-2 rounded-lg ${activity.type === 'concept' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-green-100 dark:bg-green-900/20'}`}>
                    {activity.type === 'concept' ? (
                      <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Code2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {activity.type === 'concept' && activity.status && (
                        <Badge variant={activity.status} size="sm">
                          {activity.status.replace('_', ' ')}
                        </Badge>
                      )}
                      {activity.type === 'dsa' && activity.difficulty && (
                        <Badge variant={activity.difficulty} size="sm">
                          {activity.difficulty}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {activity.date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;
