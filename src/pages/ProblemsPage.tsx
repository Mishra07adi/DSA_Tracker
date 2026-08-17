import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Check, Clock, ExternalLink, Play,
  RotateCcw, X, ChevronDown
} from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { getAllTasks, curriculum } from '../data/curriculum';
import { Task, Difficulty, TaskStatus, ContentDay } from '../types';

const allTopics = [...new Set(getAllTasks().map(t => t.topic))].sort();
const allDays = curriculum.filter(d => d.type === 'content').map(d => d.day);

export default function ProblemsPage() {
  const { state, dispatch } = useApp();

  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dayFilter, setDayFilter] = useState<number | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const allTasks = getAllTasks();

  // Create a map of taskId to day number
  const taskDayMap = useMemo(() => {
    const map: Record<string, number> = {};
    curriculum.forEach(d => {
      if (d.type === 'content') {
        (d as ContentDay).tasks.forEach(t => { map[t.id] = d.day; });
      }
    });
    return map;
  }, []);

  const filtered = useMemo(() => {
    return allTasks.filter(task => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchLc = task.leetcode?.toString().includes(q);
        const matchTopic = task.topic.toLowerCase().includes(q);
        const matchDiff = task.difficulty.includes(q);
        if (!matchTitle && !matchLc && !matchTopic && !matchDiff) return false;
      }
      // Difficulty
      if (diffFilter !== 'all' && task.difficulty !== diffFilter) return false;
      // Topic
      if (topicFilter !== 'all' && task.topic !== topicFilter) return false;
      // Day
      if (dayFilter !== 'all' && taskDayMap[task.id] !== dayFilter) return false;
      // Status
      if (statusFilter !== 'all') {
        const isCompleted = state.completedTasks.includes(task.id);
        const taskStatus = state.taskStatuses[task.id] || 'not-started';
        if (statusFilter === 'completed' && !isCompleted) return false;
        if (statusFilter === 'not-started' && (isCompleted || taskStatus !== 'not-started')) return false;
        if (statusFilter === 'needs-revision' && taskStatus !== 'needs-revision') return false;
      }
      return true;
    });
  }, [allTasks, search, diffFilter, topicFilter, statusFilter, dayFilter, state.completedTasks, state.taskStatuses, taskDayMap]);

  const activeFilterCount = [diffFilter !== 'all', topicFilter !== 'all', statusFilter !== 'all', dayFilter !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setDiffFilter('all');
    setTopicFilter('all');
    setStatusFilter('all');
    setDayFilter('all');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">All Problems</h1>
        <p className="page-subtitle">{allTasks.length} total problems · {state.completedTasks.length} completed</p>
      </div>

      {/* Search + Filter Bar */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 200,
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 14px', borderRadius: 10,
          background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
        }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search problems, LeetCode numbers, topics..."
            style={{
              flex: 1, padding: '10px 0', border: 'none',
              background: 'transparent', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none', fontFamily: 'var(--font-sans)',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2 }}>
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 16px', borderRadius: 10,
            background: activeFilterCount > 0 ? 'var(--accent-primary-glow)' : 'var(--bg-surface)',
            border: `1px solid ${activeFilterCount > 0 ? 'rgba(99, 102, 241, 0.2)' : 'var(--border-default)'}`,
            color: activeFilterCount > 0 ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}
        >
          <Filter size={14} /> Filters
          {activeFilterCount > 0 && (
            <span style={{
              width: 18, height: 18, borderRadius: 9,
              background: 'var(--accent-primary)', color: 'white',
              fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="glass-card"
          style={{ padding: '16px 20px', marginBottom: 16 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {/* Difficulty */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Difficulty
              </label>
              <select
                value={diffFilter}
                onChange={e => setDiffFilter(e.target.value as any)}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)', fontSize: 12, outline: 'none',
                  fontFamily: 'var(--font-sans)', cursor: 'pointer',
                }}
              >
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            {/* Topic */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Topic
              </label>
              <select
                value={topicFilter}
                onChange={e => setTopicFilter(e.target.value)}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)', fontSize: 12, outline: 'none',
                  fontFamily: 'var(--font-sans)', cursor: 'pointer',
                }}
              >
                <option value="all">All Topics</option>
                {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Status */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)', fontSize: 12, outline: 'none',
                  fontFamily: 'var(--font-sans)', cursor: 'pointer',
                }}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
                <option value="needs-revision">Needs Revision</option>
              </select>
            </div>
            {/* Day */}
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Day
              </label>
              <select
                value={dayFilter}
                onChange={e => setDayFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: 8,
                  background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)', fontSize: 12, outline: 'none',
                  fontFamily: 'var(--font-sans)', cursor: 'pointer',
                }}
              >
                <option value="all">All Days</option>
                {allDays.map(d => <option key={d} value={d}>Day {d}</option>)}
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              style={{
                marginTop: 12, padding: '6px 14px', borderRadius: 8,
                border: 'none', background: 'var(--bg-surface)',
                color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              <X size={12} /> Clear Filters
            </button>
          )}
        </motion.div>
      )}

      {/* Results Count */}
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        Showing {filtered.length} of {allTasks.length} problems
      </div>

      {/* Problem List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map((task) => {
          const isDone = state.completedTasks.includes(task.id);
          const status = state.taskStatuses[task.id] || 'not-started';
          const dayNum = taskDayMap[task.id];
          const diffColors: Record<string, string> = {
            easy: 'var(--color-easy)', medium: 'var(--color-medium)', hard: 'var(--color-hard)',
          };

          return (
            <div
              key={task.id}
              className="glass-card"
              style={{
                padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 12,
                borderLeft: `3px solid ${isDone ? 'var(--color-success)' : status === 'needs-revision' ? 'var(--color-warning)' : 'transparent'}`,
              }}
            >
              {/* Checkbox */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_TASK', taskId: task.id, duration: task.duration })}
                style={{
                  width: 24, height: 24, borderRadius: 6, border: 'none',
                  background: isDone ? 'var(--color-success)' : 'var(--bg-surface)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s ease',
                }}
                aria-label={isDone ? 'Unmark complete' : 'Mark complete'}
              >
                {isDone && <Check size={14} color="white" strokeWidth={3} />}
              </button>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14, fontWeight: 600, color: 'var(--text-primary)',
                  opacity: isDone ? 0.5 : 1,
                  textDecoration: isDone ? 'line-through' : 'none',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {task.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                  {task.leetcode && (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>LC {task.leetcode}</span>
                  )}
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-surface)' }}>
                    Day {dayNum}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-surface)' }}>
                    {task.topic}
                  </span>
                </div>
              </div>

              {/* Difficulty + Duration */}
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '2px 8px',
                borderRadius: 20, textTransform: 'uppercase',
                background: `${diffColors[task.difficulty]}15`,
                color: diffColors[task.difficulty],
                border: `1px solid ${diffColors[task.difficulty]}30`,
                flexShrink: 0,
              }}>
                {task.difficulty}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Clock size={11} /> {task.duration}m
              </span>

              {/* Watch */}
              <a
                href={task.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, textDecoration: 'none',
                }}
                aria-label="Watch video"
              >
                <Play size={13} style={{ color: '#ef4444' }} />
              </a>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)',
        }}>
          <Search size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: 'var(--text-secondary)' }}>No results found</h3>
          <p style={{ fontSize: 13 }}>Try adjusting your search or filters</p>
        </div>
      )}
    </motion.div>
  );
}
