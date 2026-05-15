'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Cpu,
  ScrollText,
  Clock,
  Shield,
  Puzzle,
  Users,
  Settings2,
  Key,
  BookOpen,
  Kanban,
  Star,
  Trophy,
  ChevronLeft,
  RefreshCw,
  Upload,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { useDashboard } from '@/lib/dashboard-context';
import type { ThemeMode } from '@/types';

type NavItem = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
};

type NavSection = {
  label?: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: 'sessions',      label: 'Sessions',      Icon: MessageSquare },
      { id: 'models',        label: 'Models',        Icon: Cpu },
      { id: 'logs',          label: 'Logs',          Icon: ScrollText },
      { id: 'cron',          label: 'Cron',          Icon: Clock },
      { id: 'skills',        label: 'Skills',        Icon: Shield },
      { id: 'plugins',       label: 'Plugins',       Icon: Puzzle },
      { id: 'profiles',      label: 'Profiles',      Icon: Users },
      { id: 'config',        label: 'Config',        Icon: Settings2 },
      { id: 'keys',          label: 'Keys',          Icon: Key },
      { id: 'documentation', label: 'Documentation', Icon: BookOpen },
    ],
  },
  {
    label: 'PLUGINS',
    items: [
      { id: 'kanban',        label: 'Kanban',        Icon: Kanban },
      { id: 'example',       label: 'Example',       Icon: Star },
      { id: 'achievements',  label: 'Achievements',  Icon: Trophy },
    ],
  },
];

const THEME_CYCLE: Record<ThemeMode, ThemeMode> = {
  dark: 'light',
  light: 'system',
  system: 'dark',
};

function ThemeIcon({ theme }: { theme: ThemeMode }) {
  if (theme === 'light') return <Sun className="w-4 h-4" aria-hidden />;
  if (theme === 'system') return <Monitor className="w-4 h-4" aria-hidden />;
  return <Moon className="w-4 h-4" aria-hidden />;
}

export default function Sidebar() {
  const { state, toggleSidebar, setTheme } = useDashboard();
  const { sidebarOpen, theme } = state;
  const [activeId, setActiveId] = useState('sessions');

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={`
          flex flex-col border-r border-[rgba(255,230,203,0.08)] bg-[#052525]
          transition-all duration-200 ease-out
          fixed inset-y-0 left-0 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-60
          lg:static lg:z-auto lg:translate-x-0
          ${sidebarOpen ? 'lg:w-60' : 'lg:w-16'}
        `}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-3 border-b border-[rgba(255,230,203,0.08)] px-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(255,230,203,0.08)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--accent-cream)]"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          {sidebarOpen && (
            <div className="flex flex-col leading-none">
              <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-[var(--text-primary)]">
                HERMES
              </span>
              <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-[var(--accent-cream)]">
                AGENT
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav
          aria-label="Sidebar navigation"
          className="flex-1 overflow-y-auto px-2 py-3 space-y-4"
        >
          {NAV_SECTIONS.map((section, si) => (
            <div key={si}>
              {section.label && sidebarOpen && (
                <p className="px-3 pb-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {section.label}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = activeId === item.id;
                  const { Icon } = item;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150
                        focus-visible:ring-2 focus-visible:ring-[var(--accent-cream)] focus-visible:outline-none
                        ${
                          isActive
                            ? 'text-[var(--accent-cream)] border-l-2 border-[var(--accent-cream)] bg-[rgba(255,230,203,0.06)] pl-[10px]'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[rgba(255,230,203,0.03)]'
                        }`}
                      title={sidebarOpen ? undefined : item.label}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden />
                      {sidebarOpen && (
                        <span className="flex-1 truncate text-left font-medium">
                          {item.label}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom system section — visible only when expanded */}
        {sidebarOpen && (
          <div className="border-t border-[rgba(255,230,203,0.08)] px-3 py-3 space-y-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
              SYSTEM
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Gateway Status</span>
                <span className="flex items-center gap-1.5 text-xs text-[#00e87a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00e87a]" aria-hidden="true" />
                  RUNNING
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Active Sessions</span>
                <span className="text-xs text-[var(--text-primary)]">12</span>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md border border-[rgba(255,230,203,0.08)] px-2 py-1.5 text-[10px] font-mono text-[var(--text-muted)] hover:bg-[rgba(255,230,203,0.04)] hover:text-[var(--text-secondary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-cream)] focus-visible:outline-none">
                <RefreshCw className="w-3 h-3" aria-hidden />
                Restart Gateway
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md border border-[rgba(255,230,203,0.08)] px-2 py-1.5 text-[10px] font-mono text-[var(--text-muted)] hover:bg-[rgba(255,230,203,0.04)] hover:text-[var(--text-secondary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-cream)] focus-visible:outline-none">
                <Upload className="w-3 h-3" aria-hidden />
                Update Hermes
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[var(--text-muted)]">
                v0.13.0 · NOUS RESEARCH
              </span>
              <button
                onClick={() => setTheme(THEME_CYCLE[theme])}
                className="rounded-md p-1 text-[var(--text-muted)] hover:bg-[rgba(255,230,203,0.04)] hover:text-[var(--text-secondary)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--accent-cream)] focus-visible:outline-none"
                aria-label="Toggle theme"
              >
                <ThemeIcon theme={theme} />
              </button>
            </div>
          </div>
        )}

        {/* Collapse toggle — desktop only */}
        <div className="hidden border-t border-[rgba(255,230,203,0.08)] p-2 lg:block">
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-[var(--text-muted)] transition-colors hover:bg-[rgba(255,230,203,0.03)] hover:text-[var(--text-secondary)] focus-visible:ring-2 focus-visible:ring-[var(--accent-cream)] focus-visible:outline-none"
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform duration-200 ${sidebarOpen ? '' : 'rotate-180'}`}
              aria-hidden
            />
          </button>
        </div>
      </aside>
    </>
  );
}
