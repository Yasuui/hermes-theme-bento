'use client';

import { useDashboard } from '@/lib/dashboard-context';
import { useEffect, useCallback } from 'react';

export default function Slideover() {
  const { state, closeSlideover } = useDashboard();
  const { slideover } = state;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSlideover();
    },
    [closeSlideover],
  );

  useEffect(() => {
    if (slideover) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [slideover, handleKeyDown]);

  if (!slideover) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm transition-opacity duration-300"
        onClick={closeSlideover}
      />

      {/* Panel */}
      <div className="relative flex h-full w-full max-w-lg flex-col border-l border-border-subtle bg-bg-secondary shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <h2 className="text-base font-semibold text-text-primary">
            {slideover.title}
          </h2>
          <button
            onClick={closeSlideover}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {slideover.content}
        </div>
      </div>
    </div>
  );
}
