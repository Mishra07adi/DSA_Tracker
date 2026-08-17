export type Difficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'needs-revision';
export type DayType = 'content' | 'practice';
export type Theme = 'dark' | 'light';

export interface Task {
  id: string;
  title: string;
  leetcode: number | null;
  difficulty: Difficulty;
  duration: number; // minutes
  topic: string;
  youtubeUrl: string;
}

export interface ContentDay {
  day: number;
  type: 'content';
  difficulty: Difficulty;
  videoCount: number;
  tasks: Task[];
}

export interface PracticeDay {
  day: number;
  type: 'practice';
  suggestion: string;
}

export type Day = ContentDay | PracticeDay;

export interface BonusCourse {
  id: string;
  title: string;
  topic: string;
  duration: string; // e.g. "2.1 hr"
  durationMinutes: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: UserProgress) => boolean;
}

export interface UserProgress {
  completedTasks: string[];
  taskStatuses: Record<string, TaskStatus>;
  notes: Record<string, string>;
  currentDay: number;
  streak: {
    current: number;
    longest: number;
    lastActivityDate: string | null;
  };
  dailyActivity: Record<string, number>; // date string → count
  unlockedAchievements: string[];
  practiceDaysCompleted: number[];
  completedBonusCourses: string[];
  theme: Theme;
  totalStudyMinutes: number;
  startDate: string | null;
}

export interface DailyStats {
  total: number;
  completed: number;
  percentage: number;
}

export interface DifficultyStats {
  easy: { total: number; completed: number };
  medium: { total: number; completed: number };
  hard: { total: number; completed: number };
}

export interface TopicStat {
  topic: string;
  total: number;
  completed: number;
}
