'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import BentoCard from './bento-card';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ProviderBadge {
  label: string;
  color: 'emerald' | 'purple' | 'blue' | 'orange';
}

interface ModelCapability {
  label: string;
}

interface ModelEntry {
  id: string;
  name: string;
  provider: ProviderBadge;
  contextLength: string;
  pricing: string;
  capabilities: ModelCapability[];
  favorited?: boolean;
}

export interface ModelsIslandProps {
  models?: ModelEntry[];
  loading?: boolean;
  onToggleFavorite?: (modelId: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Provider colors                                                   */
/* ------------------------------------------------------------------ */

const providerColorClasses: Record<ProviderBadge['color'], string> = {
  emerald:
    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  purple:
    'bg-purple-500/10 text-purple-400 border-purple-500/20',
  blue:
    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  orange:
    'bg-orange-500/10 text-orange-400 border-orange-500/20',
};

/* ------------------------------------------------------------------ */
/*  Default sample data                                               */
/* ------------------------------------------------------------------ */

const defaultModels: ModelEntry[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: { label: 'OpenAI', color: 'emerald' },
    contextLength: '128K tokens',
    pricing: '$2.50 / $10.00 per M tokens',
    capabilities: [
      { label: 'Vision' },
      { label: 'Function Calling' },
      { label: 'JSON Mode' },
    ],
    favorited: true,
  },
  {
    id: 'claude-4-sonnet',
    name: 'Claude 4 Sonnet',
    provider: { label: 'Anthropic', color: 'purple' },
    contextLength: '200K tokens',
    pricing: '$3.00 / $15.00 per M tokens',
    capabilities: [
      { label: 'Vision' },
      { label: 'Code' },
      { label: 'Tool Use' },
    ],
    favorited: true,
  },
  {
    id: 'gemini-2-0',
    name: 'Gemini 2.0 Flash',
    provider: { label: 'Google', color: 'blue' },
    contextLength: '1M tokens',
    pricing: '$0.10 / $0.40 per M tokens',
    capabilities: [
      { label: 'Vision' },
      { label: 'Multimodal' },
      { label: 'Code Execution' },
    ],
    favorited: false,
  },
  {
    id: 'llama-4',
    name: 'Llama 4 Scout',
    provider: { label: 'Meta', color: 'orange' },
    contextLength: '256K tokens',
    pricing: '$0.20 / $0.60 per M tokens',
    capabilities: [
      { label: 'Open Weights' },
      { label: 'Vision' },
      { label: 'Fine-tuning' },
    ],
    favorited: false,
  },
  {
    id: 'gpt-4-1-nano',
    name: 'GPT-4.1 Nano',
    provider: { label: 'OpenAI', color: 'emerald' },
    contextLength: '1M tokens',
    pricing: '$0.10 / $0.40 per M tokens',
    capabilities: [
      { label: 'Fast' },
      { label: 'Long Context' },
      { label: 'Function Calling' },
    ],
    favorited: false,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: { label: 'Anthropic', color: 'purple' },
    contextLength: '200K tokens',
    pricing: '$0.80 / $4.00 per M tokens',
    capabilities: [
      { label: 'Fast' },
      { label: 'Vision' },
      { label: 'Tool Use' },
    ],
    favorited: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Star Icon (filled vs outline)                                     */
/* ------------------------------------------------------------------ */

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className, filled ? 'text-accent-gold' : 'text-text-muted')}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton card (loading state)                                     */
/* ------------------------------------------------------------------ */

function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-xl border border-border-subtle bg-bg-card p-5">
      {/* Provider badge skeleton */}
      <div className="h-5 w-16 rounded-full bg-bg-card-hover" />
      {/* Name skeleton */}
      <div className="h-4 w-32 rounded bg-bg-card-hover" />
      {/* Context length skeleton */}
      <div className="h-3 w-24 rounded bg-bg-card-hover" />
      {/* Pricing skeleton */}
      <div className="h-3 w-40 rounded bg-bg-card-hover" />
      {/* Capabilities skeleton */}
      <div className="mt-1 flex gap-2">
        <div className="h-5 w-14 rounded-md bg-bg-card-hover" />
        <div className="h-5 w-16 rounded-md bg-bg-card-hover" />
        <div className="h-5 w-12 rounded-md bg-bg-card-hover" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty state                                                       */
/* ------------------------------------------------------------------ */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
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
        <path d="M12 2a10 10 0 1 0 10 10h-2.5a3.5 3.5 0 0 1-3.5-3.5V6A10 10 0 0 0 12 2z" />
        <path d="M21.3 12a8.5 8.5 0 0 0-8.3-8.7A8.5 8.5 0 0 0 4.04 12H8.5a3.5 3.5 0 0 1 3.5-3.5V4.04" />
      </svg>
      <p className="text-sm font-medium text-text-secondary">No models configured</p>
      <p className="mt-1 text-xs text-text-muted">
        Add an API key to start using AI models.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Model card                                                        */
/* ------------------------------------------------------------------ */

function ModelCard({
  model,
  isFocused,
  onToggleFavorite,
}: {
  model: ModelEntry;
  index: number;
  isFocused: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      role="listitem"
      className={cn(
        'flex flex-col gap-2.5 rounded-xl border p-4 transition-all duration-200',
        isFocused
          ? 'border-accent-gold/40 bg-bg-card-hover ring-2 ring-accent-gold/20'
          : 'border-border-subtle bg-bg-card hover:border-border-accent hover:bg-bg-card-hover',
      )}
    >
      {/* Top row: provider badge + favorite toggle */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
            providerColorClasses[model.provider.color],
          )}
        >
          {model.provider.label}
        </span>

        <button
          ref={btnRef}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(model.id);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(model.id);
            }
          }}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md transition-colors focus-visible:outline-none',
            model.favorited
              ? 'text-accent-gold hover:bg-accent-gold-muted'
              : 'text-text-muted hover:bg-white/5 hover:text-text-secondary',
          )}
          aria-label={model.favorited ? `Unfavorite ${model.name}` : `Favorite ${model.name}`}
          tabIndex={-1}
        >
          <StarIcon filled={!!model.favorited} />
        </button>
      </div>

      {/* Model name */}
      <h4 className="text-sm font-semibold text-text-primary">{model.name}</h4>

      {/* Context length & pricing */}
      <div className="space-y-1">
        <p className="text-[11px] text-text-muted">
          <span className="font-medium text-text-secondary">Context:</span>{' '}
          {model.contextLength}
        </p>
        <p className="text-[11px] text-text-muted">
          <span className="font-medium text-text-secondary">Pricing:</span>{' '}
          {model.pricing}
        </p>
      </div>

      {/* Capability tags */}
      <div className="mt-auto flex flex-wrap gap-1.5">
        {model.capabilities.map((cap) => (
          <span
            key={cap.label}
            className="inline-flex items-center rounded-md border border-border-subtle bg-bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-text-muted"
          >
            {cap.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ModelsIsland — default export                                     */
/* ------------------------------------------------------------------ */

function ModelCatalogBody({
  models,
  loading,
  onToggleFavorite,
}: {
  models: ModelEntry[];
  loading?: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  /* ---------- Keyboard navigation ---------- */

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (loading || models.length === 0) return;

      switch (e.key) {
        case 'Tab': {
          // Tab cycles forward, Shift+Tab cycles backward
          e.preventDefault();
          setFocusedIndex((prev) => {
            if (prev < 0) return 0;
            const next = e.shiftKey ? prev - 1 : prev + 1;
            if (next >= models.length) return 0;
            if (next < 0) return models.length - 1;
            return next;
          });
          break;
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev + 1;
            return next >= models.length ? prev : next;
          });
          break;
        }
        case 'ArrowUp':
        case 'ArrowLeft': {
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? prev : next;
          });
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < models.length) {
            onToggleFavorite(models[focusedIndex].id);
          }
          break;
        }
        default:
          break;
      }
    },
    [loading, models, focusedIndex, onToggleFavorite],
  );

  /* Scroll focused card into view */
  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;
    const cards = listRef.current.querySelectorAll('[role="listitem"]');
    const target = cards[focusedIndex] as HTMLElement | undefined;
    target?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusedIndex]);

  /* Reset focus when models change */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFocusedIndex(-1);
  }, [models.length]);

  /* ---------- Loading state ---------- */
  if (loading) {
    return (
      <div className="space-y-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  /* ---------- Empty state ---------- */
  if (models.length === 0) {
    return <EmptyState />;
  }

  /* ---------- Model list ---------- */
  return (
    <div
      ref={listRef}
      role="list"
      className="max-h-[420px] space-y-2 overflow-y-auto pr-1 scrollbar-thin"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {models.map((model, i) => (
        <ModelCard
          key={model.id}
          model={model}
          index={i}
          isFocused={i === focusedIndex}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default function ModelsIsland({
  models: externalModels,
  loading = false,
  onToggleFavorite: externalOnToggle,
  className,
}: ModelsIslandProps) {
  const [localModels, setLocalModels] = useState<ModelEntry[]>(defaultModels);

  const models = externalModels ?? localModels;
  const onToggleFavorite = useCallback(
    (id: string) => {
      if (externalOnToggle) {
        externalOnToggle(id);
      } else {
        setLocalModels((prev) =>
          prev.map((m) => (m.id === id ? { ...m, favorited: !m.favorited } : m)),
        );
      }
    },
    [externalOnToggle],
  );

  return (
    <BentoCard
      title="Models"
      description="AI model catalog"
      variant="tall"
      className={className}
    >
      <ModelCatalogBody
        models={models}
        loading={loading}
        onToggleFavorite={onToggleFavorite}
      />
    </BentoCard>
  );
}
