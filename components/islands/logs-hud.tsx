'use client';

import { useState, useRef, useCallback, useEffect, KeyboardEvent } from 'react';
import BentoCard from '@/components/islands/bento-card';

// --- Types ---

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
}

interface LogsHudProps {
  initialLogs?: LogEntry[];
  onFilterChange?: (activeLevel: LogLevel | 'all') => void;
}

// --- Constants ---

const FILTERS: { label: string; value: LogLevel | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Info', value: 'info' },
  { label: 'Warn', value: 'warn' },
  { label: 'Error', value: 'error' },
  { label: 'Debug', value: 'debug' },
];

const LEVEL_STYLES: Record<LogLevel, { badge: string; dot: string }> = {
  info: {
    badge: 'border-blue-400/20 bg-blue-400/10 text-blue-400',
    dot: 'bg-blue-400',
  },
  warn: {
    badge: 'border-amber-400/20 bg-amber-400/10 text-amber-400',
    dot: 'bg-amber-400',
  },
  error: {
    badge: 'border-red-400/20 bg-red-400/10 text-red-400',
    dot: 'bg-red-400',
  },
  debug: {
    badge: 'border-gray-400/20 bg-gray-400/10 text-gray-400',
    dot: 'bg-gray-400',
  },
};

const DEFAULT_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    timestamp: '14:32:01.847',
    level: 'info',
    message: 'Hermes Agent v4.2.1 initialized successfully',
    metadata: { version: '4.2.1', mode: 'production', pid: 1847 },
  },
  {
    id: 'log-2',
    timestamp: '14:32:02.103',
    level: 'info',
    message: 'Loaded 12 skill modules from profile "builder"',
    metadata: { profile: 'builder', skills: 12, duration_ms: 256 },
  },
  {
    id: 'log-3',
    timestamp: '14:32:02.451',
    level: 'debug',
    message: 'Gateway connection established via ws://localhost:8080/ws',
    metadata: { endpoint: 'ws://localhost:8080/ws', protocol: 'v2', reconnect: false },
  },
  {
    id: 'log-4',
    timestamp: '14:32:03.012',
    level: 'info',
    message: 'Session context loaded — 4 prior turns restored',
    metadata: { session_id: 'sess_a1b2c3d4', prior_turns: 4, tokens: 1247 },
  },
  {
    id: 'log-5',
    timestamp: '14:32:03.789',
    level: 'warn',
    message: 'Tool "web-scraper" responded with degraded latency (1240ms)',
    metadata: { tool: 'web-scraper', latency_ms: 1240, threshold_ms: 800, retry_count: 1 },
  },
  {
    id: 'log-6',
    timestamp: '14:32:04.221',
    level: 'error',
    message: 'Failed to index repository: .git directory not found',
    metadata: { path: '/tmp/scratch-abc', error: 'ENOENT', code: 2 },
  },
  {
    id: 'log-7',
    timestamp: '14:32:04.856',
    level: 'debug',
    message: 'Cache miss for model "deepseek/deepseek-v4-flash" — fetching weights',
    metadata: { model: 'deepseek/deepseek-v4-flash', cache_key: 'v4-flash-5fc92', size_mb: 14.2 },
  },
  {
    id: 'log-8',
    timestamp: '14:32:05.403',
    level: 'info',
    message: 'All systems ready — entering idle listener loop',
    metadata: { uptime_ms: 4556, memory_mb: 342, cpu_pct: 12 },
  },
];

// --- Sub-components ---

function LoadingPlaceholder() {
  // Deterministic widths for skeleton placeholders
  const widths = ['62%', '78%', '65%', '82%', '71%'];
  return (
    <div className="space-y-2 px-3 py-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex animate-pulse items-center gap-3">
          <div className="h-3 w-16 rounded bg-bg-card-hover" />
          <div className="h-4 w-12 rounded-full bg-bg-card-hover" />
          <div
            className="h-3 rounded bg-bg-card-hover"
            style={{ width: widths[i] }}
          />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={36}
        height={36}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-3 text-text-muted"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
      <p className="text-sm font-medium text-text-muted">No logs recorded yet</p>
      <p className="mt-1 text-xs text-text-muted/60">
        Log output will appear here as the system runs
      </p>
    </div>
  );
}

function MetadataDisplay({ data }: { data: Record<string, unknown> }) {
  const entries = Object.entries(data);

  return (
    <div className="mt-2 space-y-1 rounded-md border border-border-subtle bg-bg-secondary/50 p-2.5 font-mono text-[11px] leading-relaxed">
      <span className="block text-text-muted/60">&#123;</span>
      {entries.map(([key, value], i) => (
        <div key={key} className="ml-3 flex items-start gap-1">
          <span className="shrink-0 text-accent-gold-light">&quot;{key}&quot;</span>
          <span className="text-text-muted">: </span>
          <span className="break-all text-text-secondary">
            {typeof value === 'string'
              ? `"${value}"`
              : JSON.stringify(value, null, 0)}
          </span>
          {i < entries.length - 1 && <span className="text-text-muted">,</span>}
        </div>
      ))}
      <span className="block text-text-muted/60">&#125;</span>
    </div>
  );
}

