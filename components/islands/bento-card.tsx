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
      className={`group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-card p-5
        transition-all duration-200 ease-out
        hover:border-border-accent hover:bg-bg-card-hover
        focus-within:ring-2 focus-within:ring-accent-gold focus-within:ring-inset
        animate-in fade-in
        ${variantClasses[variant]} ${className}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent-gold/40 via-accent-gold to-accent-gold/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gold-muted text-accent-gold transition-colors duration-200 group-hover:bg-accent-gold/20">
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
            {description && (
              <p className="mt-0.5 text-xs text-text-muted">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      {children && <div className="mt-2">{children}</div>}

      {/* Bottom-right corner glow on hover */}
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-accent-gold/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

export type { BentoCardProps };
