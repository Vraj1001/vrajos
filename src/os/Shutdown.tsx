import { useEffect, useRef, useState } from "react";
import { Power } from "lucide-react";
import { WindowDialog } from "./WindowDialog";
import { SystemIcon } from "./SystemIcon";
import { usePrefersReducedMotion } from "../hooks/useEnvironment";

type PowerChoice = "shutdown" | "restart";

export function ShutdownDialog({
  onClose,
  onChoose,
}: {
  onClose: () => void;
  onChoose: (choice: PowerChoice) => void;
}) {
  const [choice, setChoice] = useState<PowerChoice>("shutdown");

  return (
    <WindowDialog
      title="Shut Down VrajOS"
      icon={<SystemIcon name="computer" size={18} />}
      onClose={onClose}
      actions={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn--primary" onClick={() => onChoose(choice)}>
            OK
          </button>
        </>
      }
    >
      <div className="shutdown-dialog">
        <div className="shutdown-graphic" aria-hidden="true">
          <Power size={40} strokeWidth={1.3} />
        </div>
        <fieldset>
          <legend>What do you want the computer to do?</legend>
          <label className="radio-row">
            <input
              type="radio"
              name="power-choice"
              value="shutdown"
              checked={choice === "shutdown"}
              onChange={() => setChoice("shutdown")}
            />
            <span>
              <strong>Shut down</strong>
              <small>Take a break. The desktop will be waiting when you come back.</small>
            </span>
          </label>
          <label className="radio-row">
            <input
              type="radio"
              name="power-choice"
              value="restart"
              checked={choice === "restart"}
              onChange={() => setChoice("restart")}
            />
            <span>
              <strong>Restart</strong>
              <small>Reboot from the boot screen with a fresh desktop.</small>
            </span>
          </label>
        </fieldset>
      </div>
    </WindowDialog>
  );
}

export function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"saving" | "off">(reducedMotion ? "off" : "saving");
  const powerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(() => setPhase("off"), 1500);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (phase === "off") {
      powerRef.current?.focus();
    }
  }, [phase]);

  return (
    <div className="shutdown-screen">
      {phase === "saving" ? (
        <div className="saving-screen" role="status" aria-live="polite">
          <p className="saving-brand">VrajOS</p>
          <p>VrajOS is shutting down...</p>
          <div className="saving-bar" aria-hidden="true">
            <span />
          </div>
          <p className="saving-note">Saving open tabs. There are a lot of them.</p>
        </div>
      ) : (
        <div className="powered-off">
          <div className="off-mark" aria-hidden="true">V</div>
          <p className="off-message">It's now safe to turn off your computer.</p>
          <p className="off-sub">
            This is a portfolio, not your actual PC. You can bring it back whenever
            you're ready.
          </p>
          <button ref={powerRef} type="button" className="power-button" onClick={onRestart}>
            <Power size={16} strokeWidth={1.8} aria-hidden="true" />
            Turn VrajOS back on
          </button>
          <p className="off-foot">VrajOS 1.0 · Personal Computing Environment</p>
        </div>
      )}
    </div>
  );
}
