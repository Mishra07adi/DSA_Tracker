import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, Flame, CheckCircle2, Clock, Trophy, ArrowRight,
  Zap, Star, BookOpen, Target
} from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { curriculum, getDayData, TOTAL_VIDEOS } from '../data/curriculum';
import { motivationalQuotes, achievements as achievementDefs } from '../constants';
import { ContentDay } from '../types';
import { useMemo } from 'react';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Dashboard() {
  const navigate = useNavigate();
  const { state } = useApp();
  const progress = useProgress();

  const quote = useMemo(() =>
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
    []
  );

  const currentDayData = getDayData(state.currentDay);
  const todayTasks = currentDayData?.type === 'content' ? (currentDayData as ContentDay).tasks : [];
  const todayCompleted = todayTasks.filter(t => state.completedTasks.includes(t.id)).length;
  const todayTotal = todayTasks.length;
  const todayMinutes = todayTasks.reduce((s, t) => s + t.duration, 0);
  const isPracticeDay = currentDayData?.type === 'practice';

  const recentAchievements = achievementDefs
    .filter(a => state.unlockedAchievements.includes(a.id))
    .slice(-3)
    .reverse();

  // Circular progress
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress.overallPercentage / 100) * circumference;

  return (
    <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Hero Section */}
      <motion.div variants={item} style={{
        padding: '36px 40px',
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.12)',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'rgba(99, 102, 241, 0.04)',
        }} />
        <div style={{
          position: 'absolute', right: 60, bottom: -60, width: 140, height: 140,
          borderRadius: '50%', background: 'rgba(6, 182, 212, 0.03)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, position: 'relative' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-secondary)', marginBottom: 8 }}>
              Your FAANG Journey
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)' }}>
              Day {state.currentDay} <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>of 23</span>
            </h1>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 10, fontStyle: 'italic', maxWidth: 400 }}>
              "{quote}"
            </p>
          </div>

          {/* Circular Progress */}
          <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
            <svg width="140" height="140" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke="url(#progress-gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {progress.overallPercentage}%
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Complete
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={item} className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          { icon: Play, label: 'Videos Done', value: `${progress.completedCount}`, sub: `of ${TOTAL_VIDEOS}`, color: '#6366f1' },
          { icon: Target, label: 'Remaining', value: `${progress.remainingCount}`, sub: 'videos left', color: '#06b6d4' },
          { icon: Flame, label: 'Current Streak', value: `${state.streak.current}`, sub: state.streak.current === 1 ? 'day' : 'days', color: '#fb923c' },
          { icon: Clock, label: 'Study Time', value: progress.studyTimeFormatted, sub: 'total', color: '#a78bfa' },
          { icon: CheckCircle2, label: 'Days Done', value: `${progress.completedDaysCount}`, sub: 'of 23', color: '#34d399' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: `${s.color}12`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={20} style={{ color: s.color }} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 500 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Today's Mission CTA */}
        <motion.div
          variants={item}
          className="glass-card"
          style={{ padding: '28px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
          onClick={() => navigate('/mission')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div style={{
            position: 'absolute', right: -30, bottom: -30, width: 120, height: 120,
            borderRadius: '50%',
            background: isPracticeDay ? 'rgba(167, 139, 250, 0.06)' : 'rgba(99, 102, 241, 0.06)',
          }} />
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: isPracticeDay ? 'var(--color-practice)' : 'var(--accent-secondary)',
            marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Zap size={12} />
            Today's Mission
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px', color: 'var(--text-primary)' }}>
            {isPracticeDay ? 'Practice & Review' : `Day ${state.currentDay}`}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
            {isPracticeDay
              ? 'Revise previous problems & strengthen weak areas'
              : `${todayTotal} challenges · ~${todayMinutes} min`
            }
          </p>

          {!isPracticeDay && todayTotal > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{
                height: 6, borderRadius: 3,
                background: 'var(--bg-surface)',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${(todayCompleted / todayTotal) * 100}%`,
                  borderRadius: 3,
                  background: todayCompleted === todayTotal ? 'var(--color-success)' : 'linear-gradient(90deg, #6366f1, #06b6d4)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6 }}>
                {todayCompleted} / {todayTotal} completed
              </div>
            </div>
          )}

          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 600, color: 'var(--accent-primary)',
          }}>
            {todayCompleted === todayTotal && todayTotal > 0 ? '✅ All Done!' : 'Start Mission'} <ArrowRight size={14} />
          </div>
        </motion.div>

        {/* Difficulty Breakdown */}
        <motion.div variants={item} className="glass-card" style={{ padding: '28px' }}>
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Star size={12} />
            Difficulty Progress
          </div>
          {(['easy', 'medium', 'hard'] as const).map(diff => {
            const stats = progress.difficulty[diff];
            const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            const colors = { easy: 'var(--color-easy)', medium: 'var(--color-medium)', hard: 'var(--color-hard)' };
            return (
              <div key={diff} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{
                    fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                    color: colors[diff], letterSpacing: '0.05em',
                  }}>{diff}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {stats.completed} / {stats.total}
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: `${pct}%`,
                    background: colors[diff],
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Recent Achievements */}
      {recentAchievements.length > 0 && (
        <motion.div variants={item} style={{ marginTop: 24 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: 'var(--text-tertiary)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Trophy size={12} /> Recent Achievements
            </div>
            <button
              onClick={() => navigate('/achievements')}
              style={{
                background: 'none', border: 'none', color: 'var(--accent-primary)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {recentAchievements.map(a => (
              <div key={a.id} className="glass-card" style={{
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{ fontSize: 24 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Streak Visualization */}
      <motion.div variants={item} className="glass-card" style={{ padding: '24px 28px', marginTop: 24 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Flame size={12} /> Weekly Activity
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            const count = state.dailyActivity[dateStr] || 0;
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const opacity = count === 0 ? 0.1 : Math.min(0.3 + count * 0.15, 1);
            return (
              <div key={i} style={{ textAlign: 'center', flex: 1, minWidth: 40 }}>
                <div style={{
                  width: '100%', aspectRatio: '1', borderRadius: 8, maxWidth: 44, margin: '0 auto 6px',
                  background: count > 0 ? `rgba(99, 102, 241, ${opacity})` : 'var(--bg-surface)',
                  border: `1px solid ${count > 0 ? `rgba(99, 102, 241, ${opacity * 0.5})` : 'var(--border-subtle)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: count > 0 ? '#c7d2fe' : 'var(--text-muted)',
                }}>
                  {count > 0 ? count : '—'}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{dayName}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
