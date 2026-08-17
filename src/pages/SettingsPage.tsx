import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Download, Upload, Trash2, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { exportProgress, importProgress, clearProgress } from '../utils/persistence';

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportProgress();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa-tracker-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const result = importProgress(text);
        if (result) {
          dispatch({ type: 'IMPORT_PROGRESS', progress: result });
          setImportStatus('Success! Progress imported.');
          setTimeout(() => setImportStatus(null), 3000);
        } else {
          setImportStatus('Error: Invalid file format.');
          setTimeout(() => setImportStatus(null), 3000);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    clearProgress();
    dispatch({ type: 'RESET_PROGRESS' });
    setShowResetConfirm(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your experience</p>
      </div>

      {/* Theme */}
      <div className="glass-card" style={{ padding: '22px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Theme</h3>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
              Switch between dark and light mode
            </p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_THEME', theme: state.theme === 'dark' ? 'light' : 'dark' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 10,
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              color: 'var(--text-primary)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}
          >
            {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>

      {/* Export */}
      <div className="glass-card" style={{ padding: '22px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Export Progress</h3>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
              Download your progress as a JSON file
            </p>
          </div>
          <button
            onClick={handleExport}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: 'var(--accent-primary-glow)', border: '1px solid rgba(99, 102, 241, 0.2)',
              color: 'var(--accent-primary)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Import */}
      <div className="glass-card" style={{ padding: '22px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Import Progress</h3>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
              Restore progress from a JSON backup
            </p>
          </div>
          <button
            onClick={handleImport}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
              color: 'var(--text-primary)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Upload size={14} /> Import
          </button>
        </div>
        {importStatus && (
          <div style={{
            marginTop: 10, padding: '8px 12px', borderRadius: 8,
            background: importStatus.includes('Error') ? 'rgba(248, 113, 113, 0.1)' : 'rgba(52, 211, 153, 0.1)',
            color: importStatus.includes('Error') ? 'var(--color-error)' : 'var(--color-success)',
            fontSize: 12, fontWeight: 500,
          }}>
            {importStatus}
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="glass-card" style={{ padding: '22px 24px', marginBottom: 16, border: '1px solid rgba(248, 113, 113, 0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--color-error)' }}>Reset Progress</h3>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', margin: '4px 0 0' }}>
              Clear all progress, notes, and achievements. This cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.2)',
              color: 'var(--color-error)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Trash2 size={14} /> Reset
          </button>
        </div>

        {showResetConfirm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            style={{ marginTop: 16, padding: '14px', borderRadius: 10, background: 'rgba(248, 113, 113, 0.05)', border: '1px solid rgba(248, 113, 113, 0.15)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <AlertTriangle size={16} style={{ color: 'var(--color-error)' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-error)' }}>
                Are you absolutely sure?
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '8px 20px', borderRadius: 8, border: 'none',
                  background: 'var(--color-error)', color: 'white',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  padding: '8px 20px', borderRadius: 8, border: '1px solid var(--border-default)',
                  background: 'transparent', color: 'var(--text-secondary)',
                  fontSize: 12, fontWeight: 500, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* About */}
      <div className="glass-card" style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Info size={16} style={{ color: 'var(--accent-primary)' }} />
          <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>About</h3>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 6px', lineHeight: 1.6 }}>
          FAANG DSA Prep Tracker — A gamified 23-day coding interview preparation dashboard.
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
          Curriculum curated by @rohitthementor · 96 videos · 22 bonus courses
        </p>
      </div>
    </motion.div>
  );
}
