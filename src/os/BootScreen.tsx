import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/useEnvironment";

const bootLines = [
  "VrajOS BIOS v1.0 — Personal Computing Environment",
  "Memory check ........................ 640K OK",
  "Detecting curiosity ................. present",
  "Mounting /projects .................. 8 folders",
  "Loading personality.sys ............. OK",
  "Starting desktop shell ..............",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const reducedMotion = usePrefersReducedMotion();
  const [exiting, setExiting] = useState(false);
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? bootLines.length : 0);
  const finished = useRef(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    if (finished.current) return;
    if (reducedMotion) {
      const timer = window.setTimeout(() => {
        if (finished.current) return;
        finished.current = true;
        doneRef.current();
      }, 550);
      return () => window.clearTimeout(timer);
    }

    const lineTimers = bootLines.map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), 170 + index * 170),
    );
    const exitTimer = window.setTimeout(() => setExiting(true), 1450);
    const doneTimer = window.setTimeout(() => {
      if (finished.current) return;
      finished.current = true;
      doneRef.current();
    }, 1700);

    return () => {
      lineTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [reducedMotion]);

  const skip = () => {
    if (finished.current) return;
    finished.current = true;
    onDone();
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  });

  return (
    <div className={`boot-screen ${exiting ? "is-exiting" : ""}`} aria-label="VrajOS is starting">
      <div className="boot-grain" aria-hidden="true" />
      <div className="boot-content">
        <div className="boot-brand">
          <div className="boot-logo-mark" aria-hidden="true">
            <span>V</span>
          </div>
          <div>
            <p className="boot-name">VrajOS</p>
            <p className="boot-sub">Personal Computing Environment</p>
          </div>
        </div>

        <div className="boot-console" role="status" aria-live="polite">
          <p className="boot-line boot-line--title">VrajOS 1.0 · Starting up...</p>
          {bootLines.slice(0, visibleLines).map((line) => (
            <p className="boot-line" key={line}>
              {line}
            </p>
          ))}
        </div>

        <div className="boot-progress" aria-hidden="true">
          <span className="boot-progress-fill" />
        </div>

        <div className="boot-foot">
          <span className="boot-copyright">Personal portfolio of Vraj Bhatt</span>
          <button type="button" className="boot-skip" onClick={skip}>
            Skip startup <span aria-hidden="true">[Esc]</span>
          </button>
        </div>
      </div>
    </div>
  );
}
