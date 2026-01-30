import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, MessageSquare, BarChart3, Zap, Target } from 'lucide-react';
import { useAppStore } from '../store';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const { concepts, dsaProblems, questions, conceptProgress, dsaProgress } = useAppStore();

  const stats = [
    {
      label: 'Concepts',
      value: concepts.length,
      completed: conceptProgress.filter((p) => p.status === 'completed' || p.status === 'mastered').length,
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      label: 'DSA Problems',
      value: dsaProblems.length,
      completed: dsaProgress.filter((p) => p.is_solved).length,
      icon: Code2,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      label: 'Interview Questions',
      value: questions.length,
      completed: 0,
      icon: MessageSquare,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  const features = [
    {
      title: 'Track Concepts',
      description: 'Master JavaScript, Node.js, Express, SQL, and System Architecture',
      icon: BookOpen,
      link: '/concepts',
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Solve DSA Problems',
      description: '60 curated problems covering all important patterns',
      icon: Code2,
      link: '/dsa',
      color: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Practice Interviews',
      description: 'Prepare with common interview questions',
      icon: MessageSquare,
      link: '/questions',
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'View Analytics',
      description: 'Track your progress with detailed analytics',
      icon: BarChart3,
      link: '/analytics',
      color: 'text-yellow-600 dark:text-yellow-400',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AbComebackHogaya
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Your comprehensive learning tracker for mastering full-stack development, DSA, and system design.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button as={Link} to="/dashboard" icon={Zap} size="lg">
            Go to Dashboard
          </Button>
          <Button as={Link} to="/concepts" variant="outline" icon={Target} size="lg">
            Start Learning
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const progress = stat.value > 0 ? (stat.completed / stat.value) * 100 : 0;

          return (
            <Card key={index} hover>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.completed}/{stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {Math.round(progress)}% completed
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link key={index} to={feature.link}>
                <Card hover className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${feature.color}`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        {feature.title}
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to level up?</h2>
          <p className="text-white/90 mb-6">Start tracking your progress today and stay consistent!</p>
          <Button
            as={Link}
            to="/dashboard"
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
