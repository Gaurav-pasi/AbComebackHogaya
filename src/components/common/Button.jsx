import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';

  const variants = {
    primary:
      'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white focus:ring-teal-400 shadow-teal-100 dark:shadow-teal-900/30',
    secondary:
      'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-400 dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:text-gray-200',
    success:
      'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white focus:ring-green-400 shadow-green-100',
    danger:
      'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white focus:ring-red-400 shadow-red-100',
    warning:
      'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white focus:ring-yellow-400 shadow-yellow-100',
    outline:
      'border-2 border-gray-200 hover:border-teal-300 hover:bg-teal-50 text-gray-700 focus:ring-teal-400 dark:border-gray-600 dark:hover:border-teal-500 dark:hover:bg-teal-900/20 dark:text-gray-200',
    ghost: 'hover:bg-gray-100/80 text-gray-600 focus:ring-gray-400 dark:hover:bg-gray-700/50 dark:text-gray-300 shadow-none',
    link: 'text-teal-600 hover:text-teal-700 hover:underline focus:ring-teal-400 dark:text-teal-400 dark:hover:text-teal-300 shadow-none',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />}
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" aria-hidden="true" />}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" aria-hidden="true" />}
    </button>
  );
};

export default Button;
