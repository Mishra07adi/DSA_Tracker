import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './stores/AppContext';
import AppLayout from './components/layout/AppLayout';

// Lazy-loaded pages for performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TodayMission = lazy(() => import('./pages/TodayMission'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const ProblemsPage = lazy(() => import('./pages/ProblemsPage'));
const RevisionPage = lazy(() => import('./pages/RevisionPage'));
const DeepDivePage = lazy(() => import('./pages/DeepDivePage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const CompletionPage = lazy(() => import('./pages/CompletionPage'));

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '50vh', color: 'var(--text-muted)',
    }}>
      <div style={{
        width: 32, height: 32, border: '3px solid var(--border-subtle)',
        borderTopColor: 'var(--accent-primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/mission" element={<TodayMission />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/problems" element={<ProblemsPage />} />
              <Route path="/revision" element={<RevisionPage />} />
              <Route path="/deepdive" element={<DeepDivePage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/completion" element={<CompletionPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}
