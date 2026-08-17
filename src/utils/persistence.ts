import { UserProgress } from '../types';

const STORAGE_KEY = 'dsa-tracker-progress';

export const defaultProgress: UserProgress = {
  completedTasks: [],
  taskStatuses: {},
  notes: {},
  currentDay: 1,
  streak: { current: 0, longest: 0, lastActivityDate: null },
  dailyActivity: {},
  unlockedAchievements: [],
  practiceDaysCompleted: [],
  completedBonusCourses: [],
  theme: 'dark',
  totalStudyMinutes: 0,
  startDate: null,
};

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save progress to localStorage:', err);
  }
}

export function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { ...defaultProgress };
    const parsed = JSON.parse(stored);
    // Merge with defaults for forward compatibility
    return { ...defaultProgress, ...parsed };
  } catch (err) {
    console.warn('Failed to load progress from localStorage:', err);
    return { ...defaultProgress };
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear progress:', err);
  }
}

export function exportProgress(): string {
  const progress = loadProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgress(json: string): UserProgress | null {
  try {
    const parsed = JSON.parse(json);
    const merged = { ...defaultProgress, ...parsed };
    saveProgress(merged);
    return merged;
  } catch (err) {
    console.warn('Failed to import progress:', err);
    return null;
  }
}
