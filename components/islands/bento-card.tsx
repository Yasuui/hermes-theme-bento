'use client';

import { type ReactNode } from 'react';

interface BentoCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  variant?: 'default' | 'wide' | 'tall' | 'featured';
  accentColor?: string;
  className?: string;
  children?: ReactNode;
  index?: number;
}

const variantClasses: Record<string, string> = {
  default: 'col-span-1 row-span-1',
  wide: 'col-span-1 sm:col-span-2 row-span-1',
  tall: 'col-span-1 row-span-1 sm:row-span-2',
  featured: 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2',
};

export default function BentoCard({
  title,
  description,
  icon,
  variant = 'default',
  className = '',
  children,
  index = 0,
}: BentoCardProps) {
  return (
    <div
      className={`bento-card relative rounded-lg overflow-hidden
        border border-[rgba(255,230,203,0.08)]
        bg-[rgba(10,47,47,0.7)]
        backdrop-blur-xl
        transition-all duration-200 ease-out
        hover:border-[rgba(255,230,203,0.18)]
        hover:bg-[rgba(10,47,47,0.85)]
        focus-within:ring-2 focus-within:ring-[rgba(255,230,203,0.3)] focus-within:ring-inset
        animate-in fade-in
        p-3 sm:p-4
        ${variantClasses[variant]} ${className}`}
      style={{
        animationDelay: `${index * 60}ms`,
        boxShadow:
          '0 0 0 1px rgba(255,230,203,0.03), 0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,230,203,0.06)]">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-[var(--text-muted)] [&_svg]:w-4 [&_svg]:h-4" aria-hidden="true">
              {icon}
            </span>
          )}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {title}
            </p>
            {description && (
              <p className="text-xs text-[var(--text-muted)]">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      {children && <div>{children}</div>}
    </div>
  );
}

export type { BentoCardProps };
