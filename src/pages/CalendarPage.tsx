import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Lock, RotateCcw, Play, ChevronDown, ChevronUp, Clock, Zap } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { curriculum } from '../data/curriculum';
import { ContentDay } from '../types';

export default function CalendarPage() {
  const { state, dispatch } = useApp();
  const progress = useProgress();
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">23-Day Calendar</h1>
        <p className="page-subtitle">Your complete preparation timeline</p>
      </div>

      {/* Overall progress */}
      <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            {progress.completedDaysCount} of 23 days complete
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
            {progress.overallPercentage}%
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 3,
            width: `${progress.overallPercentage}%`,
            background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Day Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {curriculum.map((day) => {
          const dayProg = progress.dayProgress.find(d => d.day === day.day)!;
          const isCurrent = day.day === state.currentDay;
          const isComplete = dayProg.isComplete;
          const isPractice = day.type === 'practice';
          const isExpanded = expandedDay === day.day;
          const contentDay = day.type === 'content' ? (day as ContentDay) : null;

          const diffColors: Record<string, string> = {
            easy: 'var(--color-easy)',
            medium: 'var(--color-medium)',
            hard: 'var(--color-hard)',
          };

          return (
            <motion.div
              key={day.day}
              layout
              className="glass-card"
              style={{
                overflow: 'hidden',
                border: isCurrent ? '1px solid rgba(99, 102, 241, 0.3)' : undefined,
                boxShadow: isCurrent ? '0 0 20px rgba(99, 102, 241, 0.1)' : undefined,
              }}
            >
              <div
                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                style={{
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {/* Status Icon */}
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  background: isComplete
                    ? 'rgba(52, 211, 153, 0.12)'
                    : isPractice
                    ? 'var(--color-practice-bg)'
                    : isCurrent
                    ? 'var(--accent-primary-glow)'
                    : 'var(--bg-surface)',
                }}>
                  {isComplete ? (
                    <Check size={18} style={{ color: 'var(--color-success)' }} />
                  ) : isPractice ? (
                    <RotateCcw size={16} style={{ color: 'var(--color-practice)' }} />
                  ) : isCurrent ? (
                    <Play size={16} style={{ color: 'var(--accent-primary)' }} />
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{day.day}</span>
                  )}
                </div>

                {/* Day Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Day {day.day}
                    </span>
                    {isPractice && (
                      <span className="badge-practice" style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 8px',
                        borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
                      }}>Practice</span>
                    )}
                    {contentDay && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 8px',
                        borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
                        background: `${diffColors[contentDay.difficulty]}15`,
                        color: diffColors[contentDay.difficulty],
                        border: `1px solid ${diffColors[contentDay.difficulty]}30`,
                      }}>
                        {contentDay.difficulty}
                      </span>
                    )}
                    {isCurrent && (
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 8px',
                        borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
                        background: 'var(--accent-primary-glow)',
                        color: 'var(--accent-primary)',
                        border: '1px solid rgba(99, 102, 241, 0.2)',
                      }}>
                        Current
                      </span>
                    )}
                  </div>
                  {contentDay && (
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                      {contentDay.videoCount} videos · ~{contentDay.tasks.reduce((s, t) => s + t.duration, 0)} min
                    </span>
                  )}
                </div>

                {/* Progress */}
                {contentDay && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <div style={{ width: 80 }}>
                      <div style={{ height: 4, borderRadius: 2, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 2,
                          width: `${dayProg.percentage}%`,
                          background: isComplete ? 'var(--color-success)' : diffColors[contentDay.difficulty] || 'var(--accent-primary)',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', minWidth: 30 }}>
                      {dayProg.completed}/{dayProg.total}
                    </span>
                  </div>
                )}

                {isExpanded ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 20px 16px',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: 16,
                    }}>
                      {contentDay ? (
                        <>
                          {contentDay.tasks.map((task, i) => {
                            const isDone = state.completedTasks.includes(task.id);
                            return (
                              <div key={task.id} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '8px 0',
                                borderBottom: i < contentDay.tasks.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                              }}>
                                <div style={{
                                  width: 20, height: 20, borderRadius: 6,
                                  background: isDone ? 'var(--color-success)' : 'var(--bg-surface)',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  flexShrink: 0,
                                }}>
                                  {isDone && <Check size={12} color="white" strokeWidth={3} />}
                                </div>
                                <span style={{
                                  fontSize: 13, color: 'var(--text-primary)', flex: 1,
                                  opacity: isDone ? 0.5 : 1,
                                  textDecoration: isDone ? 'line-through' : 'none',
                                }}>
                                  {task.title} {task.leetcode ? `(LC ${task.leetcode})` : ''}
                                </span>
                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{task.duration}m</span>
                              </div>
                            );
                          })}
                          <button
                            onClick={() => {
                              dispatch({ type: 'SET_CURRENT_DAY', day: day.day });
                              navigate('/mission');
                            }}
                            style={{
                              marginTop: 12, padding: '8px 16px', borderRadius: 8,
                              border: 'none', background: 'var(--accent-primary-glow)',
                              color: 'var(--accent-primary)', fontSize: 12, fontWeight: 600,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                            }}
                          >
                            <Zap size={12} /> Go to Day {day.day}
                          </button>
                        </>
                      ) : (
                        <div style={{ padding: '8px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                          Practice & Review Day — Revise previous problems and strengthen your foundations.
                          <button
                            onClick={() => {
                              dispatch({ type: 'SET_CURRENT_DAY', day: day.day });
                              navigate('/mission');
                            }}
                            style={{
                              marginTop: 12, display: 'block', padding: '8px 16px', borderRadius: 8,
                              border: 'none', background: 'var(--color-practice-bg)',
                              color: 'var(--color-practice)', fontSize: 12, fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Go to Practice Day
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
