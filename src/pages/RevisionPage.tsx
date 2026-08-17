import { motion } from 'framer-motion';
import { RotateCcw, Play, Check, Pencil, Trash2, Target, Clock } from 'lucide-react';
import { useApp } from '../stores/AppContext';
import { useProgress } from '../hooks/useProgress';
import { useState } from 'react';

export default function RevisionPage() {
  const { state, dispatch } = useApp();
  const { revisionTasks } = useProgress();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Revision Queue</h1>
        <p className="page-subtitle">{revisionTasks.length} problems to revisit</p>
      </div>

      {revisionTasks.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 20px',
        }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>Clean Slate</h2>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', maxWidth: 400, margin: '0 auto' }}>
            Nothing needs revision right now. Mark problems as "Needs Revision" from the Mission or Problems page to add them here.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {revisionTasks.map(task => {
            const note = state.notes[task.id] || '';
            const diffColors: Record<string, string> = {
              easy: 'var(--color-easy)', medium: 'var(--color-medium)', hard: 'var(--color-hard)',
            };

            return (
              <div key={task.id} className="glass-card" style={{
                padding: '18px 22px',
                borderLeft: '3px solid var(--color-warning)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                        {task.title}
                      </h3>
                      {task.leetcode && (
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>LC {task.leetcode}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 8px',
                        borderRadius: 20, textTransform: 'uppercase',
                        background: `${diffColors[task.difficulty]}15`,
                        color: diffColors[task.difficulty],
                        border: `1px solid ${diffColors[task.difficulty]}30`,
                      }}>
                        {task.difficulty}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={11} /> {task.duration} min
                      </span>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', padding: '1px 6px', borderRadius: 4, background: 'var(--bg-surface)' }}>
                        {task.topic}
                      </span>
                    </div>
                    {note && (
                      <div style={{
                        marginTop: 10, padding: '8px 12px', borderRadius: 8,
                        background: 'var(--bg-surface)', fontSize: 12, color: 'var(--text-secondary)',
                        whiteSpace: 'pre-wrap',
                      }}>
                        {note}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <a
                    href={task.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#ef4444', fontSize: 12, fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    <Play size={12} /> Watch Again
                  </a>
                  <button
                    onClick={() => dispatch({ type: 'SET_TASK_STATUS', taskId: task.id, status: 'completed' })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 8,
                      background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.2)',
                      color: '#34d399', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    <Check size={12} /> Mark Mastered
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'SET_TASK_STATUS', taskId: task.id, status: 'not-started' })}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 8,
                      background: 'var(--bg-surface)', border: '1px solid var(--border-default)',
                      color: 'var(--text-tertiary)', fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
