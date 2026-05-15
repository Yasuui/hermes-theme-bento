'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { DashboardState, DashboardAction, DashboardView, SlideoverContent, ThemeMode } from '@/types';

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(mode: ThemeMode): 'dark' | 'light' {
  if (mode === 'system') return getSystemTheme();
  return mode;
}

const STORAGE_KEY = 'bento-theme';

const initialState: DashboardState = {
  sidebarOpen: true,
  slideover: null,
  activeView: 'home',
  theme: 'dark',
  sidebarItems: [
    { id: 'home', label: 'Overview', icon: 'layout-dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'bar-chart-3' },
    { id: 'activity', label: 'Activity', icon: 'activity' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ],
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.open };
    case 'OPEN_SLIDEOVER':
      return { ...state, slideover: action.content };
    case 'CLOSE_SLIDEOVER':
      return { ...state, slideover: null };
    case 'SET_VIEW':
      return { ...state, activeView: action.view };
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

interface DashboardContextValue {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  toggleSidebar: () => void;
  openSlideover: (content: SlideoverContent) => void;
  closeSlideover: () => void;
  setView: (view: DashboardView) => void;
  setTheme: (theme: ThemeMode) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Restore saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved && saved !== state.theme) {
      dispatch({ type: 'SET_THEME', theme: saved });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Apply theme class to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    const resolved = resolveTheme(state.theme);
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    localStorage.setItem(STORAGE_KEY, state.theme);
  }, [state.theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (state.theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(getSystemTheme());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [state.theme]);

  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
  const closeSlideover = useCallback(() => dispatch({ type: 'CLOSE_SLIDEOVER' }), []);
  const openSlideover = useCallback((content: SlideoverContent) => {
    dispatch({ type: 'OPEN_SLIDEOVER', content });
  }, []);
  const setView = useCallback((view: DashboardView) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);
  const setTheme = useCallback((theme: ThemeMode) => {
    dispatch({ type: 'SET_THEME', theme });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ state, dispatch, toggleSidebar, openSlideover, closeSlideover, setView, setTheme }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
