import { useCallback, useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 760px)");
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timer = window.setInterval(tick, 10_000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}

export function useLocalStorage<T extends string>(
  key: string,
  fallback: T,
  allowed: readonly T[],
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored && (allowed as readonly string[]).includes(stored)) {
        return stored as T;
      }
    } catch {
      // Storage can be unavailable in private browsing. The fallback is fine.
    }
    return fallback;
  });

  const update = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(key, next);
      } catch {
        // Not being able to remember a wallpaper is not a blocking error.
      }
    },
    [key],
  );

  return [value, update];
}
