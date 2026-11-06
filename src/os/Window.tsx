import { useCallback, useEffect, useRef, useState } from "react";
import type { WindowInstance } from "./types";
import { SystemIcon } from "./SystemIcon";
import { AppSurface } from "./AppSurface";
import { TASKBAR_HEIGHT, useDesktop } from "./DesktopContext";
import { useIsMobile } from "../hooks/useEnvironment";

const MIN_WIDTH = 340;
const MIN_HEIGHT = 240;

function MinimizeGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="1" y="5" width="6" height="2" fill="currentColor" />
    </svg>
  );
}

function MaximizeGlyph({ restore }: { restore: boolean }) {
  return (
    <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true" shapeRendering="crispEdges">
      {restore ? (
        <>
          <path d="M0 2h2V0h6v6H6v2H0z" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M2 2h4v4H2z" fill="none" stroke="currentColor" strokeWidth="1" />
        </>
      ) : (
        <>
          <rect x="0.5" y="1.5" width="7" height="6" fill="none" stroke="currentColor" />
          <rect x="0.5" y="1.5" width="7" height="1" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Window({ win }: { win: WindowInstance }) {
  const {
    activeId,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useDesktop();

  const isMobile = useIsMobile();
  const isFocused = activeId === win.id;
  const windowRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ w: win.w, h: win.h });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragState = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const resizeState = useRef<{ pointerId: number; startX: number; startY: number; originW: number; originH: number } | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    setPosition({ x: win.x, y: win.y });
  }, [win.x, win.y]);

  useEffect(() => {
    setSize({ w: win.w, h: win.h });
  }, [win.w, win.h]);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (isFocused) {
      windowRef.current?.focus({ preventScroll: true });
    }
  }, [isFocused]);

  const beginDrag = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return;
      focusWindow(win.id);
      if (isMobile || win.maximized) return;
      if ((event.target as HTMLElement).closest("button")) return;
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      dragState.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: position.x,
        originY: position.y,
      };
      setDragging(true);
    },
    [focusWindow, isMobile, position.x, position.y, win.id, win.maximized],
  );

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const desktopHeight = window.innerHeight - TASKBAR_HEIGHT;
    const nextX = Math.min(
      window.innerWidth - 140,
      Math.max(140 - size.w, drag.originX + event.clientX - drag.startX),
    );
    const nextY = Math.min(
      desktopHeight - 34,
      Math.max(0, drag.originY + event.clientY - drag.startY),
    );
    setPosition({ x: nextX, y: nextY });
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag) return;
    dragState.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    moveWindow(win.id, { ...position, w: size.w, h: size.h });
  };

  const beginResize = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    focusWindow(win.id);
    event.currentTarget.setPointerCapture(event.pointerId);
    resizeState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originW: size.w,
      originH: size.h,
    };
    setResizing(true);
  };

  const handleResizeMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const resize = resizeState.current;
    if (!resize || resize.pointerId !== event.pointerId) return;
    const maxW = window.innerWidth - position.x - 8;
    const maxH = window.innerHeight - TASKBAR_HEIGHT - position.y - 8;
    setSize({
      w: Math.max(MIN_WIDTH, Math.min(maxW, resize.originW + event.clientX - resize.startX)),
      h: Math.max(MIN_HEIGHT, Math.min(maxH, resize.originH + event.clientY - resize.startY)),
    });
  };

  const endResize = (event: React.PointerEvent<HTMLDivElement>) => {
    const resize = resizeState.current;
    if (!resize) return;
    resizeState.current = null;
    setResizing(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resizeWindow(win.id, { ...position, w: size.w, h: size.h });
  };

  const style = isMobile
    ? undefined
    : win.maximized
      ? { left: 0, top: 0, width: "100%", height: "100%", zIndex: win.z }
      : {
          left: position.x,
          top: position.y,
          width: size.w,
          height: size.h,
          zIndex: win.z,
        };

  return (
    <section
      ref={windowRef}
      id={`window-${win.id}`}
      className={[
        "window",
        isFocused ? "is-focused" : "is-inactive",
        win.minimized ? "is-minimized" : "",
        win.maximized ? "is-maximized" : "",
        dragging ? "is-dragging" : "",
        resizing ? "is-resizing" : "",
        isMobile ? "is-mobile-window" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      role="dialog"
      aria-label={win.title}
      aria-modal={false}
      tabIndex={-1}
      data-app={win.appId}
      data-focused={isFocused}
      data-minimized={win.minimized}
      onPointerDown={() => {
        if (!isFocused) focusWindow(win.id);
      }}
    >
      <div
        className="title-bar"
        ref={titleRef}
        onPointerDown={beginDrag}
        onPointerMove={handleDragMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => {
          if (!isMobile) toggleMaximize(win.id);
        }}
      >
        <div className="title-bar-text">
          <SystemIcon name={win.icon} size={16} />
          <span>{win.title}</span>
        </div>
        <div
          className="title-controls"
          onPointerDown={(event) => {
            event.stopPropagation();
            focusWindow(win.id);
          }}
        >
          <button
            type="button"
            className="title-button"
            aria-label={`Minimize ${win.title}`}
            onClick={() => minimizeWindow(win.id)}
          >
            <MinimizeGlyph />
          </button>
          <button
            type="button"
            className="title-button"
            aria-label={win.maximized ? `Restore ${win.title}` : `Maximize ${win.title}`}
            onClick={() => toggleMaximize(win.id)}
          >
            <MaximizeGlyph restore={win.maximized} />
          </button>
          <button
            type="button"
            className="title-button title-button--close"
            aria-label={`Close ${win.title}`}
            onClick={() => closeWindow(win.id)}
          >
            <CloseGlyph />
          </button>
        </div>
      </div>

      <div className="window-body">
        <AppSurface win={win} />
      </div>

      {!win.maximized && !isMobile ? (
        <div
          className="window-resizer"
          role="presentation"
          title="Resize window"
          onPointerDown={beginResize}
          onPointerMove={handleResizeMove}
          onPointerUp={endResize}
          onPointerCancel={endResize}
        >
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
            <path d="M11 1L1 11M11 5L5 11M11 9L9 11" stroke="#5a5a54" strokeWidth="1" />
          </svg>
        </div>
      ) : null}
    </section>
  );
}