// --- Main Component ---

export default function LogsHud({
  initialLogs = DEFAULT_LOGS,
  onFilterChange,
}: LogsHudProps) {
  const [activeFilter, setActiveFilter] = useState<LogLevel | 'all'>('all');
  const [isLoading] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [logs] = useState<LogEntry[]>(initialLogs);
  const scrollRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredLogs =
    activeFilter === 'all'
      ? logs
      : logs.filter((entry) => entry.level === activeFilter);

  const hasExpanded = expandedIds.size > 0;

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [logs.length]);

  // Collapse expanded entry on Escape
  useEffect(() => {
    if (!hasExpanded) return;

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setExpandedIds(new Set());
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasExpanded]);

  const handleFilterSelect = useCallback(
    (level: LogLevel | 'all') => {
      setActiveFilter(level);
      setExpandedIds(new Set());
      onFilterChange?.(level);
    },
    [onFilterChange],
  );

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleEntryKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleExpand(id);
      }
    },
    [toggleExpand],
  );

  const handleFilterKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, level: LogLevel | 'all') => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFilterSelect(level);
      }
    },
    [handleFilterSelect],
  );

  const handleListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && hasExpanded) {
        e.preventDefault();
        setExpandedIds(new Set());
      }
    },
    [hasExpanded],
  );

  return (
    <BentoCard
      title="Logs"
      description="Real-time system log stream"
      variant="wide"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      }
    >
      <div className="flex flex-col gap-3">
        {/* Filter buttons row */}
        <div
          ref={filterBarRef}
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="Log level filters"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              role="tab"
              aria-selected={activeFilter === filter.value}
              onClick={() => handleFilterSelect(filter.value)}
              onKeyDown={(e) => handleFilterKeyDown(e, filter.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none ${
                activeFilter === filter.value
                  ? 'border border-accent-gold/30 bg-accent-gold-muted text-accent-gold-light shadow-sm'
                  : 'border border-border-subtle bg-transparent text-text-muted hover:border-border-accent hover:text-text-secondary'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Log stream */}
        {isLoading ? (
          <LoadingPlaceholder />
        ) : filteredLogs.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            ref={listRef}
            role="region"
            aria-label="Log entries"
            className="max-h-80 overflow-y-auto rounded-lg border border-border-subtle bg-bg-secondary/30"
            onKeyDown={handleListKeyDown}
          >
            <div className="divide-y divide-border-subtle">
              {filteredLogs.map((entry) => {
                const isExpanded = expandedIds.has(entry.id);
                const levelStyle = LEVEL_STYLES[entry.level];

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => toggleExpand(entry.id)}
                    onKeyDown={(e) => handleEntryKeyDown(e, entry.id)}
                    className={`w-full text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-gold focus-visible:outline-none ${
                      isExpanded
                        ? 'bg-accent-gold-muted/40'
                        : 'hover:bg-bg-card-hover'
                    }`}
                    aria-expanded={isExpanded}
                    aria-label={`${entry.level} log: ${entry.message}`}
                  >
                    <div className="px-3 py-2">
                      {/* Main log line */}
                      <div className="flex items-start gap-2.5">
                        {/* Level dot */}
                        <span
                          className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${levelStyle.dot}`}
                        />

                        {/* Timestamp */}
                        <span className="shrink-0 pt-px font-mono text-[11px] leading-relaxed text-text-muted">
                          {entry.timestamp}
                        </span>

                        {/* Level badge */}
                        <span
                          className={`shrink-0 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wider ${levelStyle.badge}`}
                        >
                          {entry.level}
                        </span>

                        {/* Message */}
                        <span className="min-w-0 flex-1 pt-px text-xs leading-relaxed text-text-primary">
                          {entry.message}
                        </span>

                        {/* Expand indicator */}
                        <span
                          className={`mt-1 shrink-0 text-[10px] text-text-muted transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        >
                          ▼
                        </span>
                      </div>

                      {/* Expanded detail */}
                      {isExpanded && (
                        <div className="mt-2 ml-5 space-y-1.5 border-l-2 border-accent-gold/20 pl-3">
                          <div className="text-[11px] leading-relaxed text-text-primary">
                            {entry.message}
                          </div>
                          {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                            <MetadataDisplay data={entry.metadata} />
                          )}
                          {(!entry.metadata ||
                            Object.keys(entry.metadata).length === 0) && (
                            <span className="text-[11px] italic text-text-muted">
                              No additional metadata
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Invisible sentinel for auto-scroll */}
            <div ref={scrollRef} />
          </div>
        )}
      </div>
    </BentoCard>
  );
}
