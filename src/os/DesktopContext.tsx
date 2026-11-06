import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { appDefinitions } from "./appRegistry";
import type {
  AppId,
  Rect,
  WallpaperId,
  WindowInstance,
} from "./types";
import { useIsMobile, useLocalStorage } from "../hooks/useEnvironment";

export const TASKBAR_HEIGHT = 44;
const MIN_WINDOW_WIDTH = 340;
const MIN_WINDOW_HEIGHT = 240;

type Viewport = { width: number; height: number };

const getViewport = (): Viewport => ({
  width: window.innerWidth,
  height: Math.max(320, window.innerHeight - TASKBAR_HEIGHT),
});

const clampToViewport = (rect: Rect, viewport: Viewport): Rect => {
  const w = Math.min(Math.max(rect.w, MIN_WINDOW_WIDTH), Math.max(320, viewport.width - 16));
  const h = Math.min(Math.max(rect.h, MIN_WINDOW_HEIGHT), Math.max(240, viewport.height - 16));
  const x = Math.min(Math.max(rect.x, 8), Math.max(8, viewport.width - w - 8));
  const y = Math.min(Math.max(rect.y, 8), Math.max(8, viewport.height - h - 8));
  return { x, y, w, h };
};

const topmostVisible = (windows: WindowInstance[]): string | null => {
  const candidates = windows.filter((win) => !win.minimized);
  if (candidates.length === 0) return null;
  return candidates.reduce((top, win) => (win.z > top.z ? win : top)).id;
};

type State = {
  windows: WindowInstance[];
  activeId: string | null;
  nextZ: number;
  nextId: number;
  cascade: number;
};

type OpenPayload = {
  appId: AppId;
  payload?: string;
  title?: string;
  viewport: Viewport;
  mobile: boolean;
};

type Action =
  | { type: "open"; data: OpenPayload }
  | { type: "focus"; id: string }
  | { type: "close"; id: string }
  | { type: "minimize"; id: string }
  | { type: "minimize-all" }
  | { type: "toggle-maximize"; id: string; viewport: Viewport; mobile: boolean }
  | { type: "move"; id: string; rect: Rect }
  | { type: "resize"; id: string; rect: Rect }
  | { type: "reconcile"; viewport: Viewport; mobile: boolean }
  | { type: "close-all" };

const initialState: State = {
  windows: [],
  activeId: null,
  nextZ: 10,
  nextId: 1,
  cascade: 0,
};

const focusById = (state: State, id: string): State => {
  const nextZ = state.nextZ + 1;
  return {
    ...state,
    activeId: id,
    nextZ,
    windows: state.windows.map((win) =>
      win.id === id ? { ...win, z: nextZ, minimized: false } : win,
    ),
  };
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      const { appId, payload, viewport, mobile } = action.data;
      const definition = appDefinitions[appId];

      if (definition.singleton) {
        const existing = state.windows.find(
          (win) => win.appId === appId && (win.payload ?? "") === (payload ?? ""),
        );
        if (existing) {
          return focusById(state, existing.id);
        }
      }

      const rawWidth = mobile ? viewport.width : Math.min(definition.width, viewport.width - 40);
      const rawHeight = mobile ? viewport.height : Math.min(definition.height, viewport.height - 40);
      const offset = (state.cascade % 6) * 24;
      const rect = mobile
        ? { x: 0, y: 0, w: viewport.width, h: viewport.height }
        : clampToViewport(
            {
              x: (viewport.width - rawWidth) / 2 - 60 + offset,
              y: (viewport.height - rawHeight) / 2 - 48 + offset,
              w: rawWidth,
              h: rawHeight,
            },
            viewport,
          );

      const title =
        action.data.title ??
        (definition.singleton
          ? definition.title
          : `${definition.title} ${state.windows.filter((win) => win.appId === appId).length + 1}`);

      const windowInstance: WindowInstance = {
        id: `win-${state.nextId}`,
        appId,
        payload,
        title,
        icon: definition.icon,
        ...rect,
        z: state.nextZ + 1,
        minimized: false,
        maximized: mobile,
        previousRect: null,
      };

      return {
        ...state,
        windows: [...state.windows, windowInstance],
        activeId: windowInstance.id,
        nextZ: state.nextZ + 1,
        nextId: state.nextId + 1,
        cascade: state.cascade + 1,
      };
    }

    case "focus": {
      if (state.activeId === action.id) {
        const isMinimized = state.windows.find((win) => win.id === action.id)?.minimized;
        if (!isMinimized) return state;
      }
      return focusById(state, action.id);
    }

    case "close": {
      const remaining = state.windows.filter((win) => win.id !== action.id);
      return {
        ...state,
        windows: remaining,
        activeId:
          state.activeId === action.id ? topmostVisible(remaining) : state.activeId,
      };
    }

    case "minimize": {
      const remaining = state.windows.map((win) =>
        win.id === action.id ? { ...win, minimized: true } : win,
      );
      return {
        ...state,
        windows: remaining,
        activeId: state.activeId === action.id ? topmostVisible(remaining) : state.activeId,
      };
    }

    case "minimize-all": {
      return {
        ...state,
        windows: state.windows.map((win) => ({ ...win, minimized: true })),
        activeId: null,
      };
    }

    case "toggle-maximize": {
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id !== action.id) return win;
          if (action.mobile) return win;
          if (win.maximized) {
            const previous = win.previousRect ?? {
              x: 40,
              y: 40,
              w: appDefinitions[win.appId].width,
              h: appDefinitions[win.appId].height,
            };
            const restored = clampToViewport(previous, action.viewport);
            return { ...win, ...restored, maximized: false, previousRect: null };
          }
          return {
            ...win,
            previousRect: { x: win.x, y: win.y, w: win.w, h: win.h },
            maximized: true,
          };
        }),
      };
    }

    case "move": {
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.id ? { ...win, ...action.rect } : win,
        ),
      };
    }

    case "resize": {
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.id ? { ...win, ...action.rect } : win,
        ),
      };
    }

    case "reconcile": {
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (action.mobile) return { ...win, maximized: true };
          if (win.maximized) return win;
          return { ...win, ...clampToViewport(win, action.viewport) };
        }),
      };
    }

    case "close-all":
      return { ...state, windows: [], activeId: null };

    default:
      return state;
  }
}

