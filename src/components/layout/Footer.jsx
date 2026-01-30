import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} AbComebackHogaya. All rights reserved.
          </p>

          {/* Made with love */}
          <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" aria-label="love" />
            <span>by Gaurav Pasi</span>
          </div>

          {/* Version */}
          <p className="text-xs text-gray-500 dark:text-gray-500">v1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
