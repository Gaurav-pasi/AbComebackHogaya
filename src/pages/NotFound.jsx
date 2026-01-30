import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
          <div className="relative -mt-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <Button icon={Home} size="lg">
              Go Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg">
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">You might want to check:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/concepts" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Concepts
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/dsa" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              DSA Problems
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/questions" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Questions
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/projects" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