export type Toast = { id: number; message: string; title?: string };

type DesktopContextValue = {
  windows: WindowInstance[];
  activeId: string | null;
  openApp: (appId: AppId, payload?: string, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  minimizeAll: () => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, rect: Rect) => void;
  resizeWindow: (id: string, rect: Rect) => void;
  closeAll: () => void;
  wallpaper: WallpaperId;
  setWallpaper: (wallpaper: WallpaperId) => void;
  binEmptied: boolean;
  emptyBin: () => void;
  restoreBin: () => void;
  toasts: Toast[];
  notify: (message: string, title?: string) => void;
  dismissToast: (id: number) => void;
  isMobile: boolean;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMobile = useIsMobile();
  const [wallpaper, setWallpaper] = useLocalStorage<WallpaperId>(
    "vrajos:wallpaper",
    "teal",
    ["teal", "dusk", "slate"],
  );
  const [binEmptied, setBinEmptied] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    const onResize = () => {
      dispatch({
        type: "reconcile",
        viewport: getViewport(),
        mobile: window.matchMedia("(max-width: 760px)").matches,
      });
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openApp = useCallback(
    (appId: AppId, payload?: string, title?: string) => {
      dispatch({
        type: "open",
        data: {
          appId,
          payload,
          title,
          viewport: getViewport(),
          mobile: window.matchMedia("(max-width: 760px)").matches,
        },
      });
    },
    [],
  );

  const closeWindow = useCallback((id: string) => dispatch({ type: "close", id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: "minimize", id }), []);
  const minimizeAll = useCallback(() => dispatch({ type: "minimize-all" }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: "focus", id }), []);
  const closeAll = useCallback(() => dispatch({ type: "close-all" }), []);
  const moveWindow = useCallback(
    (id: string, rect: Rect) => dispatch({ type: "move", id, rect }),
    [],
  );
  const resizeWindow = useCallback(
    (id: string, rect: Rect) => dispatch({ type: "resize", id, rect }),
    [],
  );
  const toggleMaximize = useCallback(
    (id: string) =>
      dispatch({
        type: "toggle-maximize",
        id,
        viewport: getViewport(),
        mobile: window.matchMedia("(max-width: 760px)").matches,
      }),
    [],
  );

  const notify = useCallback((message: string, title?: string) => {
    const id = ++toastId.current;
    setToasts((current) => [...current.slice(-2), { id, message, title }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const emptyBin = useCallback(() => setBinEmptied(true), []);
  const restoreBin = useCallback(() => setBinEmptied(false), []);

  const value = useMemo<DesktopContextValue>(
    () => ({
      windows: state.windows,
      activeId: state.activeId,
      openApp,
      closeWindow,
      minimizeWindow,
      minimizeAll,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      closeAll,
      wallpaper,
      setWallpaper,
      binEmptied,
      emptyBin,
      restoreBin,
      toasts,
      notify,
      dismissToast,
      isMobile,
    }),
    [
      state.windows,
      state.activeId,
      openApp,
      closeWindow,
      minimizeWindow,
      minimizeAll,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      closeAll,
      wallpaper,
      setWallpaper,
      binEmptied,
      emptyBin,
      restoreBin,
      toasts,
      notify,
      dismissToast,
      isMobile,
    ],
  );

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}

export function useDesktop(): DesktopContextValue {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used inside a DesktopProvider");
  }
  return context;
}

export function useWindowInstance(id: string): WindowInstance | undefined {
  const { windows } = useDesktop();
  return windows.find((win) => win.id === id);
}
