import type { ReactNode } from "react";
import { Copy, Mail } from "lucide-react";
import { AppShell, StatusBar } from "../os/AppChrome";
import { useDesktop } from "../os/DesktopContext";
import { profile, type ContactKey } from "../content/profile";

function GithubMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.04a9.3 9.3 0 0 1 5 0c1.91-1.31 2.75-1.04 2.75-1.04.55 1.39.2 2.42.1 2.68.64.71 1.03 1.62 1.03 2.73 0 3.91-2.35 4.77-4.58 5.02.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function LinkedinMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5A2.49 2.49 0 1 0 5 8.48a2.49 2.49 0 0 0-.02-4.98ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.53 4.8 5.83V21h-4v-5.1c0-1.22-.02-2.79-1.75-2.79-1.76 0-2.03 1.32-2.03 2.7V21h-4.7V9.75Z" />
    </svg>
  );
}

const iconFor: Record<ContactKey, ReactNode> = {
  email: <Mail size={22} strokeWidth={1.6} aria-hidden="true" />,
  github: <GithubMark size={22} />,
  linkedin: <LinkedinMark size={22} />,
};

const buildHref = (key: ContactKey, value: string) => {
  if (!value) return null;
  if (key === "email") return `mailto:${value}`;
  return value.startsWith("http") ? value : `https://${value}`;
};

export function ContactApp({ windowId }: { windowId: string }) {
  const { notify } = useDesktop();
  const keys = Object.keys(profile.contact) as ContactKey[];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("Portfolio address copied. Paste it wherever you like.", "Copied");
    } catch {
      notify("Copying isn't available here, but the address is in your browser bar.", "Clipboard blocked");
    }
  };

  return (
    <AppShell windowId={windowId} className="contact-app">
      <div className="app-scroll contact-scroll">
        <header className="contact-hero">
          <div>
            <p className="file-path">C:\Users\Vraj\Contact\hello.card</p>
            <h1>Say hello.</h1>
            <p className="contact-lede">
              The best place to reach me is email. GitHub and LinkedIn are where the
              rest of it lives. I'm happy to talk about a project, an idea, or
              something I should be reading.
            </p>
          </div>
          <span className="contact-stamp" aria-hidden="true">
            <Mail size={30} strokeWidth={1.4} />
            <span>NEW<br />MESSAGE</span>
          </span>
        </header>

        <div className="contact-note">
          <span className="info-glyph" aria-hidden="true">i</span>
          <p>
            These are editable placeholders. Once real details are added in{" "}
            <code>src/content/profile.ts</code>, each card becomes a working link
            automatically.
          </p>
        </div>

        <ul className="contact-list">
          {keys.map((key) => {
            const channel = profile.contact[key];
            const href = buildHref(key, channel.value);
            const content = (
              <>
                <span className="contact-icon">{iconFor[key]}</span>
                <span className="contact-copy">
                  <span className="contact-label">{channel.label}</span>
                  <span className={`contact-value ${channel.value ? "" : "is-placeholder"}`}>
                    {channel.value || channel.placeholder}
                  </span>
                  <span className="contact-hint">{channel.hint}</span>
                </span>
                <span className={`contact-state ${channel.value ? "is-ready" : ""}`}>
                  {channel.value ? "Open ↗" : "Placeholder"}
                </span>
              </>
            );

            return (
              <li key={key}>
                {href ? (
                  <a
                    className="contact-card"
                    href={href}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noreferrer"}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="contact-card contact-card--placeholder" aria-disabled="true">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="contact-footer">
          <div>
            <h2>Based in Navi Mumbai</h2>
            <p>
              Also known to be online at unreasonable hours. The clock on the taskbar
              will tell you what time it is where you are.
            </p>
          </div>
          <button type="button" className="btn" onClick={copyLink}>
            <Copy size={13} strokeWidth={1.8} aria-hidden="true" />
            Copy portfolio link
          </button>
        </div>

        <p className="contact-signoff">
          No contact form, no CRM, no follow-up sequence. Just a person and an inbox.
        </p>
      </div>

      <StatusBar left="Three channels, one placeholder each" right="Contact" />
    </AppShell>
  );
}
