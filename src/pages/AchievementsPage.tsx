import { motion } from 'framer-motion';
import { Trophy, Lock } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { achievements as achievementDefs } from '../constants';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3 } } };

export default function AchievementsPage() {
  const { state } = useApp();
  const unlocked = state.unlockedAchievements;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Achievements</h1>
        <p className="page-subtitle">
          {unlocked.length} of {achievementDefs.length} unlocked · Keep solving to unlock them all
        </p>
      </div>

      {/* Progress */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            Achievement Progress
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
            {Math.round((unlocked.length / achievementDefs.length) * 100)}%
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--bg-surface)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 3,
            width: `${(unlocked.length / achievementDefs.length) * 100}%`,
            background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 14,
        }}
      >
        {achievementDefs.map(achievement => {
          const isUnlocked = unlocked.includes(achievement.id);
          return (
            <motion.div
              key={achievement.id}
              variants={item}
              className="glass-card"
              style={{
                padding: '20px',
                display: 'flex', alignItems: 'center', gap: 16,
                opacity: isUnlocked ? 1 : 0.4,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {isUnlocked && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 60, height: 60,
                  background: 'radial-gradient(circle at top right, rgba(251, 191, 36, 0.1), transparent)',
                }} />
              )}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: isUnlocked
                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))'
                  : 'var(--bg-surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
                border: isUnlocked ? '1px solid rgba(251, 191, 36, 0.2)' : '1px solid var(--border-subtle)',
              }}>
                {isUnlocked ? achievement.icon : <Lock size={18} style={{ color: 'var(--text-muted)' }} />}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {achievement.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
                  {achievement.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
