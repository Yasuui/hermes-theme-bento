'use client';

import { useDashboard } from '@/lib/dashboard-context';
import { useEffect, useCallback, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Slideover() {
  const { state, closeSlideover } = useDashboard();
  const { slideover } = state;
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSlideover();
      // Trap focus within panel
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeSlideover],
  );

  // Focus first focusable element on open
  useEffect(() => {
    if (slideover && panelRef.current) {
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const first = focusable[0] as HTMLElement | undefined;
      if (first) first.focus();

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
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={slideover.title}
    >
      {/* Backdrop — fade in */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeSlideover}
        aria-hidden="true"
      />

      {/* Panel — slide from right */}
      <div
        ref={panelRef}
        className="relative flex h-full w-full max-w-lg flex-col border-l border-border-subtle bg-bg-secondary shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <h2 className="text-base font-semibold text-text-primary" id="slideover-title">
            {slideover.title}
          </h2>
          <button
            onClick={closeSlideover}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
            aria-label="Close panel"
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
        <div className="flex-1 overflow-y-auto px-6 py-6">{slideover.content}</div>
      </div>
    </div>
  );
}
