import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import AchievementToast from '../ui/AchievementToast';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <div className="sidebar-desktop">
        <Sidebar />
      </div>
      <main className="app-content">
        <Outlet />
      </main>
      <MobileNav />
      <AchievementToast />
      <style>{`
        @media (max-width: 768px) {
          .sidebar-desktop { display: none; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .sidebar-desktop aside {
            width: var(--sidebar-collapsed) !important;
          }
          .sidebar-desktop .sidebar-label {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
