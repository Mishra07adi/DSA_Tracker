import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveProgress, loadProgress, clearProgress, exportProgress, importProgress, defaultProgress } from '../utils/persistence';
import { UserProgress } from '../types';

describe('Persistence Layer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default progress when no data exists', () => {
    const progress = loadProgress();
    expect(progress.completedTasks).toEqual([]);
    expect(progress.currentDay).toBe(1);
    expect(progress.streak.current).toBe(0);
    expect(progress.theme).toBe('dark');
  });

  it('should save and load progress correctly', () => {
    const progress: UserProgress = {
      ...defaultProgress,
      completedTasks: ['d1t1', 'd1t2'],
      currentDay: 3,
      streak: { current: 2, longest: 5, lastActivityDate: '2024-01-15' },
    };
    saveProgress(progress);
    const loaded = loadProgress();
    expect(loaded.completedTasks).toEqual(['d1t1', 'd1t2']);
    expect(loaded.currentDay).toBe(3);
    expect(loaded.streak.current).toBe(2);
    expect(loaded.streak.longest).toBe(5);
  });

  it('should clear progress', () => {
    const progress: UserProgress = { ...defaultProgress, completedTasks: ['d1t1'] };
    saveProgress(progress);
    clearProgress();
    const loaded = loadProgress();
    expect(loaded.completedTasks).toEqual([]);
  });

  it('should export progress as JSON string', () => {
    const progress: UserProgress = { ...defaultProgress, currentDay: 5 };
    saveProgress(progress);
    const exported = exportProgress();
    const parsed = JSON.parse(exported);
    expect(parsed.currentDay).toBe(5);
  });

  it('should import valid progress', () => {
    const data: UserProgress = { ...defaultProgress, completedTasks: ['d1t1', 'd1t2', 'd1t3'], currentDay: 2 };
    const json = JSON.stringify(data);
    const result = importProgress(json);
    expect(result).not.toBeNull();
    expect(result!.completedTasks).toEqual(['d1t1', 'd1t2', 'd1t3']);
    expect(result!.currentDay).toBe(2);
  });

  it('should return null for invalid JSON import', () => {
    const result = importProgress('not-valid-json');
    expect(result).toBeNull();
  });

  it('should merge with defaults for forward compatibility', () => {
    // Simulate old data without new fields
    localStorage.setItem('dsa-tracker-progress', JSON.stringify({ completedTasks: ['d1t1'] }));
    const loaded = loadProgress();
    expect(loaded.completedTasks).toEqual(['d1t1']);
    expect(loaded.theme).toBe('dark');
    expect(loaded.totalStudyMinutes).toBe(0);
  });

  it('should handle localStorage errors gracefully', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage full'); });
    const loaded = loadProgress();
    expect(loaded).toEqual(defaultProgress);
    spy.mockRestore();
  });
});
