import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  actions: ReactNode;
  onClose: () => void;
  tone?: "default" | "warning";
};

export function WindowDialog({
  title,
  icon,
  children,
  actions,
  onClose,
  tone = "default",
}: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (focusable.length === 0) return;
      const firstItem = focusable[0];
      const lastItem = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, []);

  return createPortal(
    <div className="dialog-backdrop">
      <div
        className={`os-dialog ${tone === "warning" ? "os-dialog--warning" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <div className="title-bar dialog-title-bar">
          <div className="title-bar-text" id={titleId}>
            {icon}
            <span>{title}</span>
          </div>
          <div className="title-controls">
            <button
              type="button"
              className="title-button title-button--close"
              aria-label={`Close ${title}`}
              onClick={onClose}
            >
              <svg viewBox="0 0 8 8" width="8" height="8" aria-hidden="true" shapeRendering="crispEdges">
                <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="os-dialog-body">{children}</div>
        <div className="os-dialog-actions">{actions}</div>
      </div>
    </div>,
    document.body,
  );
}
