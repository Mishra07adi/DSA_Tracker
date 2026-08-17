import { describe, it, expect } from 'vitest';
import { curriculum, getAllTasks, bonusCourses, TOTAL_VIDEOS, getDayData, getTotalEstimatedMinutes } from '../data/curriculum';
import { ContentDay, PracticeDay } from '../types';

describe('Curriculum Data Validation', () => {
  it('should have exactly 23 days', () => {
    expect(curriculum.length).toBe(23);
  });

  it('should have exactly 96 total videos', () => {
    expect(TOTAL_VIDEOS).toBe(96);
    expect(getAllTasks().length).toBe(96);
  });

  it('should have 20 content days and 3 practice days', () => {
    const contentDays = curriculum.filter(d => d.type === 'content');
    const practiceDays = curriculum.filter(d => d.type === 'practice');
    expect(contentDays.length).toBe(20);
    expect(practiceDays.length).toBe(3);
  });

  it('practice days should be Days 7, 14, and 21', () => {
    const practiceDays = curriculum.filter(d => d.type === 'practice').map(d => d.day);
    expect(practiceDays).toEqual([7, 14, 21]);
  });

  it('Day 23 should have exactly 1 video', () => {
    const day23 = getDayData(23) as ContentDay;
    expect(day23.type).toBe('content');
    expect(day23.tasks.length).toBe(1);
    expect(day23.tasks[0].title).toBe('Find Median from Data Stream');
    expect(day23.tasks[0].leetcode).toBe(295);
    expect(day23.tasks[0].difficulty).toBe('hard');
  });

  it('content days (except Day 23) should each have 5 videos', () => {
    const contentDays = curriculum.filter(d => d.type === 'content' && d.day !== 23) as ContentDay[];
    contentDays.forEach(d => {
      expect(d.tasks.length).toBe(5);
    });
  });

  it('Day 1 should contain the correct problems', () => {
    const day1 = getDayData(1) as ContentDay;
    expect(day1.tasks[0].title).toBe('Majority Element');
    expect(day1.tasks[0].leetcode).toBe(169);
    expect(day1.tasks[1].title).toBe('Top 10 Coding Interview Rules');
    expect(day1.tasks[2].title).toBe('Path Sum');
    expect(day1.tasks[2].leetcode).toBe(112);
    expect(day1.tasks[3].title).toBe('Symmetric Tree');
    expect(day1.tasks[3].leetcode).toBe(101);
    expect(day1.tasks[4].title).toBe('Happy Number');
    expect(day1.tasks[4].leetcode).toBe(202);
  });

  it('every task should have a unique id', () => {
    const ids = getAllTasks().map(t => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('every task should have a valid difficulty', () => {
    getAllTasks().forEach(t => {
      expect(['easy', 'medium', 'hard']).toContain(t.difficulty);
    });
  });

  it('every task should have a positive duration', () => {
    getAllTasks().forEach(t => {
      expect(t.duration).toBeGreaterThan(0);
    });
  });

  it('every task should have a non-empty topic', () => {
    getAllTasks().forEach(t => {
      expect(t.topic.length).toBeGreaterThan(0);
    });
  });

  it('every task should have a YouTube search URL', () => {
    getAllTasks().forEach(t => {
      expect(t.youtubeUrl).toContain('youtube.com/results');
    });
  });

  it('difficulty progression should be easy → medium → hard', () => {
    // Days 1-5 should be easy
    for (let d = 1; d <= 5; d++) {
      const day = getDayData(d) as ContentDay;
      expect(day.difficulty).toBe('easy');
    }
    // Days 18-20, 22-23 should be hard
    for (const d of [18, 19, 20, 22, 23]) {
      const day = getDayData(d) as ContentDay;
      expect(day.difficulty).toBe('hard');
    }
  });

  it('practice days should have suggestions', () => {
    const practiceDays = curriculum.filter(d => d.type === 'practice') as PracticeDay[];
    practiceDays.forEach(d => {
      expect(d.suggestion.length).toBeGreaterThan(0);
    });
  });

  it('Day 21 practice suggestion should mention timing', () => {
    const day21 = getDayData(21) as PracticeDay;
    expect(day21.suggestion.toLowerCase()).toContain('time');
    expect(day21.suggestion).toContain('25 minutes');
  });

  it('should have exactly 22 bonus courses', () => {
    expect(bonusCourses.length).toBe(22);
  });

  it('bonus courses should cover expected topics', () => {
    const topics = new Set(bonusCourses.map(c => c.topic));
    expect(topics.has('Arrays')).toBe(true);
    expect(topics.has('Strings')).toBe(true);
    expect(topics.has('Trees')).toBe(true);
    expect(topics.has('Graphs')).toBe(true);
    expect(topics.has('Dynamic Programming')).toBe(true);
    expect(topics.has('Backtracking')).toBe(true);
    expect(topics.has('Blind 75')).toBe(true);
  });

  it('every bonus course should have a unique id', () => {
    const ids = bonusCourses.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('total estimated time should be reasonable', () => {
    const totalMinutes = getTotalEstimatedMinutes();
    expect(totalMinutes).toBeGreaterThan(600); // at least 10 hours
    expect(totalMinutes).toBeLessThan(2000); // less than ~33 hours
  });

  it('getDayData should return undefined for invalid day', () => {
    expect(getDayData(0)).toBeUndefined();
    expect(getDayData(24)).toBeUndefined();
    expect(getDayData(-1)).toBeUndefined();
  });
});
