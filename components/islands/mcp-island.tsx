'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import BentoCard from './bento-card';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type McpConnectionStatus = 'connected' | 'disconnected' | 'connecting';

export interface McpServer {
  id: string;
  name: string;
  type: string;
  status: McpConnectionStatus;
  capabilities: string[];
  details?: string;
}

export interface McpIslandProps {
  servers?: McpServer[];
  loading?: boolean;
  onAddServer?: () => void;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default sample data                                                       */
/* -------------------------------------------------------------------------- */

const DEFAULT_SERVERS: McpServer[] = [
  {
    id: 'file-system',
    name: 'File System',
    type: 'local',
    status: 'connected',
    capabilities: ['Files', 'Directory', 'Search'],
    details: 'Read, write, and manage local files. Path: /Users/agentos/projects',
  },
  {
    id: 'github',
    name: 'GitHub',
    type: 'cloud',
    status: 'connected',
    capabilities: ['Git', 'Issues', 'PRs', 'Code Review'],
    details: 'GitHub API integration for repository management. Connected as agentos.',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    type: 'database',
    status: 'connecting',
    capabilities: ['Database', 'SQL', 'Schema'],
    details: 'PostgreSQL connection with read-write access to analytics database.',
  },
  {
    id: 'web-search',
    name: 'Web Search',
    type: 'cloud',
    status: 'connected',
    capabilities: ['Web', 'Search', 'News'],
    details: 'Web search via Firecrawl. Scraping rate: 10 req/min.',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    type: 'local',
    status: 'disconnected',
    capabilities: ['Shell', 'Process', 'SSH'],
    details: 'Local terminal emulator. Last active: 2 hours ago.',
  },
];

/* -------------------------------------------------------------------------- */
/*  Server type badge colors                                                  */
/* -------------------------------------------------------------------------- */

const typeBadgeColors: Record<string, string> = {
  local:
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cloud:
    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  database:
    'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

function getTypeBadgeClasses(type: string): string {
  return (
    typeBadgeColors[type] ||
    'bg-orange-500/10 text-orange-400 border-orange-500/20'
  );
}

/* -------------------------------------------------------------------------- */
/*  Capability tag themes                                                     */
/* -------------------------------------------------------------------------- */

const capabilityThemes: Record<string, string> = {
  Files:      'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Directory:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Database:   'bg-violet-500/10 text-violet-400 border-violet-500/20',
  SQL:        'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Schema:     'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Web:        'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Search:     'bg-sky-500/10 text-sky-400 border-sky-500/20',
  News:       'bg-sky-500/10 text-sky-400 border-sky-500/20',
  Git:        'bg-gray-500/10 text-gray-400 border-gray-500/20',
  Issues:     'bg-gray-500/10 text-gray-400 border-gray-500/20',
  PRs:        'bg-green-500/10 text-green-400 border-green-500/20',
  'Code Review':
               'bg-green-500/10 text-green-400 border-green-500/20',
  Shell:      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Process:    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  SSH:        'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

function getCapabilityClasses(cap: string): string {
  return capabilityThemes[cap] ||
    'bg-accent-gold-muted text-accent-gold-light border-accent-gold/20';
}

/* -------------------------------------------------------------------------- */
/*  Status indicator dot + label                                              */
/* -------------------------------------------------------------------------- */

function StatusIndicator({ status }: { status: McpConnectionStatus }) {
  switch (status) {
    case 'connected':
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium text-emerald-400">
            Connected
          </span>
        </span>
      );
    case 'disconnected':
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="text-[11px] font-medium text-red-400">
            Disconnected
          </span>
        </span>
      );
    case 'connecting':
      return (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-400" />
          </span>
          <span className="text-[11px] font-medium text-yellow-400">
            Connecting...
          </span>
        </span>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Skeleton rows (loading state)                                             */
/* -------------------------------------------------------------------------- */

function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-lg border border-border-subtle bg-bg-card p-3.5">
      {/* Status dot */}
      <div className="h-2 w-2 rounded-full bg-bg-card-hover" />
      {/* Name */}
      <div className="h-4 w-28 rounded bg-bg-card-hover" />
      {/* Type badge */}
      <div className="ml-auto h-5 w-14 rounded-full bg-bg-card-hover" />
      {/* Capabilities */}
      <div className="hidden gap-1.5 sm:flex">
        <div className="h-5 w-12 rounded-full bg-bg-card-hover" />
        <div className="h-5 w-14 rounded-full bg-bg-card-hover" />
        <div className="h-5 w-10 rounded-full bg-bg-card-hover" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-2" role="status" aria-label="Loading MCP servers">
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <span className="sr-only">Loading MCP servers...</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

function EmptyState({ onAddServer }: { onAddServer?: () => void }) {
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
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <path d="M6 6h.01M6 18h.01" />
      </svg>
      <p className="text-sm font-medium text-text-secondary">
        No MCP servers configured
      </p>
      <p className="mt-1 text-xs text-text-muted">
        Add a server to enable MCP-powered tools and integrations.
      </p>
      {onAddServer && (
        <button
          onClick={onAddServer}
          className={cn(
            'mt-4 inline-flex items-center gap-1.5 rounded-lg',
            'border border-accent-gold/30 bg-accent-gold-muted',
            'px-4 py-2 text-xs font-semibold text-accent-gold-light',
            'transition-all duration-200',
            'hover:border-accent-gold/50 hover:bg-accent-gold/15',
            'focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add MCP Server
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Server row                                                                */
/* -------------------------------------------------------------------------- */

function ServerRow({
  server,
  isExpanded,
  onToggle,
}: {
  server: McpServer;
  index: number;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}) {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && detailsRef.current) {
      detailsRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [isExpanded]);

  return (
    <div
      role="button"
      className={cn(
        'rounded-lg border transition-all duration-200',
        'focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none',
        isExpanded
          ? 'border-accent-gold/30 bg-bg-card-hover'
          : 'border-border-subtle bg-bg-card hover:border-border-accent hover:bg-bg-card-hover',
      )}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(server.id);
        }
      }}
      onClick={() => onToggle(server.id)}
      aria-expanded={isExpanded}
      aria-label={`${server.name} — ${server.status}`}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 px-3.5 py-3">
        {/* Status dot */}
        <StatusIndicator status={server.status} />

        {/* Server name */}
        <span className="text-sm font-semibold text-text-primary">
          {server.name}
        </span>

        {/* Spacer */}
        <div className="ml-auto flex items-center gap-2">
          {/* Type badge */}
          <span
            className={cn(
              'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
              getTypeBadgeClasses(server.type),
            )}
          >
            {server.type}
          </span>

          {/* Expand/collapse chevron */}
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
            className={cn(
              'shrink-0 text-text-muted transition-transform duration-200',
              isExpanded && 'rotate-180',
            )}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Capability tags (below row, shown always) */}
      <div className="flex flex-wrap gap-1.5 px-3.5 pb-3">
        {server.capabilities.map((cap) => (
          <span
            key={cap}
            className={cn(
              'inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium',
              getCapabilityClasses(cap),
            )}
          >
            {cap}
          </span>
        ))}
      </div>

      {/* Expanded details */}
      {isExpanded && server.details && (
        <div
          ref={detailsRef}
          className="border-t border-border-subtle px-3.5 py-2.5"
        >
          <p className="text-[11px] leading-relaxed text-text-muted">
            {server.details}
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  McpIsland — default export                                                */
/* -------------------------------------------------------------------------- */

function McpIslandBody({
  servers,
  loading,
  onAddServer,
}: {
  servers: McpServer[];
  loading?: boolean;
  onAddServer?: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  /* ---------- Keyboard navigation ---------- */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (loading || servers.length === 0) return;

      switch (e.key) {
        case 'Tab': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (prev < 0) return 0;
            const next = e.shiftKey ? prev - 1 : prev + 1;
            if (next >= servers.length) return 0;
            if (next < 0) return servers.length - 1;
            return next;
          });
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= servers.length ? prev : next;
          });
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? prev : next;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < servers.length) {
            handleToggle(servers[focusedIndex].id);
          }
          break;
        }
        default:
          break;
      }
    },
    [loading, servers, focusedIndex, handleToggle],
  );

  /* Scroll focused row into view */
  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="listitem"]');
    const target = items[focusedIndex] as HTMLElement | undefined;
    target?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusedIndex]);

  // Reset focus when servers change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusedIndex(-1);
    setExpandedId(null);
  }, [servers.length]);

  /* ---------- Loading state ---------- */
  if (loading) {
    return <LoadingState />;
  }

  /* ---------- Empty state ---------- */
  if (servers.length === 0) {
    return <EmptyState onAddServer={onAddServer} />;
  }

  /* ---------- Server list ---------- */
  return (
    <div
      ref={listRef}
      role="list"
      aria-label="MCP Servers"
      className="max-h-[420px] space-y-2 overflow-y-auto pr-1 scrollbar-thin"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {servers.map((server, index) => (
        <ServerRow
          key={server.id}
          index={index}
          server={server}
          isExpanded={expandedId === server.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default function McpIsland({
  servers: externalServers,
  loading = false,
  onAddServer,
  className,
}: McpIslandProps) {
  const [localServers] = useState<McpServer[]>(DEFAULT_SERVERS);

  const servers = externalServers ?? localServers;

  return (
    <BentoCard
      title="MCP"
      description="Model Context Protocol servers"
      variant="wide"
      className={className}
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
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <path d="M6 6h.01M6 18h.01" />
        </svg>
      }
    >
      <McpIslandBody
        servers={servers}
        loading={loading}
        onAddServer={onAddServer}
      />
    </BentoCard>
  );
}
