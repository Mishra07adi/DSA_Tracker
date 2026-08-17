import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Target, Calendar, List, RotateCcw,
  BookOpen, Trophy, BarChart3, Settings, Zap
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useApp } from '../../stores/AppContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/mission', icon: Target, label: "Today's Mission" },
  { to: '/calendar', icon: Calendar, label: '23-Day Calendar' },
  { to: '/problems', icon: List, label: 'Problems' },
  { to: '/revision', icon: RotateCcw, label: 'Revision' },
  { to: '/deepdive', icon: BookOpen, label: 'Deep Dive' },
  { to: '/achievements', icon: Trophy, label: 'Achievements' },
  { to: '/statistics', icon: BarChart3, label: 'Statistics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { overallPercentage } = useProgress();
  const { state } = useApp();
  const location = useLocation();

  return (
    <aside style={{
      position: 'fixed',
      left: 0, top: 0, bottom: 0,
      width: 'var(--sidebar-width)',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 50,
      transition: 'width 0.3s ease',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, color: 'white',
          }}>D</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              DSA Tracker
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 }}>
              23-Day FAANG Prep
            </div>
          </div>
        </div>
      </div>

      {/* Mini Progress */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Progress
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary)' }}>
            {overallPercentage}%
          </span>
        </div>
        <div style={{
          height: 4, borderRadius: 2,
          background: 'var(--bg-surface)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${overallPercentage}%`,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #6366f1, #06b6d4)',
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-primary-glow)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                marginBottom: 2,
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-surface)';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <item.icon size={18} style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }} />
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Streak */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px',
          background: state.streak.current > 0 ? 'rgba(251, 146, 60, 0.08)' : 'var(--bg-surface)',
          borderRadius: 10,
          border: state.streak.current > 0 ? '1px solid rgba(251, 146, 60, 0.15)' : '1px solid var(--border-subtle)',
        }}>
          <Zap size={16} style={{ color: state.streak.current > 0 ? '#fb923c' : 'var(--text-muted)' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: state.streak.current > 0 ? '#fb923c' : 'var(--text-muted)' }}>
            {state.streak.current > 0 ? `${state.streak.current} Day Streak` : 'No Streak'}
          </span>
        </div>
      </div>
    </aside>
  );
}
