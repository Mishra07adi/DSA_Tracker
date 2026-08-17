import { Achievement, UserProgress } from '../types';
import { getAllTasks, TOTAL_VIDEOS } from '../data/curriculum';

export const achievements: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first video',
    icon: '👣',
    condition: (s: UserProgress) => s.completedTasks.length >= 1,
  },
  {
    id: 'getting-warm',
    title: 'Getting Warm',
    description: 'Complete 5 videos',
    icon: '🌡️',
    condition: (s: UserProgress) => s.completedTasks.length >= 5,
  },
  {
    id: 'getting-serious',
    title: 'Getting Serious',
    description: 'Complete 10 videos',
    icon: '💪',
    condition: (s: UserProgress) => s.completedTasks.length >= 10,
  },
  {
    id: 'quarter-done',
    title: 'Quarter Done',
    description: 'Complete 25% of all videos',
    icon: '🎯',
    condition: (s: UserProgress) => s.completedTasks.length >= Math.ceil(TOTAL_VIDEOS * 0.25),
  },
  {
    id: 'halfway-there',
    title: 'Halfway There',
    description: 'Reach 50% completion',
    icon: '🏔️',
    condition: (s: UserProgress) => s.completedTasks.length >= Math.ceil(TOTAL_VIDEOS * 0.5),
  },
  {
    id: 'three-quarters',
    title: 'Almost There',
    description: 'Reach 75% completion',
    icon: '🔥',
    condition: (s: UserProgress) => s.completedTasks.length >= Math.ceil(TOTAL_VIDEOS * 0.75),
  },
  {
    id: 'streak-3',
    title: 'On a Roll',
    description: 'Maintain a 3-day streak',
    icon: '⚡',
    condition: (s: UserProgress) => s.streak.current >= 3 || s.streak.longest >= 3,
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🗓️',
    condition: (s: UserProgress) => s.streak.current >= 7 || s.streak.longest >= 7,
  },
  {
    id: 'two-weeks',
    title: 'Two Weeks Strong',
    description: 'Maintain a 14-day streak',
    icon: '💎',
    condition: (s: UserProgress) => s.streak.current >= 14 || s.streak.longest >= 14,
  },
  {
    id: 'easy-master',
    title: 'Easy Master',
    description: 'Complete all Easy problems',
    icon: '🟢',
    condition: (s: UserProgress) => {
      const easyTasks = getAllTasks().filter(t => t.difficulty === 'easy');
      return easyTasks.every(t => s.completedTasks.includes(t.id));
    },
  },
  {
    id: 'medium-master',
    title: 'Medium Master',
    description: 'Complete all Medium problems',
    icon: '🟡',
    condition: (s: UserProgress) => {
      const medTasks = getAllTasks().filter(t => t.difficulty === 'medium');
      return medTasks.every(t => s.completedTasks.includes(t.id));
    },
  },
  {
    id: 'hard-mode',
    title: 'Hard Mode',
    description: 'Complete your first Hard problem',
    icon: '🔴',
    condition: (s: UserProgress) => {
      const hardIds = getAllTasks().filter(t => t.difficulty === 'hard').map(t => t.id);
      return hardIds.some(id => s.completedTasks.includes(id));
    },
  },
  {
    id: 'hard-master',
    title: 'Hard Master',
    description: 'Complete all Hard problems',
    icon: '👑',
    condition: (s: UserProgress) => {
      const hardTasks = getAllTasks().filter(t => t.difficulty === 'hard');
      return hardTasks.every(t => s.completedTasks.includes(t.id));
    },
  },
  {
    id: 'practice-champ',
    title: 'Practice Champ',
    description: 'Complete all 3 practice days',
    icon: '🔄',
    condition: (s: UserProgress) => s.practiceDaysCompleted.length >= 3,
  },
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Add notes to 10 different problems',
    icon: '📝',
    condition: (s: UserProgress) => Object.keys(s.notes).filter(k => s.notes[k]?.trim()).length >= 10,
  },
  {
    id: 'final-boss',
    title: 'Final Boss',
    description: 'Complete Day 23',
    icon: '🐉',
    condition: (s: UserProgress) => s.completedTasks.includes('d23t1'),
  },
  {
    id: 'faang-ready',
    title: 'FAANG Ready',
    description: 'Complete the entire 23-day tracker',
    icon: '🚀',
    condition: (s: UserProgress) => s.completedTasks.length >= TOTAL_VIDEOS,
  },
];

export const motivationalQuotes = [
  "Consistency beats intensity.",
  "One problem closer to your dream job.",
  "You don't need motivation. You need momentum.",
  "Future you will thank you for today.",
  "Keep going. The hard problems are coming.",
  "Small progress is still progress.",
  "You're building interview muscle.",
  "Every expert was once a beginner.",
  "The only bad workout is the one you didn't do.",
  "You're not just solving problems. You're building patterns.",
  "Discomfort is growth in disguise.",
  "DSA is a skill, not a talent. Keep practicing.",
  "Your future FAANG teammates are studying right now too.",
  "23 days. One habit at a time.",
  "The compound effect of daily practice is unstoppable.",
  "Trust the process. Ship the progress.",
  "Don't count the days. Make the days count.",
  "You're closer than you were yesterday.",
];
