import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { UserProgress, TaskStatus, Theme } from '../types';
import { saveProgress, loadProgress } from '../utils/persistence';
import { achievements } from '../constants';

// ── Action Types ──
type Action =
  | { type: 'TOGGLE_TASK'; taskId: string; duration: number }
  | { type: 'SET_TASK_STATUS'; taskId: string; status: TaskStatus }
  | { type: 'SET_NOTE'; taskId: string; note: string }
  | { type: 'COMPLETE_PRACTICE_DAY'; day: number }
  | { type: 'SET_CURRENT_DAY'; day: number }
  | { type: 'TOGGLE_BONUS_COURSE'; courseId: string }
  | { type: 'SET_THEME'; theme: Theme }
  | { type: 'RESET_PROGRESS' }
  | { type: 'IMPORT_PROGRESS'; progress: UserProgress };

// ── Date Helpers ──
function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function daysBetween(d1: string, d2: string): number {
  const date1 = new Date(d1 + 'T00:00:00');
  const date2 = new Date(d2 + 'T00:00:00');
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

function updateStreak(streak: UserProgress['streak']): UserProgress['streak'] {
  const today = getToday();
  const { lastActivityDate, current, longest } = streak;

  if (!lastActivityDate) {
    return { current: 1, longest: Math.max(1, longest), lastActivityDate: today };
  }
  if (lastActivityDate === today) {
    return streak; // already active today
  }

  const gap = daysBetween(lastActivityDate, today);

  if (gap === 1) {
    const newCurrent = current + 1;
    return { current: newCurrent, longest: Math.max(newCurrent, longest), lastActivityDate: today };
  }

  // Streak broken, start fresh
  return { current: 1, longest: Math.max(1, longest), lastActivityDate: today };
}

function checkNewAchievements(state: UserProgress): string[] {
  const newlyUnlocked: string[] = [];
  for (const a of achievements) {
    if (!state.unlockedAchievements.includes(a.id) && a.condition(state)) {
      newlyUnlocked.push(a.id);
    }
  }
  return newlyUnlocked;
}

// ── Reducer ──
function reducer(state: UserProgress, action: Action): UserProgress {
  let next: UserProgress;

  switch (action.type) {
    case 'TOGGLE_TASK': {
      const isCompleted = state.completedTasks.includes(action.taskId);
      const today = getToday();

      if (isCompleted) {
        // Uncomplete
        next = {
          ...state,
          completedTasks: state.completedTasks.filter(id => id !== action.taskId),
          taskStatuses: { ...state.taskStatuses, [action.taskId]: 'not-started' },
          totalStudyMinutes: Math.max(0, state.totalStudyMinutes - action.duration),
          dailyActivity: {
            ...state.dailyActivity,
            [today]: Math.max(0, (state.dailyActivity[today] || 0) - 1),
          },
        };
      } else {
        // Complete
        const newStreak = updateStreak(state.streak);
        next = {
          ...state,
          completedTasks: [...state.completedTasks, action.taskId],
          taskStatuses: { ...state.taskStatuses, [action.taskId]: 'completed' },
          streak: newStreak,
          totalStudyMinutes: state.totalStudyMinutes + action.duration,
          startDate: state.startDate || today,
          dailyActivity: {
            ...state.dailyActivity,
            [today]: (state.dailyActivity[today] || 0) + 1,
          },
        };
      }
      break;
    }

    case 'SET_TASK_STATUS': {
      next = {
        ...state,
        taskStatuses: { ...state.taskStatuses, [action.taskId]: action.status },
      };
      // If marking as completed through status and not already in completedTasks
      if (action.status === 'completed' && !state.completedTasks.includes(action.taskId)) {
        next.completedTasks = [...state.completedTasks, action.taskId];
      }
      // If un-completing through status
      if (action.status !== 'completed' && state.completedTasks.includes(action.taskId)) {
        next.completedTasks = state.completedTasks.filter(id => id !== action.taskId);
      }
      break;
    }

    case 'SET_NOTE': {
      next = {
        ...state,
        notes: { ...state.notes, [action.taskId]: action.note },
      };
      break;
    }

    case 'COMPLETE_PRACTICE_DAY': {
      if (state.practiceDaysCompleted.includes(action.day)) {
        next = { ...state };
      } else {
        const newStreak = updateStreak(state.streak);
        const today = getToday();
        next = {
          ...state,
          practiceDaysCompleted: [...state.practiceDaysCompleted, action.day],
          streak: newStreak,
          startDate: state.startDate || today,
          dailyActivity: {
            ...state.dailyActivity,
            [today]: (state.dailyActivity[today] || 0) + 1,
          },
        };
      }
      break;
    }

    case 'SET_CURRENT_DAY': {
      next = { ...state, currentDay: action.day };
      break;
    }

    case 'TOGGLE_BONUS_COURSE': {
      const isCompleted = state.completedBonusCourses.includes(action.courseId);
      next = {
        ...state,
        completedBonusCourses: isCompleted
          ? state.completedBonusCourses.filter(id => id !== action.courseId)
          : [...state.completedBonusCourses, action.courseId],
      };
      break;
    }

    case 'SET_THEME': {
      next = { ...state, theme: action.theme };
      break;
    }

    case 'RESET_PROGRESS': {
      const theme = state.theme;
      next = { ...loadProgress(), theme, completedTasks: [], taskStatuses: {}, notes: {}, currentDay: 1, streak: { current: 0, longest: 0, lastActivityDate: null }, dailyActivity: {}, unlockedAchievements: [], practiceDaysCompleted: [], completedBonusCourses: [], totalStudyMinutes: 0, startDate: null };
      break;
    }

    case 'IMPORT_PROGRESS': {
      next = action.progress;
      break;
    }

    default:
      return state;
  }

  // Check achievements after every action
  const newAchievements = checkNewAchievements(next);
  if (newAchievements.length > 0) {
    next = {
      ...next,
      unlockedAchievements: [...next.unlockedAchievements, ...newAchievements],
    };
  }

  return next;
}

// ── Context ──
interface AppContextType {
  state: UserProgress;
  dispatch: React.Dispatch<Action>;
  newAchievements: string[];
  clearNewAchievements: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => loadProgress());
  const [newAchievements, setNewAchievements] = React.useState<string[]>([]);
  const prevAchievementsRef = React.useRef<string[]>(state.unlockedAchievements);

  // Detect newly unlocked achievements for toast/animation
  useEffect(() => {
    const prev = prevAchievementsRef.current;
    const justUnlocked = state.unlockedAchievements.filter(a => !prev.includes(a));
    if (justUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...justUnlocked]);
    }
    prevAchievementsRef.current = state.unlockedAchievements;
  }, [state.unlockedAchievements]);

  // Persist state changes
  useEffect(() => {
    saveProgress(state);
  }, [state]);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, newAchievements, clearNewAchievements }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
