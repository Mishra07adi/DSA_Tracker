import { motion } from 'framer-motion';
import { BookOpen, Check, Clock, ExternalLink, Play } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { bonusCourses } from '../data/curriculum';
import { useMemo } from 'react';

export default function DeepDivePage() {
  const { state, dispatch } = useApp();

  const grouped = useMemo(() => {
    const map: Record<string, typeof bonusCourses> = {};
    bonusCourses.forEach(c => {
      if (!map[c.topic]) map[c.topic] = [];
      map[c.topic].push(c);
    });
    return Object.entries(map);
  }, []);

  const completedCount = state.completedBonusCourses.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Deep Dive Courses</h1>
        <p className="page-subtitle">
          {bonusCourses.length} bonus courses · {completedCount} completed · Long-form topic-wise courses for deeper learning
        </p>
      </div>

      {/* Progress */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            {completedCount} of {bonusCourses.length} courses complete
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
            {Math.round((completedCount / bonusCourses.length) * 100)}%
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 3,
            width: `${(completedCount / bonusCourses.length) * 100}%`,
            background: 'linear-gradient(90deg, #a78bfa, #6366f1)',
            transition: 'width 0.6s ease',
          }} />
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, marginBottom: 0 }}>
          Bonus courses do not affect your core 23-day completion percentage
        </p>
      </div>

      {/* Grouped Courses */}
      {grouped.map(([topic, courses]) => (
        <div key={topic} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontSize: 13, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: 'var(--text-tertiary)',
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <BookOpen size={14} /> {topic}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {courses.map(course => {
              const isComplete = state.completedBonusCourses.includes(course.id);
              return (
                <div key={course.id} className="glass-card" style={{
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 14,
                  borderLeft: `3px solid ${isComplete ? 'var(--color-success)' : 'transparent'}`,
                }}>
                  {/* Checkbox */}
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_BONUS_COURSE', courseId: course.id })}
                    style={{
                      width: 26, height: 26, borderRadius: 7, border: 'none',
                      background: isComplete ? 'var(--color-success)' : 'var(--bg-surface)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.15s ease',
                    }}
                    aria-label={isComplete ? 'Unmark course' : 'Mark complete'}
                  >
                    {isComplete && <Check size={14} color="white" strokeWidth={3} />}
                  </button>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 14, fontWeight: 600, color: 'var(--text-primary)',
                      opacity: isComplete ? 0.5 : 1,
                      textDecoration: isComplete ? 'line-through' : 'none',
                    }}>
                      {course.title}
                    </div>
                  </div>

                  <span style={{
                    fontSize: 11, color: 'var(--text-muted)', flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: 3,
                  }}>
                    <Clock size={11} /> {course.duration}
                  </span>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, textDecoration: 'none',
                    }}
                    aria-label="Watch course"
                  >
                    <Play size={13} style={{ color: '#ef4444' }} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
