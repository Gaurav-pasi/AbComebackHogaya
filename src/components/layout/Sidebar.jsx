import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Code2, Settings, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Concepts', path: '/concepts', icon: BookOpen },
  { name: 'DSA Problems', path: '/dsa', icon: Code2 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-lg font-bold text-gray-900 dark:text-white">Menu</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-3" role="list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close mobile menu on navigation
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 mb-1 rounded-lg transition-all duration-200',
                    active
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                  aria-current={active ? 'page' : undefined}
                  role="listitem"
                >
                  <Icon
                    className={cn('w-5 h-5 flex-shrink-0', active ? 'text-teal-600 dark:text-teal-400' : '')}
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg p-4 text-white">
              <p className="text-sm font-medium mb-1">Keep Learning!</p>
              <p className="text-xs opacity-90">Track your progress and stay consistent</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
