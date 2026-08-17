import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useApp } from '../../stores/AppContext';
import { achievements as achievementDefs } from '../../constants';

export default function AchievementToast() {
  const { newAchievements, clearNewAchievements } = useApp();
  const [visible, setVisible] = useState<string | null>(null);
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    if (newAchievements.length > 0) {
      setQueue(prev => [...prev, ...newAchievements]);
      clearNewAchievements();
    }
  }, [newAchievements, clearNewAchievements]);

  useEffect(() => {
    if (!visible && queue.length > 0) {
      const [next, ...rest] = queue;
      setVisible(next);
      setQueue(rest);
      setTimeout(() => setVisible(null), 4000);
    }
  }, [visible, queue]);

  const achievement = achievementDefs.find(a => a.id === visible);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          style={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '16px 24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.1))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            maxWidth: 340,
          }}
        >
          <div style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0,
          }}>
            {achievement.icon}
          </div>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.1em', color: '#818cf8', marginBottom: 2,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Trophy size={10} /> Achievement Unlocked
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              {achievement.title}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>
              {achievement.description}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
