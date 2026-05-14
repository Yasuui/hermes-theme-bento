export type ThemeMode = 'dark' | 'light' | 'system';

export type DashboardView = 'home' | 'analytics' | 'activity' | 'settings';

export interface SidebarItem {
  id: DashboardView;
  label: string;
  icon: string;
  badge?: string | number;
}

export interface SlideoverContent {
  title: string;
  content: React.ReactNode;
}

export interface DashboardState {
  sidebarOpen: boolean;
  slideover: SlideoverContent | null;
  activeView: DashboardView;
  theme: ThemeMode;
  sidebarItems: SidebarItem[];
}

export type DashboardAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; open: boolean }
  | { type: 'OPEN_SLIDEOVER'; content: SlideoverContent }
  | { type: 'CLOSE_SLIDEOVER' }
  | { type: 'SET_VIEW'; view: DashboardView }
  | { type: 'SET_THEME'; theme: ThemeMode };

export type BentoCardVariant = 'default' | 'wide' | 'tall' | 'featured';

export interface BentoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: BentoCardVariant;
  accentColor?: string;
  className?: string;
  children?: React.ReactNode;
}
