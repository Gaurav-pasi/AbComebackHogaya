import { Link } from 'react-router-dom';
import { BookOpen, Code2, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const { concepts, dsaProblems, conceptProgress, dsaProgress } = useAppStore();

  const totalConcepts = concepts.length;
  const completedConcepts = conceptProgress.filter(
    (p) => p.status === 'completed' || p.status === 'mastered'
  ).length;
  const conceptsProgress = totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0;

  const totalDSA = dsaProblems.length;
  const completedDSA = dsaProgress.filter((p) => p.is_solved).length;
  const dsaProgressPercent = totalDSA > 0 ? Math.round((completedDSA / totalDSA) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            AbComebackHogaya
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Track your learning journey across JavaScript, Node.js, Express, SQL, DSA, and System Architecture
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link to="/concepts">
          <Card hover className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/20">
                  <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Concepts</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {completedConcepts} of {totalConcepts}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{conceptsProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${conceptsProgress}%` }}
              />
            </div>
          </Card>
        </Link>

        <Link to="/dsa">
          <Card hover className="h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">DSA Problems</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {completedDSA} of {totalDSA}
                  </p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">{dsaProgressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${dsaProgressPercent}%` }}
              />
            </div>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/concepts">
          <Card hover className="h-full">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-teal-100 dark:bg-teal-900/20">
                <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Learn Concepts
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  290+ concepts across JavaScript, Node.js, Express, SQL, and System Architecture
                </p>
                <div className="flex items-center text-sm text-teal-600 dark:text-teal-400">
                  <span>Start Learning →</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/dsa">
          <Card hover className="h-full">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                <Code2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Solve DSA Problems
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  60 curated problems covering all important patterns and data structures
                </p>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <span>Start Solving →</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Home;
