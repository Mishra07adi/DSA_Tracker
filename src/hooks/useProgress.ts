import { useMemo } from 'react';
import { useApp } from '../stores/AppContext';
import { curriculum, getAllTasks, TOTAL_VIDEOS } from '../data/curriculum';
import { DifficultyStats, TopicStat, ContentDay } from '../types';

export function useProgress() {
  const { state } = useApp();

  return useMemo(() => {
    const allTasks = getAllTasks();
    const completedSet = new Set(state.completedTasks);

    // Overall
    const completedCount = state.completedTasks.length;
    const remainingCount = TOTAL_VIDEOS - completedCount;
    const overallPercentage = TOTAL_VIDEOS > 0 ? Math.round((completedCount / TOTAL_VIDEOS) * 100) : 0;

    // Difficulty breakdown
    const difficulty: DifficultyStats = {
      easy: { total: 0, completed: 0 },
      medium: { total: 0, completed: 0 },
      hard: { total: 0, completed: 0 },
    };
    for (const task of allTasks) {
      difficulty[task.difficulty].total++;
      if (completedSet.has(task.id)) {
        difficulty[task.difficulty].completed++;
      }
    }

    // Topic breakdown
    const topicMap: Record<string, { total: number; completed: number }> = {};
    for (const task of allTasks) {
      if (!topicMap[task.topic]) topicMap[task.topic] = { total: 0, completed: 0 };
      topicMap[task.topic].total++;
      if (completedSet.has(task.id)) topicMap[task.topic].completed++;
    }
    const topics: TopicStat[] = Object.entries(topicMap)
      .map(([topic, stats]) => ({ topic, ...stats }))
      .sort((a, b) => b.total - a.total);

    // Day progress
    const dayProgress = curriculum.map((day) => {
      if (day.type === 'practice') {
        return {
          day: day.day,
          type: 'practice' as const,
          total: 0,
          completed: 0,
          percentage: state.practiceDaysCompleted.includes(day.day) ? 100 : 0,
          isComplete: state.practiceDaysCompleted.includes(day.day),
        };
      }
      const cd = day as ContentDay;
      const total = cd.tasks.length;
      const completed = cd.tasks.filter(t => completedSet.has(t.id)).length;
      return {
        day: day.day,
        type: 'content' as const,
        total,
        completed,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        isComplete: completed === total,
      };
    });

    // Completed days count (content days fully done + practice days done)
    const completedDaysCount = dayProgress.filter(d => d.isComplete).length;

    // Revision queue
    const revisionTasks = allTasks.filter(t => state.taskStatuses[t.id] === 'needs-revision');

    // Total study time formatted
    const totalMinutes = state.totalStudyMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const studyTimeFormatted = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

    return {
      completedCount,
      remainingCount,
      totalVideos: TOTAL_VIDEOS,
      overallPercentage,
      difficulty,
      topics,
      dayProgress,
      completedDaysCount,
      revisionTasks,
      totalMinutes,
      studyTimeFormatted,
    };
  }, [state.completedTasks, state.taskStatuses, state.practiceDaysCompleted, state.totalStudyMinutes]);
}
