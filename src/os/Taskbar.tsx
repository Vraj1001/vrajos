import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Volume2, Wifi } from "lucide-react";
import { useDesktop } from "./DesktopContext";
import { SystemIcon } from "./SystemIcon";
import { StartMenu } from "./StartMenu";
import { useNow } from "../hooks/useEnvironment";

export function Taskbar({
  onShutDown,
}: {
  onShutDown: () => void;
}) {
  const { windows, activeId, focusWindow, minimizeWindow, minimizeAll } = useDesktop();
  const [startOpen, setStartOpen] = useState(false);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const now = useNow();

  const closeAndFocus = useCallback(() => {
    setStartOpen(false);
    startButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!startOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element;
      if (target.closest(".start-menu")) return;
      if (startButtonRef.current?.contains(target)) return;
      setStartOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [startOpen]);

  const handleWindowButton = (windowId: string, minimized: boolean) => {
    if (windowId === activeId && !minimized) {
      minimizeWindow(windowId);
      return;
    }
    focusWindow(windowId);
    window.requestAnimationFrame(() => {
      document.getElementById(`window-${windowId}`)?.focus({ preventScroll: true });
    });
  };

  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  return (
    <nav className="taskbar" aria-label="Taskbar">
      {startOpen ? (
        <StartMenu
          onClose={() => setStartOpen(false)}
          onCloseAndFocus={closeAndFocus}
          onShutDown={onShutDown}
        />
      ) : null}

      <button
        type="button"
        id="start-button"
        ref={startButtonRef}
        className={`start-button ${startOpen ? "is-open" : ""}`}
        aria-expanded={startOpen}
        aria-haspopup="dialog"
        onClick={() => setStartOpen((open) => !open)}
      >
        <span className="brand-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="start-word">Start</span>
      </button>

      <span className="taskbar-divider" aria-hidden="true" />

      <div className="taskbar-windows" aria-label="Open windows">
        {windows.map((win) => {
          const isActive = win.id === activeId && !win.minimized;
          return (
            <button
              key={win.id}
              type="button"
              className={`task-button ${isActive ? "is-active" : ""} ${win.minimized ? "is-minimized" : ""}`}
              onClick={() => handleWindowButton(win.id, win.minimized)}
              aria-label={`${win.minimized ? "Restore" : "Focus"} ${win.title}`}
              aria-pressed={isActive}
              title={win.title}
            >
              <SystemIcon name={win.icon} size={16} />
              <span className="task-button-label">{win.title}</span>
            </button>
          );
        })}
      </div>

      <div className="tray" aria-label="System tray">
        <span className="tray-icons" title="Network connected">
          <Wifi size={13} strokeWidth={2} aria-hidden="true" />
          <Volume2 size={13} strokeWidth={2} aria-hidden="true" />
        </span>
        <button
          type="button"
          className="show-desktop"
          onClick={minimizeAll}
          title="Show desktop"
          aria-label="Minimize all windows and show the desktop"
          disabled={windows.length === 0}
        >
          <Monitor size={14} strokeWidth={1.7} aria-hidden="true" />
        </button>
        <time className="clock" dateTime={now.toISOString()} title={now.toLocaleString()}>
          {time}
        </time>
      </div>
    </nav>
  );
}
