'use client';

import { useDashboard } from '@/lib/dashboard-context';
import Sidebar from '@/components/islands/sidebar';
import Slideover from '@/components/islands/slideover';
import type { ThemeMode } from '@/types';
import { useEffect, useState } from 'react';

const themeIcons: Record<ThemeMode, React.ReactNode> = {
  dark: (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  light: (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  ),
};

const viewLabels: Record<string, string> = {
  home: 'Overview',
  analytics: 'Analytics',
  activity: 'Activity',
  settings: 'Settings',
};

function Breadcrumbs({ activeView }: { activeView: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <span className="text-text-muted">Dashboard</span>
      {activeView !== 'home' && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-text-muted"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="font-medium text-text-primary">
            {viewLabels[activeView] ?? activeView}
          </span>
        </>
      )}
    </nav>
  );
}

function ThemeToggle() {
  const { state, setTheme } = useDashboard();
  const { theme } = state;
  const [open, setOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  const options: ThemeMode[] = ['dark', 'light', 'system'];

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary"
        aria-label={`Theme: ${theme}`}
        title={`Theme: ${theme}`}
      >
        {themeIcons[theme]}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-40 mt-1 w-36 overflow-hidden rounded-lg border border-border-subtle bg-bg-card shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setTheme(option);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-xs font-medium transition-colors ${
                option === theme
                  ? 'bg-accent-gold-muted text-accent-gold-light'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <span className="shrink-0">{themeIcons[option]}</span>
              <span className="capitalize">{option}</span>
              {option === theme && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-accent-gold"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, toggleSidebar } = useDashboard();
  const { activeView } = state;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar — responsive: hidden on mobile unless toggled */}
      <Sidebar />
      <Slideover />

      {/* Main Content */}
      <main id="main-content" className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle px-4 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger — hidden on desktop */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-white/5 hover:text-text-primary lg:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
            <Breadcrumbs activeView={activeView} />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold-muted text-xs font-semibold text-accent-gold-light">
              Y
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}
