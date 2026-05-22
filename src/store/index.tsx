'use client';

import { createContext, useContext, useReducer, type Dispatch } from 'react';
import type { User } from '@/types';
import { mockCurrentUser } from '@/lib/mock-data';

// ─── State ────────────────────────────────────────────────────────────────────
interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  sidebarCollapsed: boolean;
  wishlistIds: string[];
  cartIds: string[];
}

const initialState: AppState = {
  user: mockCurrentUser, // Pre-populated with mock user
  isAuthenticated: true,
  sidebarCollapsed: false,
  wishlistIds: [],
  cartIds: [],
};

// ─── Actions ──────────────────────────────────────────────────────────────────
type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SIGN_OUT' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'ADD_TO_CART'; payload: string }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload };
    case 'SIGN_OUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case 'TOGGLE_WISHLIST':
      return {
        ...state,
        wishlistIds: state.wishlistIds.includes(action.payload)
          ? state.wishlistIds.filter(id => id !== action.payload)
          : [...state.wishlistIds, action.payload],
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartIds: state.cartIds.includes(action.payload)
          ? state.cartIds
          : [...state.cartIds, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return { ...state, cartIds: state.cartIds.filter(id => id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cartIds: [] };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const StoreContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}

// ─── Selectors & Action creators ──────────────────────────────────────────────
export function useAuth() {
  const { state, dispatch } = useStore();
  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    signOut: () => dispatch({ type: 'SIGN_OUT' }),
    setUser: (user: User | null) => dispatch({ type: 'SET_USER', payload: user }),
  };
}

export function useWishlistStore() {
  const { state, dispatch } = useStore();
  return {
    wishlistIds: state.wishlistIds,
    toggle: (id: string) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id }),
    has: (id: string) => state.wishlistIds.includes(id),
    count: state.wishlistIds.length,
  };
}

export function useCart() {
  const { state, dispatch } = useStore();
  return {
    cartIds: state.cartIds,
    add: (id: string) => dispatch({ type: 'ADD_TO_CART', payload: id }),
    remove: (id: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: id }),
    clear: () => dispatch({ type: 'CLEAR_CART' }),
    has: (id: string) => state.cartIds.includes(id),
    count: state.cartIds.length,
  };
}
