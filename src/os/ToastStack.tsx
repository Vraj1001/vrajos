import { useEffect } from "react";
import { Info, X } from "lucide-react";
import { useDesktop, type Toast } from "./DesktopContext";

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(toast.id), 6800);
    return () => window.clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="toast" role="status">
      <span className="toast-icon" aria-hidden="true">
        <Info size={16} strokeWidth={1.8} />
      </span>
      <div className="toast-copy">
        {toast.title ? <strong>{toast.title}</strong> : null}
        <p>{toast.message}</p>
      </div>
      <button
        type="button"
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={12} strokeWidth={2} />
      </button>
    </div>
  );
}

export function ToastStack() {
  const { toasts, dismissToast } = useDesktop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
}
