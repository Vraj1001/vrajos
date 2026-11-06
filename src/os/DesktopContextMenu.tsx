import { useEffect, useRef } from "react";
import { Check, Monitor, TerminalSquare, RefreshCw, Info } from "lucide-react";
import { useDesktop } from "./DesktopContext";
import type { WallpaperId } from "./types";

const wallpapers: { id: WallpaperId; label: string }[] = [
  { id: "teal", label: "Classic teal" },
  { id: "dusk", label: "Deep dusk" },
  { id: "slate", label: "Blueprint" },
];

export function DesktopContextMenu({
  x,
  y,
  onClose,
}: {
  x: number;
  y: number;
  onClose: () => void;
}) {
  const { wallpaper, setWallpaper, openApp, notify } = useDesktop();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = menuRef.current?.querySelector<HTMLButtonElement>("[role^='menuitem']");
    first?.focus();

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const items = Array.from(
        menuRef.current?.querySelectorAll<HTMLButtonElement>("[role^='menuitem']") ?? [],
      );
      const index = items.indexOf(document.activeElement as HTMLButtonElement);
      event.preventDefault();
      items[(index + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const left = Math.max(8, Math.min(x, window.innerWidth - 248));
  const top = Math.max(8, Math.min(y, window.innerHeight - 390));

  const item = (label: string, action: () => void, icon: React.ReactNode) => (
    <button
      type="button"
      role="menuitem"
      className="context-item"
      onClick={() => {
        onClose();
        action();
      }}
    >
      <span className="context-icon" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div
      className="context-menu"
      role="menu"
      aria-label="Desktop menu"
      ref={menuRef}
      style={{ left, top }}
      onPointerDown={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      {item("Open Terminal", () => openApp("terminal"), <TerminalSquare size={15} strokeWidth={1.6} />)}
      {item("My Computer", () => openApp("computer"), <Monitor size={15} strokeWidth={1.6} />)}
      {item("Display Properties", () => openApp("display"), <Monitor size={15} strokeWidth={1.6} />)}
      <div className="context-separator" />
      <p className="context-heading">Desktop wallpaper</p>
      {wallpapers.map((option) => (
        <button
          key={option.id}
          type="button"
          role="menuitemradio"
          aria-checked={wallpaper === option.id}
          className={`context-item context-item--check ${wallpaper === option.id ? "is-checked" : ""}`}
          onClick={() => {
            setWallpaper(option.id);
            onClose();
          }}
        >
          <span className="context-check" aria-hidden="true">
            {wallpaper === option.id ? <Check size={13} strokeWidth={2.4} /> : null}
          </span>
          <span>{option.label}</span>
        </button>
      ))}
      <div className="context-separator" />
      {item(
        "Refresh desktop",
        () => notify("Desktop refreshed. It looks exactly the same, which is the point.", "Nothing changed"),
        <RefreshCw size={15} strokeWidth={1.6} />,
      )}
      {item(
        "About VrajOS",
        () => openApp("about"),
        <Info size={15} strokeWidth={1.6} />,
      )}
    </div>
  );
}
