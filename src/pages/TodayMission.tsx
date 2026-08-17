import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Check, ChevronLeft, ChevronRight, Clock, Zap,
  MessageSquare, ExternalLink, RotateCcw, CheckCircle2,
  BookOpen, Target, Pencil, X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { getDayData, curriculum } from '../data/curriculum';
import { ContentDay, PracticeDay, Task, TaskStatus } from '../types';

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const cls = `badge-${difficulty}`;
  return (
    <span className={cls} style={{
      fontSize: 10, fontWeight: 700, padding: '3px 10px',
      borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
    }}>
      {difficulty}
    </span>
  );
}

function TaskCard({ task, isCompleted, status, note, onToggle, onStatusChange, onNoteChange }: {
  task: Task;
  isCompleted: boolean;
  status: TaskStatus;
  note: string;
  onToggle: () => void;
  onStatusChange: (s: TaskStatus) => void;
  onNoteChange: (n: string) => void;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState(note);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `3px solid ${isCompleted ? 'var(--color-success)' : status === 'needs-revision' ? 'var(--color-warning)' : 'transparent'}`,
      }}
    >
      {isCompleted && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 60, height: 60,
          background: 'radial-gradient(circle at top right, rgba(52, 211, 153, 0.08), transparent)',
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Checkbox */}
        <button
          onClick={onToggle}
          aria-label={isCompleted ? 'Unmark as complete' : 'Mark as complete'}
          style={{
            width: 28, height: 28, borderRadius: 8, border: 'none',
            background: isCompleted ? 'var(--color-success)' : 'var(--bg-surface)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease', flexShrink: 0, marginTop: 2,
            boxShadow: isCompleted ? '0 2px 8px rgba(52, 211, 153, 0.25)' : 'none',
          }}
        >
          {isCompleted && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500 }}>
              <Check size={16} color="white" strokeWidth={3} />
            </motion.div>
          )}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
            <h3 style={{
              fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text-primary)',
              textDecoration: isCompleted ? 'line-through' : 'none',
              opacity: isCompleted ? 0.6 : 1,
            }}>
              {task.title}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {task.leetcode && (
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>
                LC {task.leetcode}
              </span>
            )}
            <DifficultyBadge difficulty={task.difficulty} />
            <span style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
              <Clock size={11} /> {task.duration} min
            </span>
            <span style={{
              fontSize: 10, color: 'var(--text-muted)',
              padding: '2px 8px', borderRadius: 6,
              background: 'var(--bg-surface)',
            }}>
              {task.topic}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <a
              href={task.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444', fontSize: 12, fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.15s ease',
              }}
            >
              <Play size={12} /> Watch Video
            </a>

            {!isCompleted && (
              <button
                onClick={onToggle}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)',
                  color: '#34d399', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
              >
                <CheckCircle2 size={12} /> Mark Complete
              </button>
            )}

            <button
              onClick={() => onStatusChange(status === 'needs-revision' ? 'not-started' : 'needs-revision')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: status === 'needs-revision' ? 'var(--color-warning-bg, rgba(251, 191, 36, 0.1))' : 'var(--bg-surface)',
                border: `1px solid ${status === 'needs-revision' ? 'rgba(251, 191, 36, 0.2)' : 'var(--border-subtle)'}`,
                color: status === 'needs-revision' ? 'var(--color-warning)' : 'var(--text-tertiary)',
                fontSize: 12, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
            >
              <RotateCcw size={12} /> {status === 'needs-revision' ? 'In Revision' : 'Needs Revision'}
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                background: note ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface)',
                border: `1px solid ${note ? 'rgba(99, 102, 241, 0.15)' : 'var(--border-subtle)'}`,
                color: note ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                fontSize: 12, fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}
            >
              <Pencil size={12} /> Notes
            </button>
          </div>

          {/* Notes Section */}
          <AnimatePresence>
            {showNotes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', marginTop: 14 }}
              >
                <textarea
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  onBlur={() => onNoteChange(noteText)}
                  placeholder="Add your notes... (patterns, key insights, edge cases)"
                  style={{
                    width: '100%', minHeight: 80, padding: '12px 14px',
                    borderRadius: 10, border: '1px solid var(--border-default)',
                    background: 'var(--bg-surface)', color: 'var(--text-primary)',
                    fontSize: 13, fontFamily: 'var(--font-sans)',
                    resize: 'vertical', outline: 'none',
                    transition: 'border-color 0.15s ease',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-primary)'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function PracticeDayView({ day }: { day: PracticeDay }) {
  const { state, dispatch } = useApp();
  const isComplete = state.practiceDaysCompleted.includes(day.day);

  const checklist = day.day === 7
    ? [
        'Re-solve any 3 problems from the last 6 days without looking at the video',
        'Focus on problems you found tricky',
        'Explain your approach out loud',
        'Identify patterns across problems',
      ]
    : day.day === 14
    ? [
        'Write down the pattern/technique used in each problem you struggled with',
        'Re-attempt problems from Days 8–13',
        'Explain your approach out loud',
        'Practice without watching solutions',
      ]
    : [
        'Time yourself: pick 2 medium problems and solve each in under 25 minutes',
        'Re-attempt the hardest problems from Days 15–20',
        'Identify remaining weak areas',
        'Practice explaining your solutions',
      ];

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_PRACTICE_DAY', day: day.day });
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
      style={{
        padding: '36px 40px', textAlign: 'center',
        border: '1px solid var(--color-practice-border)',
        background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.06), rgba(99, 102, 241, 0.03))',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
      <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px', color: 'var(--color-practice)' }}>
        Practice & Review Day
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
        No new videos today. Today is about proving what you've learned and strengthening your foundations.
      </p>

      <div style={{ textAlign: 'left', maxWidth: 500, margin: '0 auto 28px' }}>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 14,
        }}>
          Recommended Mission
        </div>
        {checklist.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            padding: '10px 0', borderBottom: i < checklist.length - 1 ? '1px solid var(--border-subtle)' : 'none',
          }}>
            <Target size={14} style={{ color: 'var(--color-practice)', marginTop: 2, flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{item}</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13, color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: 20 }}>
        "{day.suggestion}"
      </div>

      {isComplete ? (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px 24px', borderRadius: 12,
          background: 'rgba(52, 211, 153, 0.1)', color: 'var(--color-success)',
          fontSize: 14, fontWeight: 700,
        }}>
          <CheckCircle2 size={18} /> Practice Day Complete!
        </div>
      ) : (
        <button
          onClick={handleComplete}
          style={{
            padding: '12px 32px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #a78bfa, #6366f1)',
            color: 'white', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(167, 139, 250, 0.3)',
          }}
        >
          ✓ Mark Practice Day Complete
        </button>
      )}
    </motion.div>
  );
}

