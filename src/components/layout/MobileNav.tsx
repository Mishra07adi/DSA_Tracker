import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Target, Calendar, List, BarChart3 } from 'lucide-react';

const mobileNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/mission', icon: Target, label: 'Mission' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/problems', icon: List, label: 'Problems' },
  { to: '/statistics', icon: BarChart3, label: 'Stats' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      height: 72,
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'none',
      zIndex: 50,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }} className="mobile-nav">
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        maxWidth: 500,
        margin: '0 auto',
      }}>
        {mobileNavItems.map(item => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: 12,
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon
                size={20}
                style={{
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  transition: 'color 0.15s ease',
                }}
              />
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                letterSpacing: '0.02em',
              }}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-nav { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
