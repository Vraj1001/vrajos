import { useCallback, useState } from "react";
import { BootScreen } from "./os/BootScreen";
import { DesktopProvider } from "./os/DesktopContext";
import { DesktopShell, ShutdownFlow } from "./os/DesktopShell";

type Phase = "boot" | "desktop" | "off";

export default function App() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [session, setSession] = useState(0);

  const handleBootDone = useCallback(() => setPhase("desktop"), []);
  const handlePowerOff = useCallback(() => setPhase("off"), []);
  const handleRestart = useCallback(() => {
    setSession((current) => current + 1);
    setPhase("boot");
  }, []);

  return (
    <>
      {phase === "boot" ? <BootScreen key={`boot-${session}`} onDone={handleBootDone} /> : null}
      {phase === "desktop" ? (
        <DesktopProvider key={`desktop-${session}`}>
          <DesktopShell onPowerOff={handlePowerOff} onRestart={handleRestart} />
        </DesktopProvider>
      ) : null}
      {phase === "off" ? <ShutdownFlow onRestart={handleRestart} /> : null}
    </>
  );
}
