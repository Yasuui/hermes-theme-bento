'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import BentoCard from '@/components/islands/bento-card';

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  installed: boolean;
}

interface SkillsIslandProps {
  skills?: Skill[];
  error?: string;
  className?: string;
}

const CATEGORIES = ['All', 'Coding', 'Writing', 'Research', 'Data'] as const;

const DEFAULT_SKILLS: Skill[] = [
  {
    id: 'python-dev',
    name: 'Python Dev',
    description:
      'Python development environment with linting, testing, and packaging tools pre-configured for rapid development.',
    category: 'Coding',
    installed: true,
  },
  {
    id: 'react-dev',
    name: 'React Dev',
    description:
      'React development setup with JSX, hooks, and component patterns for building modern web interfaces.',
    category: 'Coding',
    installed: true,
  },
  {
    id: 'technical-writing',
    name: 'Technical Writing',
    description:
      'Documentation and technical writing tools supporting markdown, diagrams, and API reference generation.',
    category: 'Writing',
    installed: false,
  },
  {
    id: 'academic-research',
    name: 'Academic Research',
    description:
      'Research tools for literature review, citation management, and paper discovery across academic databases.',
    category: 'Research',
    installed: false,
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description:
      'Data analysis toolkit with pandas, numpy, visualization libraries, and Jupyter notebook integration.',
    category: 'Data',
    installed: true,
  },
  {
    id: 'api-development',
    name: 'API Development',
    description:
      'REST and GraphQL API development tools including request builders, schema viewers, and mock servers.',
    category: 'Coding',
    installed: false,
  },
  {
    id: 'content-strategy',
    name: 'Content Strategy',
    description:
      'Content planning and SEO optimization tools for creating effective, search-engine-optimized content.',
    category: 'Writing',
    installed: false,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    description:
      'ML toolkit with model training, evaluation, and deployment pipelines for production AI systems.',
    category: 'Data',
    installed: true,
  },
];

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-border-subtle bg-bg-card p-4">
      <div className="mb-3 h-4 w-2/3 rounded bg-bg-card-hover" />
      <div className="mb-2 h-3 w-full rounded bg-bg-card-hover" />
      <div className="mb-4 h-3 w-4/5 rounded bg-bg-card-hover" />
      <div className="flex items-center gap-2">
        <div className="h-5 w-16 rounded-full bg-bg-card-hover" />
        <div className="h-5 w-20 rounded-full bg-bg-card-hover" />
      </div>
    </div>
  );
}

export default function SkillsIsland({
  skills = DEFAULT_SKILLS,
  error,
  className = '',
}: SkillsIslandProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const handleFilterSelect = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  const handleFilterKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, category: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleFilterSelect(category);
      }
    },
    [handleFilterSelect],
  );

  const handleGridKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!gridRef.current) return;

      const cards =
        gridRef.current.querySelectorAll<HTMLButtonElement>('[role="option"]');
      if (cards.length === 0) return;

      const currentIndex = Array.from(cards).findIndex(
        (card) => card === document.activeElement,
      );

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % cards.length;
          cards[nextIndex]?.focus();
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          const prevIndex =
            (currentIndex - 1 + cards.length) % cards.length;
          cards[prevIndex]?.focus();
          break;
        }
        case 'Home': {
          e.preventDefault();
          cards[0]?.focus();
          break;
        }
        case 'End': {
          e.preventDefault();
          cards[cards.length - 1]?.focus();
          break;
        }
      }
    },
    [],
  );

  return (
    <BentoCard
      title="Skills"
      description="Manage your installed skills and tools"
      variant="featured"
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      }
    >
      <div className="space-y-4">
        {/* Category filter row */}
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Skill categories"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => handleFilterSelect(category)}
              onKeyDown={(e) => handleFilterKeyDown(e, category)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none ${
                activeCategory === category
                  ? 'border border-accent-gold/30 bg-accent-gold-muted text-accent-gold-light'
                  : 'border border-border-subtle bg-transparent text-text-muted hover:border-border-accent hover:text-text-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content states */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-3 text-red-400"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-3 text-text-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p className="text-sm text-text-muted">
              No skills found for this category
            </p>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3"
            role="listbox"
            aria-label="Available skills"
            onKeyDown={handleGridKeyDown}
          >
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                role="option"
                aria-selected={false}
                aria-label={`${skill.name} - ${skill.installed ? 'Installed' : 'Not Installed'}`}
                tabIndex={0}
                className="group relative flex flex-col gap-2 rounded-lg border border-border-subtle bg-bg-card p-3.5 text-left transition-all duration-200 hover:border-border-accent hover:bg-bg-card-hover focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:outline-none"
              >
                {/* Name + install badge */}
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-text-primary">
                    {skill.name}
                  </h4>
                  {skill.installed ? (
                    <span className="shrink-0 rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Installed
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-border-subtle bg-transparent px-2 py-0.5 text-[10px] font-medium text-text-muted">
                      Not Installed
                    </span>
                  )}
                </div>

                {/* Description — 2-line truncate */}
                <p className="line-clamp-2 text-xs leading-relaxed text-text-muted">
                  {skill.description}
                </p>

                {/* Category tag pill */}
                <div className="mt-auto pt-1">
                  <span className="inline-flex rounded-full bg-accent-gold-muted px-2 py-0.5 text-[10px] font-medium text-accent-gold-light">
                    {skill.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </BentoCard>
  );
}