export default function TodayMission() {
  const { state, dispatch } = useApp();
  const progress = useProgress();

  const dayData = getDayData(state.currentDay);
  const [dayCompleted, setDayCompleted] = useState(false);

  const canGoBack = state.currentDay > 1;
  const canGoForward = state.currentDay < 23;

  const goToDay = (day: number) => {
    dispatch({ type: 'SET_CURRENT_DAY', day });
  };

  // Check if day just got completed for confetti
  useEffect(() => {
    if (!dayData || dayData.type !== 'content') return;
    const cd = dayData as ContentDay;
    const allDone = cd.tasks.every(t => state.completedTasks.includes(t.id));
    if (allDone && cd.tasks.length > 0 && !dayCompleted) {
      setDayCompleted(true);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } else if (!allDone) {
      setDayCompleted(false);
    }
  }, [state.completedTasks, dayData, dayCompleted]);

  if (!dayData) return <div>Day not found</div>;

  const isContent = dayData.type === 'content';
  const contentDay = isContent ? (dayData as ContentDay) : null;
  const completedCount = contentDay ? contentDay.tasks.filter(t => state.completedTasks.includes(t.id)).length : 0;
  const totalCount = contentDay ? contentDay.tasks.length : 0;
  const totalMinutes = contentDay ? contentDay.tasks.reduce((s, t) => s + t.duration, 0) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: 800, margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div className="page-title" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            Day {state.currentDay}
            {isContent && <DifficultyBadge difficulty={contentDay!.difficulty} />}
            {!isContent && (
              <span className="badge-practice" style={{
                fontSize: 10, fontWeight: 700, padding: '3px 10px',
                borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                Practice
              </span>
            )}
          </div>
          {isContent && (
            <p className="page-subtitle">
              {totalCount} challenges · ~{totalMinutes} minutes
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            disabled={!canGoBack}
            onClick={() => goToDay(state.currentDay - 1)}
            style={{
              width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)', cursor: canGoBack ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: canGoBack ? 'var(--text-secondary)' : 'var(--text-muted)',
              opacity: canGoBack ? 1 : 0.4,
            }}
            aria-label="Previous day"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            disabled={!canGoForward}
            onClick={() => goToDay(state.currentDay + 1)}
            style={{
              width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border-default)',
              background: 'var(--bg-surface)', cursor: canGoForward ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: canGoForward ? 'var(--text-secondary)' : 'var(--text-muted)',
              opacity: canGoForward ? 1 : 0.4,
            }}
            aria-label="Next day"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {isContent && totalCount > 0 && (
        <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {dayCompleted ? '🎉 Day Complete!' : `${completedCount} of ${totalCount} completed`}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: dayCompleted ? 'var(--color-success)' : 'var(--accent-primary)' }}>
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-surface)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                height: '100%', borderRadius: 4,
                background: dayCompleted
                  ? 'linear-gradient(90deg, #34d399, #2dd4bf)'
                  : 'linear-gradient(90deg, #6366f1, #06b6d4)',
              }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      {isContent && contentDay ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {contentDay.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isCompleted={state.completedTasks.includes(task.id)}
              status={state.taskStatuses[task.id] || 'not-started'}
              note={state.notes[task.id] || ''}
              onToggle={() => dispatch({ type: 'TOGGLE_TASK', taskId: task.id, duration: task.duration })}
              onStatusChange={(s) => dispatch({ type: 'SET_TASK_STATUS', taskId: task.id, status: s })}
              onNoteChange={(n) => dispatch({ type: 'SET_NOTE', taskId: task.id, note: n })}
            />
          ))}
        </div>
      ) : (
        <PracticeDayView day={dayData as PracticeDay} />
      )}

      {/* Auto-advance hint */}
      {dayCompleted && state.currentDay < 23 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginTop: 24 }}
        >
          <button
            onClick={() => goToDay(state.currentDay + 1)}
            style={{
              padding: '12px 28px', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              color: 'white', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
            }}
          >
            Continue to Day {state.currentDay + 1} →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
