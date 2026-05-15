'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import BentoCard from './bento-card';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ProfileStatus = 'online' | 'offline' | 'busy';

export interface Profile {
  id: string;
  name: string;
  role: string;
  status: ProfileStatus;
}

export interface ProfilesIslandProps {
  profiles?: Profile[];
  onProfileChange?: (profile: Profile) => void;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*  Default sample data                                                       */
/* -------------------------------------------------------------------------- */

const DEFAULT_PROFILES: Profile[] = [
  { id: 'alice-chen', name: 'Alice Chen',     role: 'Design Lead',   status: 'online' },
  { id: 'sam-kim',    name: 'Sam Kim',        role: 'DevOps',        status: 'busy'   },
  { id: 'priya-raj',  name: 'Priya Raj',      role: 'Frontend',      status: 'online' },
  { id: 'jordan-t',   name: 'Jordan Taylor',  role: 'Backend',       status: 'offline'},
  { id: 'maya-w',     name: 'Maya Williams',  role: 'Product Owner', status: 'online' },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const STATUS_CLASS: Record<ProfileStatus, string> = {
  online:  'bg-emerald-400',
  offline: 'bg-text-muted',
  busy:    'bg-amber-400',
};

const STATUS_LABEL: Record<ProfileStatus, string> = {
  online:  'Online',
  offline: 'Offline',
  busy:    'Busy',
};

/* -------------------------------------------------------------------------- */
/*  Loading skeleton                                                          */
/* -------------------------------------------------------------------------- */

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading profiles">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div
            className="h-10 w-10 animate-pulse rounded-full bg-bg-card-hover"
            style={{ animationDelay: `${i * 150}ms` }}
          />
          <div className="flex flex-col gap-1.5">
            <div
              className="h-3.5 w-24 animate-pulse rounded bg-bg-card-hover"
              style={{ animationDelay: `${i * 150}ms` }}
            />
            <div
              className="h-3 w-16 animate-pulse rounded bg-bg-card-hover"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading profile list…</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty state                                                               */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center">
      <svg
        className="h-10 w-10 text-text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
      <p className="text-sm text-text-muted">No profiles available</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Profile row                                                               */
/* -------------------------------------------------------------------------- */

interface ProfileRowProps {
  profile: Profile;
  isActive: boolean;
  onSelect: (profile: Profile) => void;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent, profile: Profile) => void;
  rowRef?: (el: HTMLButtonElement | null) => void;
}

function ProfileRow({
  profile,
  isActive,
  onSelect,
  tabIndex,
  onKeyDown,
  rowRef,
}: ProfileRowProps) {
  return (
    <button
      ref={rowRef}
      type="button"
      role="option"
      aria-selected={isActive}
      tabIndex={tabIndex}
      className={`
        group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left
        transition-colors duration-150
        focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none
        ${isActive
          ? 'bg-accent-gold-muted'
          : 'hover:bg-bg-card-hover'
        }
      `}
      onClick={() => onSelect(profile)}
      onKeyDown={(e) => onKeyDown(e, profile)}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className={`
            flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold
            transition-colors duration-150
            ${isActive
              ? 'border-2 border-accent-gold text-accent-gold'
              : 'border-2 border-border-subtle text-text-secondary'
            }
            bg-bg-tertiary
          `}
        >
          {initials(profile.name)}
        </div>

        {/* Status dot */}
        <span
          className={`
            absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg-card
            ${STATUS_CLASS[profile.status]}
          `}
          aria-hidden="true"
        />
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`truncate text-sm font-medium ${
            isActive ? 'text-accent-gold' : 'text-text-primary'
          }`}
        >
          {profile.name}
        </span>
        <span className="truncate text-xs text-text-muted">
          {profile.role} &middot; {STATUS_LABEL[profile.status]}
        </span>
      </div>

      {/* Active check */}
      {isActive && (
        <svg
          className="h-5 w-5 shrink-0 text-accent-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  ProfilesIsland                                                             */
/* -------------------------------------------------------------------------- */

export default function ProfilesIsland({
  profiles: externalProfiles,
  onProfileChange,
  className = '',
}: ProfilesIslandProps) {
  const profiles = externalProfiles ?? DEFAULT_PROFILES;
  const [activeId, setActiveId] = useState<string>(profiles[0]?.id ?? '');
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);
  const [loading, setLoading] = useState(externalProfiles === undefined);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Simulate initial load only when using default data
  useEffect(() => {
    if (externalProfiles === undefined) {
      const timer = setTimeout(() => setLoading(false), 600);
      return () => clearTimeout(timer);
    }
    setLoading(false);
  }, [externalProfiles]);

  const handleSelect = useCallback(
    (profile: Profile) => {
      setActiveId(profile.id);
      setFocusedIdx(profiles.findIndex((p) => p.id === profile.id));
      onProfileChange?.(profile);
    },
    [profiles, onProfileChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = focusedIdx;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight': {
          e.preventDefault();
          const next = currentIndex < profiles.length - 1 ? currentIndex + 1 : 0;
          setFocusedIdx(next);
          buttonRefs.current[next]?.focus();
          break;
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          e.preventDefault();
          const prev = currentIndex > 0 ? currentIndex - 1 : profiles.length - 1;
          setFocusedIdx(prev);
          buttonRefs.current[prev]?.focus();
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (currentIndex >= 0 && currentIndex < profiles.length) {
            handleSelect(profiles[currentIndex]);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setFocusedIdx(-1);
          (e.target as HTMLElement).blur();
          break;
        }
        default:
          break;
      }
    },
    [focusedIdx, profiles, handleSelect],
  );

  /* ---- Render ---- */

  const body = loading ? (
    <LoadingSkeleton />
  ) : profiles.length === 0 ? (
    <EmptyState />
  ) : (
    <div
      className="flex flex-col gap-0.5"
      role="listbox"
      aria-label="Profile switcher"
      onKeyDown={handleKeyDown}
    >
      {profiles.map((profile, idx) => (
        <ProfileRow
          key={profile.id}
          profile={profile}
          isActive={profile.id === activeId}
          onSelect={handleSelect}
          tabIndex={focusedIdx === -1 && profile.id === activeId ? 0 : focusedIdx === idx ? 0 : -1}
          onKeyDown={handleKeyDown}
          rowRef={(el) => {
            buttonRefs.current[idx] = el;
          }}
        />
      ))}
    </div>
  );

  return (
    <BentoCard
      title="Profiles"
      description="Switch between team profiles"
      variant="default"
      className={className}
    >
      {body}
    </BentoCard>
  );
}
