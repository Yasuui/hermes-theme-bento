'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';
import type { DashboardState, DashboardAction, DashboardView, SlideoverContent } from '@/types';

const initialState: DashboardState = {
  sidebarOpen: true,
  slideover: null,
  activeView: 'home',
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
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
  const closeSlideover = useCallback(() => dispatch({ type: 'CLOSE_SLIDEOVER' }), []);
  const openSlideover = useCallback((content: SlideoverContent) => {
    dispatch({ type: 'OPEN_SLIDEOVER', content });
  }, []);
  const setView = useCallback((view: DashboardView) => {
    dispatch({ type: 'SET_VIEW', view });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ state, dispatch, toggleSidebar, openSlideover, closeSlideover, setView }}
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
