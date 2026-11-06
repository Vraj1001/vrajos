import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useDesktop, useWindowInstance } from "./DesktopContext";
import { SystemIcon } from "./SystemIcon";
import { binHint } from "../content/recycleBin";

type MenuItem = { label: string; action: () => void; shortcut?: string };

export function AppShell({
  windowId,
  children,
  className = "",
}: {
  windowId: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`app-shell ${className}`}>
      <AppMenu windowId={windowId} />
      {children}
    </div>
  );
}

export function AppMenu({ windowId }: { windowId: string }) {
  const { closeWindow, minimizeWindow, toggleMaximize, openApp, notify } = useDesktop();
  const win = useWindowInstance(windowId);
  const [open, setOpen] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const closeMenu = useCallback((returnFocus = false) => {
    if (returnFocus && open) {
      buttonRefs.current[open]?.focus();
    }
    setOpen(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) {
        setOpen(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLButtonElement>("[role='menuitem']");
    first?.focus();
  }, [open]);

  useEffect(() => {
    if (!win) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.stopPropagation();
        closeMenu(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeMenu, win]);

  if (!win) return null;

  const menus: Record<string, MenuItem[]> = {
    File: [
      {
        label: "Close window",
        action: () => closeWindow(windowId),
      },
      {
        label: "Open about_me.txt",
        action: () => openApp("about"),
      },
    ],
    View: [
      { label: "Minimize", action: () => minimizeWindow(windowId) },
      {
        label: win.maximized ? "Restore" : "Maximize",
        action: () => toggleMaximize(windowId),
      },
    ],
    Help: [
      {
        label: "Keyboard shortcuts",
        action: () =>
          notify(
            "Tab moves between controls. Enter opens icons. Esc closes menus. Double-click a desktop icon to open it.",
            "Keyboard shortcuts",
          ),
      },
      {
        label: "Recycle Bin hint",
        action: () => notify(binHint, "A small hint"),
      },
      {
        label: "About VrajOS",
        action: () => openApp("about"),
      },
    ],
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>("[role='menuitem']") ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const keys = Object.keys(menus);
      const nextIndex =
        (keys.indexOf(open) + (event.key === "ArrowRight" ? 1 : -1) + keys.length) %
        keys.length;
      setOpen(keys[nextIndex]);
     } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    }
  };

  return (
    <div className="menu-bar" ref={barRef} role="menubar" aria-label={`${win.title} menu`}>
      <div className="menu-brand">
        <SystemIcon name={win.icon} size={14} />
      </div>
      {Object.keys(menus).map((label) => (
        <div className="menu" key={label}>
          <button
            type="button"
            ref={(node) => {
              buttonRefs.current[label] = node;
            }}
            className={`menu-button ${open === label ? "is-open" : ""}`}
            aria-haspopup="menu"
            aria-expanded={open === label}
            onClick={() => setOpen((current) => (current === label ? null : label))}
            onPointerEnter={() => {
              if (open) setOpen(label);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpen(label);
              }
            }}
          >
            {label}
          </button>
          {open === label ? (
            <div
              className="menu-dropdown"
              role="menu"
              aria-label={label}
              ref={menuRef}
              onKeyDown={handleMenuKeyDown}
            >
              {menus[label].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  role="menuitem"
                  className="menu-item"
                  onClick={() => {
                    setOpen(null);
                    item.action();
                  }}
                >
                  <span>{item.label}</span>
                  {item.shortcut ? <span className="menu-shortcut">{item.shortcut}</span> : null}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}
      <div className="menu-spacer" />
      <span className="menu-version">VrajOS</span>
    </div>
  );
}

export function ToolbarButton({
  children,
  onClick,
  title,
  active = false,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  title: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className={`tool-button ${active ? "is-active" : ""}`}
      onClick={onClick}
      title={title}
      aria-label={title}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function StatusBar({
  left,
  right,
}: {
  left: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="status-bar">
      <span className="status-panel status-panel--grow">{left}</span>
      {right ? <span className="status-panel">{right}</span> : null}
    </div>
  );
}

export function AddressBar({ path, children }: { path: string; children?: ReactNode }) {
  return (
    <div className="address-bar">
      <span className="address-label">Address</span>
      <div className="address-field">
        <SystemIcon name="folder" size={14} />
        <span>{path}</span>
      </div>
      {children}
    </div>
  );
}
