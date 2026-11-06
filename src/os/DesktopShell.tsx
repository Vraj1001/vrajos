import { useEffect, useState } from "react";
import { Desktop } from "./Desktop";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { ToastStack } from "./ToastStack";
import { ShutdownDialog, ShutdownScreen } from "./Shutdown";
import { useDesktop } from "./DesktopContext";

export function DesktopShell({
  onPowerOff,
  onRestart,
}: {
  onPowerOff: () => void;
  onRestart: () => void;
}) {
  const { windows, wallpaper, notify } = useDesktop();
  const [shutdownOpen, setShutdownOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      notify(
        "Welcome to VrajOS. Double-click an icon to open a window. The Recycle Bin is worth a look.",
        "Welcome",
      );
    }, 900);
    return () => window.clearTimeout(timer);
  }, [notify]);

  return (
    <main className={`os-shell wallpaper-${wallpaper}`} data-wallpaper={wallpaper}>
      <a className="skip-link" href="#desktop-apps">
        Skip to desktop apps
      </a>
      <Desktop />
      <div className="window-layer">
        {windows.map((win) => (
          <Window key={win.id} win={win} />
        ))}
      </div>
      <Taskbar onShutDown={() => setShutdownOpen(true)} />
      <ToastStack />
      {shutdownOpen ? (
        <ShutdownDialog
          onClose={() => setShutdownOpen(false)}
          onChoose={(choice) => {
            setShutdownOpen(false);
            if (choice === "restart") {
              onRestart();
            } else {
              onPowerOff();
            }
          }}
        />
      ) : null}
    </main>
  );
}

export function ShutdownFlow({ onRestart }: { onRestart: () => void }) {
  return <ShutdownScreen onRestart={onRestart} />;
}
