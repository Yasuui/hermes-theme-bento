'use client';

import Layout from '@/components/islands/layout';
import BentoCard from '@/components/islands/bento-card';
import ProfilesIsland from '@/components/islands/profiles-island';
import ModelsIsland from '@/components/islands/models-island';
import SkillsIsland from '@/components/islands/skills-island';
import LogsHud from '@/components/islands/logs-hud';
import McpIsland from '@/components/islands/mcp-island';
import { ExternalLink } from 'lucide-react';
import { useDashboard } from '@/lib/dashboard-context';

function ActivityItem({
  user,
  action,
  time,
}: {
  user: string;
  action: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border-subtle py-3 last:border-0">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold-muted text-[11px] font-semibold text-accent-gold-light"
        aria-hidden="true"
      >
        {user
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-text-primary">
          <span className="font-medium">{user}</span>{' '}
          <span className="text-text-secondary">{action}</span>
        </p>
        <p className="text-xs text-text-muted">{time}</p>
      </div>
    </div>
  );
}

function MiniBar({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {values.map((v, i) => (
        <div
          key={i}
          className="w-full rounded-t-sm transition-all duration-200"
          style={{
            height: `${(v / max) * 40}px`,
            backgroundColor: color,
            opacity: 0.3 + (v / max) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

const weeklyData = [32, 45, 28, 56, 48, 72, 63];

const sampleActivity = [
  { user: 'Alex Chen', action: 'deployed v2.4.1 to production', time: '2 min ago' },
  { user: 'Sarah Kim', action: 'created new project "Dashboard Redesign"', time: '15 min ago' },
  { user: 'Marcus Lee', action: 'merged PR #342 — analytics module', time: '1 hr ago' },
  { user: 'Priya Sharma', action: 'commented on "API Rate Limiting"', time: '2 hr ago' },
  { user: 'James Wilson', action: 'updated team documentation', time: '3 hr ago' },
];

export default function Home() {
  const { openSlideover } = useDashboard();

  return (
    <Layout>
      {/* Skip to main content link — visually hidden, first tab stop */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:inset-x-0 focus:top-0 focus:z-[100] focus:block focus:text-center focus:bg-accent-gold focus:text-bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:outline-none"
      >
        Skip to main content
      </a>

      <main id="main-content" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <h1 className="sr-only">Dashboard Overview</h1>

        {/* Stat: Active Sessions */}
        <BentoCard
          title="ACTIVE SESSIONS"
          description="3 running · 9 idle"
          index={0}
        >
          <div className="flex items-end justify-between">
            <p className="text-4xl font-mono text-[var(--text-primary)]">12</p>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded px-1.5 py-0.5 text-[11px] font-mono bg-[rgba(0,232,122,0.12)] text-[#00e87a]">+2</span>
              <svg width="60" height="24" viewBox="0 0 60 24" aria-hidden="true">
                <polyline points="0,20 10,16 20,18 30,10 40,14 50,8 60,12"
                  fill="none" stroke="#00e87a" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </BentoCard>

        {/* Stat: Models Loaded */}
        <BentoCard
          title="MODELS LOADED"
          description="4 providers · 2 active"
          index={1}
        >
          <div className="flex items-end justify-between">
            <p className="text-4xl font-mono text-[var(--text-primary)]">8</p>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded px-1.5 py-0.5 text-[11px] font-mono bg-[rgba(0,232,122,0.12)] text-[#00e87a]">↑ 1</span>
              <svg width="60" height="24" viewBox="0 0 60 24" aria-hidden="true">
                <polyline points="0,20 10,16 20,18 30,10 40,14 50,8 60,12"
                  fill="none" stroke="#00e87a" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </BentoCard>

        {/* Stat: Gateway Uptime */}
        <BentoCard
          title="GATEWAY UPTIME"
          description="Last restart 6h ago"
          index={2}
        >
          <div>
            <p className="text-4xl font-mono text-[#00e87a]">99.2%</p>
            <div className="mt-3 h-1.5 rounded-full bg-[rgba(255,230,203,0.06)] overflow-hidden">
              <div className="h-full rounded-full bg-[#00e87a]" style={{ width: '99.2%' }} aria-hidden="true" />
            </div>
            <div className="mt-2">
              <span className="rounded px-1.5 py-0.5 text-[11px] font-mono bg-[rgba(0,232,122,0.12)] text-[#00e87a]">HEALTHY</span>
            </div>
          </div>
        </BentoCard>

        {/* Profiles Island */}
        <ProfilesIsland />

        {/* Weekly chart — wide */}
        <BentoCard
          title="Weekly Activity"
          description="Last 7 days"
          variant="wide"
          index={4}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3v18h18" />
              <path d="M7 16v-3" />
              <path d="M12 16v-7" />
              <path d="M17 16V8" />
            </svg>
          }
        >
          <div className="mt-2 flex gap-12">
            <div>
              <p className="text-2xl font-bold text-text-primary">63</p>
              <p className="text-xs text-text-muted">actions today</p>
            </div>
            <div className="flex-1">
              <MiniBar values={weeklyData} color="#00e87a" />
              <div className="mt-1 flex justify-between text-[10px] text-text-muted" aria-label="Day labels">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Models Island — tall */}
        <ModelsIsland />

        {/* Activity feed — featured */}
        <BentoCard
          title="Recent Activity"
          description="Latest team updates"
          variant="featured"
          index={6}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        >
          <div className="mt-1" role="list" aria-label="Recent activity feed">
            {sampleActivity.map((item, i) => (
              <div key={i} role="listitem">
                <ActivityItem {...item} />
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Skills Island — featured */}
        <SkillsIsland />

        {/* Logs HUD — wide */}
        <LogsHud />

        {/* MCP Island — wide */}
        <McpIsland />

        {/* Quick action card */}
        <BentoCard
          title="Quick Actions"
          description="Common operations"
          index={10}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          }
        >
          <div className="mt-1 grid grid-cols-2 gap-2">
            <button
              onClick={() =>
                openSlideover({
                  title: 'New Project',
                  content: <p className="text-sm text-text-secondary">Create project form would render here.</p>,
                })
              }
              className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none"
            >
              + New Project
            </button>
            <button
              onClick={() =>
                openSlideover({
                  title: 'Invite Teammates',
                  content: <p className="text-sm text-text-secondary">Invite form would render here.</p>,
                })
              }
              className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none"
            >
              + Invite
            </button>
            <button className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none">
              Reports
            </button>
            <button className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none">
              Settings
            </button>
          </div>
        </BentoCard>

        {/* Top Projects */}
        <BentoCard
          title="Top Projects"
          description="By activity volume"
          variant="tall"
          index={11}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {[
              { name: 'bento-dashboard', files: 142, color: '#c8a45c' },
              { name: 'rift-expenses', files: 89, color: '#6c5ce7' },
              { name: 'hermes-agent', files: 312, color: '#00b894' },
              { name: 'design-system', files: 56, color: '#0984e3' },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: p.color }}
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm text-text-primary">{p.name}</span>
                <span className="text-xs text-text-muted">{p.files} files</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* System Status */}
        <BentoCard
          title="System Status"
          description="All services healthy"
          index={12}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        >
          <div className="space-y-2">
            {[
              { label: 'API Server', status: 'operational' as const },
              { label: 'Database', status: 'operational' as const },
              { label: 'Cache Layer', status: 'degraded' as const },
              { label: 'CDN', status: 'operational' as const },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{s.label}</span>
                <span
                  className={`flex items-center gap-1 text-[11px] font-medium ${
                    s.status === 'operational'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      s.status === 'operational'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    }`}
                    aria-hidden="true"
                  />
                  {s.status === 'operational' ? 'Operational' : 'Degraded'}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Hermes Info Island */}
        <BentoCard
          title="HERMES BENTO"
          variant="wide"
          index={13}
          icon={<ExternalLink aria-hidden />}
        >
          <div className="space-y-0">
            {[
              { label: 'Version', value: 'v0.1.0' },
              { label: 'Base', value: 'Hermes Agent v0.13.0' },
              { label: 'License', value: 'MIT Open Source' },
              { label: 'Stack', value: 'Next.js 16 · React 19 · Tailwind v4' },
              { label: 'Islands', value: '5 UI components' },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between py-2 border-b border-[rgba(255,230,203,0.06)] last:border-0"
              >
                <span className="text-xs text-[var(--text-muted)]">{row.label}</span>
                <span className="text-xs font-mono text-[var(--text-primary)]">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <a
              href="https://github.com/Yasuui/hermes-theme-bento"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--accent-cream)] hover:underline"
            >
              github.com/Yasuui/hermes-theme-bento
            </a>
          </div>
        </BentoCard>
      </main>
    </Layout>
  );
}
