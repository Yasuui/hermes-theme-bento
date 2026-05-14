'use client';

import { useDashboard } from '@/lib/dashboard-context';
import type { SidebarItem, DashboardView } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'layout-dashboard': (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  ),
  'bar-chart-3': (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16v-3" />
      <path d="M12 16v-7" />
      <path d="M17 16V8" />
    </svg>
  ),
  activity: (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export default function Sidebar() {
  const { state, toggleSidebar, setView } = useDashboard();
  const { sidebarOpen, sidebarItems, activeView } = state;

  const handleItemClick = (item: SidebarItem) => {
    setView(item.id);
  };

  return (
    <aside
      className={`flex flex-col border-r border-border-subtle bg-bg-sidebar transition-all duration-300 ${
        sidebarOpen ? 'w-60' : 'w-16'
      }`}
    >
      {/* Header / Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border-subtle px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-gold/15">
          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-accent-gold">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        </div>
        {sidebarOpen && (
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            Bento
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {sidebarItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-accent-gold-muted text-accent-gold-light'
                  : 'text-text-muted hover:bg-white/5 hover:text-text-secondary'
              }`}
              title={sidebarOpen ? undefined : item.label}
            >
              <span className="shrink-0">{iconMap[item.icon]}</span>
              {sidebarOpen && (
                <span className="flex-1 text-left font-medium">{item.label}</span>
              )}
              {sidebarOpen && isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
              )}
              {sidebarOpen && item.badge && (
                <span className="rounded-full bg-accent-gold/15 px-1.5 py-0.5 text-[10px] font-medium text-accent-gold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border-subtle p-2">
        <button
          onClick={toggleSidebar}
          className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-text-muted transition-colors hover:bg-white/5 hover:text-text-secondary"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
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
            className={`transition-transform duration-200 ${sidebarOpen ? '' : 'rotate-180'}`}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
