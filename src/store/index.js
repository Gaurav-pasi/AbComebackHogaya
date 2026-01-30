import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { storage } from '../lib/localStorage';
import { STORAGE_KEYS } from '../utils/constants';

// Theme store
export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: {
        getItem: (name) => {
          const value = storage.get(name);
          return value ? { state: value } : null;
        },
        setItem: (name, value) => {
          storage.set(name, value.state);
        },
        removeItem: (name) => {
          storage.remove(name);
        },
      },
    }
  )
);

// Main app store
export const useAppStore = create((set, get) => ({
  // Concepts
  concepts: storage.get(STORAGE_KEYS.CONCEPTS) || [],
  conceptProgress: storage.get(STORAGE_KEYS.CONCEPT_PROGRESS) || [],

  // DSA
  dsaProblems: storage.get(STORAGE_KEYS.DSA_PROBLEMS) || [],
  dsaProgress: storage.get(STORAGE_KEYS.DSA_PROGRESS) || [],

  // Questions
  questions: storage.get(STORAGE_KEYS.QUESTIONS) || [],
  practiceSessions: storage.get(STORAGE_KEYS.PRACTICE_SESSIONS) || [],

  // Projects
  projects: storage.get(STORAGE_KEYS.PROJECTS) || [],
  projectProgress: storage.get(STORAGE_KEYS.PROJECT_PROGRESS) || [],

  // Study sessions
  studySessions: storage.get(STORAGE_KEYS.STUDY_SESSIONS) || [],

  // Streak
  streak: storage.get(STORAGE_KEYS.STREAK) || {
    current_streak: 0,
    longest_streak: 0,
    last_activity_date: null,
    total_study_days: 0,
  },

  // Actions
  updateConceptProgress: (progressData) => {
    const { conceptProgress } = get();
    const existingIndex = conceptProgress.findIndex((p) => p.concept_id === progressData.concept_id);

    let newProgress;
    if (existingIndex >= 0) {
      newProgress = [...conceptProgress];
      newProgress[existingIndex] = { ...newProgress[existingIndex], ...progressData, updated_at: new Date().toISOString() };
    } else {
      newProgress = [...conceptProgress, { ...progressData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
    }

    storage.set(STORAGE_KEYS.CONCEPT_PROGRESS, newProgress);
    set({ conceptProgress: newProgress });
  },

  updateDSAProgress: (progressData) => {
    const { dsaProgress } = get();
    const existingIndex = dsaProgress.findIndex((p) => p.problem_id === progressData.problem_id);

    let newProgress;
    if (existingIndex >= 0) {
      newProgress = [...dsaProgress];
      newProgress[existingIndex] = { ...newProgress[existingIndex], ...progressData, updated_at: new Date().toISOString() };
    } else {
      newProgress = [...dsaProgress, { ...progressData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
    }

    storage.set(STORAGE_KEYS.DSA_PROGRESS, newProgress);
    set({ dsaProgress: newProgress });
  },

  addQuestion: (question) => {
    const { questions } = get();
    const newQuestion = {
      ...question,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const newQuestions = [...questions, newQuestion];
    storage.set(STORAGE_KEYS.QUESTIONS, newQuestions);
    set({ questions: newQuestions });
    return newQuestion;
  },

  updateQuestion: (id, updates) => {
    const { questions } = get();
    const newQuestions = questions.map((q) => (q.id === id ? { ...q, ...updates, updated_at: new Date().toISOString() } : q));
    storage.set(STORAGE_KEYS.QUESTIONS, newQuestions);
    set({ questions: newQuestions });
  },

  deleteQuestion: (id) => {
    const { questions } = get();
    const newQuestions = questions.filter((q) => q.id !== id);
    storage.set(STORAGE_KEYS.QUESTIONS, newQuestions);
    set({ questions: newQuestions });
  },

  updateProjectProgress: (progressData) => {
    const { projectProgress } = get();
    const existingIndex = projectProgress.findIndex((p) => p.project_id === progressData.project_id);

    let newProgress;
    if (existingIndex >= 0) {
      newProgress = [...projectProgress];
      newProgress[existingIndex] = { ...newProgress[existingIndex], ...progressData, updated_at: new Date().toISOString() };
    } else {
      newProgress = [...projectProgress, { ...progressData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }];
    }

    storage.set(STORAGE_KEYS.PROJECT_PROGRESS, newProgress);
    set({ projectProgress: newProgress });
  },

  addStudySession: (session) => {
    const { studySessions } = get();
    const newSession = {
      ...session,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    const newSessions = [...studySessions, newSession];
    storage.set(STORAGE_KEYS.STUDY_SESSIONS, newSessions);
    set({ studySessions: newSessions });
    return newSession;
  },

  updateStreak: (streakData) => {
    storage.set(STORAGE_KEYS.STREAK, streakData);
    set({ streak: streakData });
  },

  // Clear all data
  clearAllData: () => {
    storage.clear();
    set({
      concepts: [],
      conceptProgress: [],
      dsaProblems: [],
      dsaProgress: [],
      questions: [],
      practiceSessions: [],
      projects: [],
      projectProgress: [],
      studySessions: [],
      streak: {
        current_streak: 0,
        longest_streak: 0,
        last_activity_date: null,
        total_study_days: 0,
      },
    });
  },

  // Load seed data
  loadSeedData: (data) => {
    if (data.concepts) {
      storage.set(STORAGE_KEYS.CONCEPTS, data.concepts);
      set({ concepts: data.concepts });
    }
    if (data.dsaProblems) {
      storage.set(STORAGE_KEYS.DSA_PROBLEMS, data.dsaProblems);
      set({ dsaProblems: data.dsaProblems });
    }
    if (data.projects) {
      storage.set(STORAGE_KEYS.PROJECTS, data.projects);
      set({ projects: data.projects });
    }
  },
}));
