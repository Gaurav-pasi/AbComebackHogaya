import { useMemo } from 'react';
import { BarChart3, TrendingUp, Calendar, Flame } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../store';
import { CATEGORIES } from '../utils/constants';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const Analytics = () => {
  const { concepts, dsaProblems, questions, conceptProgress, dsaProgress, streak, studySessions } = useAppStore();

  // Category progress data
  const categoryData = useMemo(() => {
    return CATEGORIES.map((category, index) => {
      const categoryConcepts = concepts.filter((c) => c.category === category.id);
      const categoryCompleted = conceptProgress.filter(
        (p) =>
          (p.status === 'completed' || p.status === 'mastered') &&
          categoryConcepts.find((c) => c.id === p.concept_id)
      ).length;

      return {
        name: category.name,
        total: categoryConcepts.length,
        completed: categoryCompleted,
        percentage: categoryConcepts.length > 0 ? Math.round((categoryCompleted / categoryConcepts.length) * 100) : 0,
      };
    });
  }, [concepts, conceptProgress]);

  // DSA difficulty breakdown
  const dsaDifficultyData = useMemo(() => {
    const difficulties = ['easy', 'medium', 'hard'];
    return difficulties.map((difficulty) => {
      const total = dsaProblems.filter((p) => p.difficulty === difficulty).length;
      const solved = dsaProgress.filter((p) => {
        const problem = dsaProblems.find((pr) => pr.id === p.problem_id);
        return p.is_solved && problem?.difficulty === difficulty;
      }).length;

      return {
        name: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        total,
        solved,
        unsolved: total - solved,
      };
    });
  }, [dsaProblems, dsaProgress]);

  // Overall progress pie chart
  const overallProgressData = useMemo(() => {
    const totalConcepts = concepts.length;
    const completedConcepts = conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length;

    const totalDSA = dsaProblems.length;
    const solvedDSA = dsaProgress.filter((p) => p.is_solved).length;

    return [
      { name: 'Concepts Completed', value: completedConcepts },
      { name: 'Concepts Pending', value: totalConcepts - completedConcepts },
      { name: 'DSA Solved', value: solvedDSA },
      { name: 'DSA Pending', value: totalDSA - solvedDSA },
    ];
  }, [concepts, dsaProblems, conceptProgress, dsaProgress]);

  // Study sessions over time (last 7 days)
  const studyTimeData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map((date) => {
      const sessions = studySessions.filter((s) => s.date?.startsWith(date));
      const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);

      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: totalMinutes,
        sessions: sessions.length,
      };
    });
  }, [studySessions]);

  // Overall stats
  const stats = useMemo(() => {
    return {
      totalConcepts: concepts.length,
      completedConcepts: conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length,
      totalDSA: dsaProblems.length,
      solvedDSA: dsaProgress.filter((p) => p.is_solved).length,
      totalQuestions: questions.length,
      currentStreak: streak.current_streak,
      longestStreak: streak.longest_streak,
      totalStudyDays: streak.total_study_days,
    };
  }, [concepts, dsaProblems, questions, conceptProgress, dsaProgress, streak]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
            <BarChart3 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your learning progress and trends</p>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Concepts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completedConcepts}/{stats.totalConcepts}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">DSA Problems</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.solvedDSA}/{stats.totalDSA}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.currentStreak}</p>
              <p className="text-xs text-gray-500">days</p>
            </div>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Study Days</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudyDays}</p>
            </div>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Progress */}
        <Card>
          <Card.Header>
            <Card.Title>Progress by Category</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="total" fill="#3b82f6" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* DSA Difficulty Breakdown */}
        <Card>
          <Card.Header>
            <Card.Title>DSA Problems by Difficulty</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dsaDifficultyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="solved" stackId="a" fill="#10b981" name="Solved" />
                <Bar dataKey="unsolved" stackId="a" fill="#ef4444" name="Unsolved" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Study Time Trend */}
        <Card>
          <Card.Header>
            <Card.Title>Study Time (Last 7 Days)</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studyTimeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="date" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    border: '1px solid var(--tooltip-border)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="minutes" stroke="#8b5cf6" name="Minutes" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Overall Progress Pie */}
        <Card>
          <Card.Header>
            <Card.Title>Overall Progress Distribution</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={overallProgressData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {overallProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <Card.Header>
          <Card.Title>Achievements & Milestones</Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white">
              <p className="text-3xl font-bold mb-1">{stats.longestStreak}</p>
              <p className="text-sm opacity-90">Longest Streak (days)</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-400 to-cyan-500 rounded-lg text-white">
              <p className="text-3xl font-bold mb-1">{stats.totalStudyDays}</p>
              <p className="text-sm opacity-90">Total Study Days</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg text-white">
              <p className="text-3xl font-bold mb-1">
                {stats.completedConcepts + stats.solvedDSA}
              </p>
              <p className="text-sm opacity-90">Total Completed Items</p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default Analytics;
