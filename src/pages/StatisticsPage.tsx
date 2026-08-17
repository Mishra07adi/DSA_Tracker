import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Flame, Target, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { TOTAL_VIDEOS } from '../data/curriculum';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

export default function StatisticsPage() {
  const { state } = useApp();
  const progress = useProgress();

  // Heatmap data (last 5 weeks)
  const heatmapData = useMemo(() => {
    const weeks: { date: string; count: number; dayName: string }[][] = [];
    const today = new Date();
    // Start from Sunday of 5 weeks ago
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() - 28);

    for (let w = 0; w < 5; w++) {
      const week: { date: string; count: number; dayName: string }[] = [];
      for (let d = 0; d < 7; d++) {
        const dt = new Date(start);
        dt.setDate(dt.getDate() + w * 7 + d);
        const dateStr = dt.toISOString().split('T')[0];
        week.push({
          date: dateStr,
          count: state.dailyActivity[dateStr] || 0,
          dayName: dt.toLocaleDateString('en-US', { weekday: 'short' }),
        });
      }
      weeks.push(week);
    }
    return weeks;
  }, [state.dailyActivity]);

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Statistics</h1>
        <p className="page-subtitle">Your complete preparation analytics</p>
      </div>

      {/* Overview Stats */}
      <motion.div variants={item} className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          { icon: Target, label: 'Total Videos', value: TOTAL_VIDEOS, color: '#6366f1' },
          { icon: CheckCircle2, label: 'Completed', value: progress.completedCount, color: '#34d399' },
          { icon: TrendingUp, label: 'Remaining', value: progress.remainingCount, color: '#06b6d4' },
          { icon: BarChart3, label: 'Completion', value: `${progress.overallPercentage}%`, color: '#a78bfa' },
          { icon: Flame, label: 'Current Streak', value: `${state.streak.current}d`, color: '#fb923c' },
          { icon: Flame, label: 'Longest Streak', value: `${state.streak.longest}d`, color: '#f59e0b' },
          { icon: Clock, label: 'Study Time', value: progress.studyTimeFormatted, color: '#818cf8' },
          { icon: CheckCircle2, label: 'Days Done', value: `${progress.completedDaysCount}/23`, color: '#2dd4bf' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '18px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `${s.color}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 10,
            }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Difficulty Breakdown */}
      <motion.div variants={item} className="glass-card" style={{ padding: '24px 28px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
          Difficulty Breakdown
        </h2>
        {(['easy', 'medium', 'hard'] as const).map(diff => {
          const stats = progress.difficulty[diff];
          const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const colors = { easy: 'var(--color-easy)', medium: 'var(--color-medium)', hard: 'var(--color-hard)' };
          return (
            <div key={diff} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: colors[diff], letterSpacing: '0.04em' }}>{diff}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{stats.completed} / {stats.total}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors[diff] }}>{pct}%</span>
              </div>
              <div style={{ height: 10, borderRadius: 5, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', borderRadius: 5, background: colors[diff] }}
                />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Topic Progress */}
      <motion.div variants={item} className="glass-card" style={{ padding: '24px 28px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
          Topic Progress
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {progress.topics.map(t => {
            const pct = t.total > 0 ? Math.round((t.completed / t.total) * 100) : 0;
            return (
              <div key={t.topic}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.topic}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.completed} / {t.total}</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #6366f1, #818cf8)',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Activity Heatmap */}
      <motion.div variants={item} className="glass-card" style={{ padding: '24px 28px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px', color: 'var(--text-primary)' }}>
          Daily Activity
        </h2>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginRight: 4 }}>
            {dayLabels.map((d, i) => (
              <div key={i} style={{
                height: 18, display: 'flex', alignItems: 'center',
                fontSize: 9, color: 'var(--text-muted)', fontWeight: 500, width: 24,
              }}>
                {i % 2 === 1 ? d : ''}
              </div>
            ))}
          </div>
          {heatmapData.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {week.map((day, di) => {
                const today = new Date().toISOString().split('T')[0];
                const isFuture = day.date > today;
                const opacity = day.count === 0 ? 0.06 : Math.min(0.2 + day.count * 0.15, 1);
                return (
                  <div
                    key={di}
                    title={`${day.date}: ${day.count} activities`}
                    style={{
                      height: 18, borderRadius: 3,
                      background: isFuture ? 'transparent' : day.count > 0 ? `rgba(99, 102, 241, ${opacity})` : 'var(--bg-surface)',
                      border: isFuture ? '1px dashed var(--border-subtle)' : `1px solid ${day.count > 0 ? `rgba(99, 102, 241, ${opacity * 0.3})` : 'var(--border-subtle)'}`,
                      transition: 'all 0.15s ease',
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, justifyContent: 'flex-end' }}>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Less</span>
          {[0.06, 0.2, 0.4, 0.6, 0.9].map((op, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: 3,
              background: i === 0 ? 'var(--bg-surface)' : `rgba(99, 102, 241, ${op})`,
              border: `1px solid ${i === 0 ? 'var(--border-subtle)' : `rgba(99, 102, 241, ${op * 0.3})`}`,
            }} />
          ))}
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>More</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
