'use client';

import Layout from '@/components/islands/layout';
import BentoCard from '@/components/islands/bento-card';
import { useDashboard } from '@/lib/dashboard-context';

function StatCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  const isPositive = change.startsWith('+');
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gold-muted text-accent-gold">
          {icon}
        </div>
        <div>
          <p className="text-xs text-text-muted">{label}</p>
          <p className="text-lg font-semibold text-text-primary">{value}</p>
        </div>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
          isPositive
            ? 'bg-emerald-500/10 text-emerald-400'
            : 'bg-red-500/10 text-red-400'
        }`}
      >
        {change}
      </span>
    </div>
  );
}

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
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold-muted text-[11px] font-semibold text-accent-gold-light">
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
    <div className="flex items-end gap-[3px]">
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Stat: Revenue */}
        <BentoCard
          title="Revenue"
          description="Monthly recurring"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" x2="12" y1="2" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          }
        >
          <StatCard
            label="This month"
            value="$48,290"
            change="+12.5%"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            }
          />
        </BentoCard>

        {/* Stat: Users */}
        <BentoCard
          title="Active Users"
          description="Daily average"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        >
          <StatCard
            label="Today"
            value="2,847"
            change="+8.2%"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
          />
        </BentoCard>

        {/* Stat: Active Now */}
        <BentoCard
          title="Active Now"
          description="Currently online"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-text-primary">143</span>
            <span className="text-xs text-text-muted">users</span>
          </div>
          <div className="mt-3 flex -space-x-2">
            {['#c8a45c', '#6c5ce7', '#00b894', '#fd79a8', '#0984e3'].map((c, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-2 border-bg-card"
                style={{ backgroundColor: c }}
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-card bg-bg-tertiary text-[10px] font-medium text-text-muted">
              +12
            </div>
          </div>
        </BentoCard>

        {/* Weekly chart — wide */}
        <BentoCard
          title="Weekly Activity"
          description="Last 7 days"
          variant="wide"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
              <MiniBar values={weeklyData} color="#c8a45c" />
              <div className="mt-1 flex justify-between text-[10px] text-text-muted">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Recently active projects — tall */}
        <BentoCard
          title="Top Projects"
          description="By activity volume"
          variant="tall"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
                />
                <span className="flex-1 text-sm text-text-primary">{p.name}</span>
                <span className="text-xs text-text-muted">{p.files} files</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Activity feed — featured */}
        <BentoCard
          title="Recent Activity"
          description="Latest team updates"
          variant="featured"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        >
          <div className="mt-1">
            {sampleActivity.map((item, i) => (
              <ActivityItem key={i} {...item} />
            ))}
          </div>
        </BentoCard>

        {/* Quick action card */}
        <BentoCard
          title="Quick Actions"
          description="Common operations"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
              className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary"
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
              className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary"
            >
              + Invite
            </button>
            <button className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary">
              Reports
            </button>
            <button className="rounded-lg border border-border-subtle bg-bg-tertiary px-3 py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-accent hover:text-text-primary">
              Settings
            </button>
          </div>
        </BentoCard>

        {/* System Status */}
        <BentoCard
          title="System Status"
          description="All services healthy"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
                  />
                  {s.status === 'operational' ? 'Operational' : 'Degraded'}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Upgrade CTA */}
        <BentoCard
          title="Enterprise Plan"
          description="Unlock premium features"
          accentColor="#c8a45c"
          variant="wide"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-accent-gold-light">$29/mo</p>
              <p className="text-xs text-text-muted">
                Unlimited projects, advanced analytics
              </p>
            </div>
            <button className="rounded-lg bg-accent-gold px-4 py-2 text-xs font-semibold text-bg-primary transition-all hover:bg-accent-gold-light">
              Upgrade
            </button>
          </div>
        </BentoCard>
      </div>
    </Layout>
  );
}
