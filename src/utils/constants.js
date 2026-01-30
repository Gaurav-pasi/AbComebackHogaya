// Storage keys
export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  CONCEPTS: 'concepts',
  CONCEPT_PROGRESS: 'user_concept_progress',
  DSA_PROBLEMS: 'dsa_problems',
  DSA_PROGRESS: 'user_dsa_progress',
  QUESTIONS: 'interview_questions',
  PRACTICE_SESSIONS: 'interview_practice_sessions',
  PROJECTS: 'portfolio_projects',
  PROJECT_PROGRESS: 'user_project_progress',
  STUDY_SESSIONS: 'study_sessions',
  STREAK: 'user_streak',
  THEME: 'theme',
  INITIALIZED: 'data_initialized',
};

// Categories
export const CATEGORIES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    color: '#F7DF1E',
    description: 'Core language concepts, ES6+, async/await, and more',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    color: '#339933',
    description: 'Runtime concepts, modules, streams, and core APIs',
  },
  {
    id: 'express',
    name: 'Express',
    icon: '🚂',
    color: '#000000',
    description: 'Web framework, routing, middleware, and best practices',
  },
  {
    id: 'sql',
    name: 'SQL/PostgreSQL',
    icon: '🐘',
    color: '#336791',
    description: 'Queries, joins, transactions, indexes, and optimization',
  },
  {
    id: 'dsa',
    name: 'DSA',
    icon: '🧮',
    color: '#FF6B6B',
    description: 'Data structures, algorithms, and problem-solving patterns',
  },
  {
    id: 'system_architecture',
    name: 'System Architecture',
    icon: '🏗️',
    color: '#4ECDC4',
    description: 'Scalability, design patterns, and architectural concepts',
  },
];

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  EASY: 'easy',
  INTERMEDIATE: 'intermediate',
  MEDIUM: 'medium',
  ADVANCED: 'advanced',
  HARD: 'hard',
};

// Status
export const STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  MASTERED: 'mastered',
  NOT_ATTEMPTED: 'not_attempted',
  ATTEMPTED: 'attempted',
  SOLVED: 'solved',
};

// Activity types
export const ACTIVITY_TYPES = {
  CONCEPT: 'concept',
  DSA: 'dsa',
  INTERVIEW_PREP: 'interview_prep',
  PROJECT: 'project',
};

// Confidence levels
export const CONFIDENCE_LEVELS = [1, 2, 3, 4, 5];

// Spaced repetition intervals (in days)
export const REPETITION_INTERVALS = [1, 3, 7, 14, 30, 60, 120];
