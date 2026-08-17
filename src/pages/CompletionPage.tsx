import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Trophy, RotateCcw, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { TOTAL_VIDEOS } from '../data/curriculum';

export default function CompletionPage() {
  const navigate = useNavigate();
  const { state } = useApp();
  const progress = useProgress();

  useEffect(() => {
    // Epic confetti
    const duration = 4000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366f1', '#06b6d4', '#34d399', '#fbbf24', '#f87171'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366f1', '#06b6d4', '#34d399', '#fbbf24', '#f87171'],
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: 700, margin: '0 auto',
        textAlign: 'center', padding: '40px 20px',
      }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🎉</div>

        <h1 style={{
          fontSize: 42, fontWeight: 900, margin: 0,
          background: 'linear-gradient(135deg, #6366f1, #06b6d4, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
        }}>
          YOU MADE IT!
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 20 }}
        >
          <p style={{ fontSize: 20, color: 'var(--text-secondary)', fontWeight: 500, margin: '0 0 8px' }}>
            23 Days Complete · {TOTAL_VIDEOS} Videos Mastered
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-tertiary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            You didn't just study DSA. You built consistency. You are now ready to take on the next challenge.
          </p>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
          marginTop: 40, marginBottom: 40,
        }}
      >
        {[
          { label: 'Videos Completed', value: progress.completedCount, icon: '📹' },
          { label: 'Study Time', value: progress.studyTimeFormatted, icon: '⏱️' },
          { label: 'Longest Streak', value: `${state.streak.longest} days`, icon: '🔥' },
          { label: 'Easy Solved', value: `${progress.difficulty.easy.completed}/${progress.difficulty.easy.total}`, icon: '🟢' },
          { label: 'Medium Solved', value: `${progress.difficulty.medium.completed}/${progress.difficulty.medium.total}`, icon: '🟡' },
          { label: 'Hard Solved', value: `${progress.difficulty.hard.completed}/${progress.difficulty.hard.total}`, icon: '🔴' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Achievement Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        className="glass-card"
        style={{
          padding: '24px', maxWidth: 320, margin: '0 auto 40px',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(245, 158, 11, 0.03))',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>🚀</div>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbf24', marginBottom: 4 }}>
          Achievement Unlocked
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>FAANG Ready</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>
          Completed the entire 23-day tracker
        </div>
      </motion.div>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          fontSize: 18, fontStyle: 'italic', color: 'var(--text-secondary)',
          maxWidth: 450, margin: '0 auto 40px', lineHeight: 1.6,
        }}
      >
        "Consistency beats intensity. 23 days, 96 videos, one habit at a time. Now go get that offer."
      </motion.p>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <button
          onClick={() => navigate('/revision')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 12, border: 'none',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            color: 'white', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
          }}
        >
          <RotateCcw size={18} /> Start Revision Mode
        </button>
        <button
          onClick={() => navigate('/statistics')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 28px', borderRadius: 12,
            border: '1px solid var(--border-default)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)', fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <BarChart3 size={18} /> View Statistics
        </button>
      </motion.div>

      {/* Go Get That Offer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ marginTop: 60, fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em' }}
      >
        <span style={{
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🚀 GO GET THAT OFFER.
        </span>
      </motion.div>
    </motion.div>
  );
}
