'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from '@/lib/utils';

// ─── useLocalStorage ──────────────────────────────────────────────────────────
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue: T | ((v: T) => T)) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setStoredValue] as const;
}

// ─── useDebounce ──────────────────────────────────────────────────────────────
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── useAsync ─────────────────────────────────────────────────────────────────
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({ data: null, loading: true, error: null });

  useEffect(() => {
    setState(s => ({ ...s, loading: true, error: null }));
    asyncFn()
      .then(data => setState({ data, loading: false, error: null }))
      .catch(error => setState({ data: null, loading: false, error }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

// ─── useIntersection ─────────────────────────────────────────────────────────
export function useIntersection(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
}

// ─── useMediaQuery ─────────────────────────────────────────────────────────────
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// ─── usePagination ─────────────────────────────────────────────────────────────
export function usePagination(total: number, perPage = 12) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / perPage);

  const goTo = useCallback((p: number) => setPage(Math.max(1, Math.min(p, totalPages))), [totalPages]);
  const next = useCallback(() => goTo(page + 1), [page, goTo]);
  const prev = useCallback(() => goTo(page - 1), [page, goTo]);

  return { page, totalPages, goTo, next, prev, hasNext: page < totalPages, hasPrev: page > 1 };
}

// ─── useDisclosure ────────────────────────────────────────────────────────────
export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(o => !o), []);
  return { isOpen, open, close, toggle };
}

// ─── useWishlist ──────────────────────────────────────────────────────────────
export function useWishlist() {
  const [wishlist, setWishlist] = useLocalStorage<string[]>('skillforge-wishlist', []);

  const add = useCallback((courseId: string) => {
    setWishlist(prev => prev.includes(courseId) ? prev : [...prev, courseId]);
  }, [setWishlist]);

  const remove = useCallback((courseId: string) => {
    setWishlist(prev => prev.filter(id => id !== courseId));
  }, [setWishlist]);

  const toggle = useCallback((courseId: string) => {
    setWishlist(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  }, [setWishlist]);

  const has = useCallback((courseId: string) => wishlist.includes(courseId), [wishlist]);

  return { wishlist, add, remove, toggle, has, count: wishlist.length };
}

// ─── useToast ─────────────────────────────────────────────────────────────────
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

const toastListeners: ((toast: Toast) => void)[] = [];

export function toast(t: Omit<Toast, 'id'>) {
  const id = `toast_${Date.now()}`;
  toastListeners.forEach(l => l({ ...t, id }));
}

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast) => {
      setToasts(prev => [...prev, t]);
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 4000);
    };
    toastListeners.push(listener);
    return () => {
      const idx = toastListeners.indexOf(listener);
      if (idx !== -1) toastListeners.splice(idx, 1);
    };
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return { toasts, dismiss };
}
