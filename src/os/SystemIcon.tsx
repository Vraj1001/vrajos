import type { IconName } from "./types";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const OUTLINE = "#191b1c";
const BEVEL = "#f6f4ec";

function ComputerIcon() {
  return (
    <>
      <rect x="4" y="6" width="32" height="23" fill="#d9d7ce" stroke={OUTLINE} />
      <rect x="4" y="6" width="32" height="2" fill={BEVEL} />
      <rect x="6" y="9" width="28" height="16" fill="#073d4a" stroke={OUTLINE} />
      <rect x="8" y="11" width="24" height="12" fill="#0b6e6b" />
      <rect x="8" y="11" width="24" height="2" fill="#149a92" />
      <path d="M17 13h3v4h1v2h2v-2h1v-4h3v4h-1v3h-3v2h-2v-2h-3v-3h-1z" fill="#f2b83c" />
      <rect x="24" y="26" width="2" height="1" fill="#6d6c65" />
      <rect x="17" y="29" width="6" height="3" fill="#b9b7ae" stroke={OUTLINE} />
      <rect x="10" y="32" width="20" height="3" fill="#d9d7ce" stroke={OUTLINE} />
      <rect x="10" y="32" width="20" height="1" fill={BEVEL} />
    </>
  );
}

function FolderIcon() {
  return (
    <>
      <path d="M3 11h13l3 3h18v20H3z" fill="#c9972a" stroke={OUTLINE} />
      <path d="M5 14h31v17H5z" fill="#f3c44f" />
      <path d="M5 14h31v3H5z" fill="#ffe38a" />
      <path d="M5 16h31v15H5z" fill="#efbd3c" />
      <rect x="5" y="17" width="31" height="1" fill="#d9a52d" />
      <path d="M5 31h31" stroke="#b9841e" />
      <rect x="33" y="14" width="3" height="17" fill="#c9972a" />
    </>
  );
}

function ProjectsIcon() {
  return (
    <>
      <path d="M9 5h9l2 2h15v10H9z" fill="#12395c" stroke={OUTLINE} />
      <rect x="10" y="8" width="24" height="8" fill="#1f5f86" />
      <path d="M5 10h10l2 2h17v10H5z" fill="#08706b" stroke={OUTLINE} />
      <rect x="6" y="13" width="27" height="8" fill="#0f8a82" />
      <path d="M2 16h11l2 2h20v16H2z" fill="#c9972a" stroke={OUTLINE} />
      <rect x="3" y="19" width="31" height="14" fill="#f3c44f" />
      <rect x="3" y="19" width="31" height="2" fill="#ffe38a" />
      <path d="M8 24h6M8 27h11M8 30h8" stroke="#a9781c" strokeWidth="1.5" />
    </>
  );
}

function SkillsIcon() {
  return (
    <>
      <rect x="8" y="8" width="24" height="24" fill="#bfc6b4" stroke={OUTLINE} />
      <rect x="10" y="10" width="20" height="20" fill="#4b6b3a" />
      <rect x="13" y="13" width="14" height="14" fill="#7ba05b" />
      <path d="M13 17h4v6h-4zM23 17h4v6h-4z" fill="#d8e8c4" />
      <path d="M17 19h6v2h-6z" fill="#d8e8c4" />
      <path
        d="M4 12h4M4 20h4M4 28h4M32 12h4M32 20h4M32 28h4M12 4v4M20 4v4M28 4v4M12 32v4M20 32v4M28 32v4"
        stroke={OUTLINE}
        strokeWidth="2"
      />
      <rect x="13" y="13" width="14" height="2" fill="#a9c78c" opacity="0.6" />
    </>
  );
}

function CameraIcon() {
  return (
    <>
      <rect x="4" y="12" width="32" height="21" fill="#343a3f" stroke={OUTLINE} />
      <rect x="4" y="12" width="32" height="2" fill="#6d757c" />
      <path d="M11 12l3-4h10l3 4z" fill="#4a5258" stroke={OUTLINE} />
      <rect x="8" y="16" width="9" height="4" fill="#c0453c" />
      <rect x="27" y="15" width="6" height="4" fill="#e6dfc8" stroke={OUTLINE} />
      <circle cx="21" cy="23" r="8.5" fill="#20262a" stroke={OUTLINE} />
      <circle cx="21" cy="23" r="6" fill="#6d7880" />
      <circle cx="21" cy="23" r="3.5" fill="#1b3d4a" />
      <circle cx="19" cy="21" r="1.2" fill="#d8f0e8" />
      <rect x="30" y="27" width="4" height="3" fill="#efbd3c" stroke={OUTLINE} />
    </>
  );
}

function ResumeIcon() {
  return (
    <>
      <path d="M8 3h18l7 7v27H8z" fill="#f6f4ec" stroke={OUTLINE} />
      <path d="M26 3v8h7" fill="#d9d7ce" stroke={OUTLINE} />
      <path d="M24 4v7h6" fill="#d0cec4" />
      <rect x="11" y="7" width="12" height="2" fill="#0a2a6f" />
      <path d="M12 14h15M12 18h15M12 22h11M12 26h15M12 30h9" stroke="#8a8880" />
      <path d="M12 14h7" stroke="#0b6e6b" strokeWidth="2" />
      <rect x="12" y="32" width="6" height="2" fill="#f2b83c" />
    </>
  );
}

function MailIcon() {
  return (
    <>
      <rect x="3" y="9" width="34" height="24" fill="#ece9df" stroke={OUTLINE} />
      <path d="M4 10l16 12 16-12" fill="#f7f5ee" stroke={OUTLINE} />
      <path d="M4 32l11-11M36 32L25 21" stroke={OUTLINE} />
      <path d="M4 10l16 11 16-11v22H4z" fill="none" stroke={OUTLINE} />
      <path d="M6 31V13l14 10L34 13v18" fill="#f6f4ec" />
      <path d="M4 10l16 12 16-12" fill="none" stroke="#0b6e6b" strokeWidth="2" />
      <rect x="26" y="27" width="7" height="4" fill="#f2b83c" stroke={OUTLINE} />
    </>
  );
}

function BinIcon() {
  return (
    <>
      <path d="M11 12h18l-2 25H13z" fill="#c9c7bd" stroke={OUTLINE} />
      <path d="M12 14h16l-1.5 21h-13z" fill="#e4e1d7" />
      <path d="M12 14h16l-1.5 21h-13z" fill="none" stroke="#a3a198" />
      <path d="M9 9h22v4H9z" fill="#d9d7ce" stroke={OUTLINE} />
      <path d="M9 9h22v1.5H9z" fill={BEVEL} />
      <path d="M16 6h8v3h-8z" fill="#b5b3aa" stroke={OUTLINE} />
      <path d="M15 19h10M15 23h10M15 27h10" stroke="#a3a198" />
      <path d="M14 16l-2 3M24 16l2 3" stroke="#6d6c65" />
      <path d="M18 5l2-2 2 2-1 2h-2z" fill="#f2b83c" stroke={OUTLINE} />
    </>
  );
}

function TerminalIcon() {
  return (
    <>
      <rect x="3" y="6" width="34" height="28" fill="#c9c7bd" stroke={OUTLINE} />
      <rect x="3" y="6" width="34" height="2" fill={BEVEL} />
      <rect x="6" y="10" width="28" height="20" fill="#0b0f10" stroke={OUTLINE} />
      <rect x="8" y="12" width="24" height="16" fill="#101617" />
      <path d="M10 16l4 3-4 3" fill="none" stroke="#8fe3c2" strokeWidth="2" />
      <rect x="16" y="21" width="8" height="2" fill="#8fe3c2" />
      <rect x="10" y="14" width="8" height="1" fill="#1c3a35" />
      <rect x="10" y="25" width="3" height="1" fill="#f2b83c" />
      <rect x="30" y="33" width="3" height="2" fill="#4a9b86" />
    </>
  );
}

function DisplayIcon() {
  return (
    <>
      <rect x="3" y="5" width="34" height="25" fill="#c9c7bd" stroke={OUTLINE} />
      <rect x="5" y="7" width="30" height="20" fill="#0b5e5b" stroke={OUTLINE} />
      <path d="M5 27l8-10 6 5 4-6 12 11z" fill="#0a4a4a" />
      <path d="M10 23l5-5 4 3 3-4 6 6" fill="none" stroke="#1b857f" />
      <path d="M9 12h6M18 10h12" stroke="#7fd8c8" strokeWidth="1.5" />
      <path d="M18 30h6v4h-6z" fill="#b5b3aa" stroke={OUTLINE} />
      <rect x="11" y="34" width="20" height="3" fill="#d9d7ce" stroke={OUTLINE} />
      <rect x="24" y="27" width="4" height="2" fill="#f2b83c" />
    </>
  );
}

function NotepadIcon() {
  return (
    <>
      <rect x="8" y="3" width="25" height="34" fill="#f2c44f" stroke={OUTLINE} />
      <rect x="8" y="3" width="25" height="5" fill="#f7d977" />
      <path d="M13 10h15M13 15h15M13 20h15M13 25h15M13 30h10" stroke="#a9781c" />
      <path d="M8 9h25" stroke="#c9972a" />
      <path d="M12 3v34M29 3v34" stroke="#d9a52d" opacity="0.5" />
      <rect x="5" y="7" width="3" height="4" fill="#7a7a73" />
      <rect x="5" y="16" width="3" height="4" fill="#7a7a73" />
      <rect x="5" y="25" width="3" height="4" fill="#7a7a73" />
    </>
  );
}

function GenericFileIcon() {
  return (
    <>
      <path d="M9 3h17l7 7v27H9z" fill="#f6f4ec" stroke={OUTLINE} />
      <path d="M26 3v8h7" fill="#d9d7ce" stroke={OUTLINE} />
      <path d="M12 15h16M12 19h16M12 23h16M12 27h10" stroke="#a3a198" />
      <path d="M12 12h8" stroke="#0b6e6b" strokeWidth="2" />
    </>
  );
}

function ZipIcon() {
  return (
    <>
      <path d="M3 11h13l3 3h18v20H3z" fill="#8f7a4e" stroke={OUTLINE} />
      <rect x="5" y="15" width="30" height="17" fill="#c2ad7a" />
      <path d="M18 15v17M18 18h4M18 22h4M18 26h4" stroke="#5f5131" strokeWidth="2" />
      <rect x="18" y="27" width="4" height="5" fill="#f2b83c" stroke={OUTLINE} />
      <path d="M5 15h30v2H5z" fill="#dcc998" />
    </>
  );
}

function ExeIcon() {
  return (
    <>
      <path d="M9 3h17l7 7v27H9z" fill="#ece9df" stroke={OUTLINE} />
      <path d="M26 3v8h7" fill="#d9d7ce" stroke={OUTLINE} />
      <rect x="13" y="14" width="8" height="8" fill="#0a2a6f" stroke={OUTLINE} />
      <path d="M15 16h4v4h-4z" fill="#7fd8c8" />
      <circle cx="26" cy="28" r="6" fill="#b9b7ae" stroke={OUTLINE} />
      <circle cx="26" cy="28" r="2" fill="#4a4a45" />
      <path d="M26 20v3M26 33v3M18 28h3M31 28h3" stroke={OUTLINE} strokeWidth="2" />
      <path d="M14 26h6M14 30h5" stroke="#a3a198" />
    </>
  );
}

function DocIcon() {
  return (
    <>
      <path d="M8 3h18l7 7v27H8z" fill="#f6f4ec" stroke={OUTLINE} />
      <path d="M26 3v8h7" fill="#d9d7ce" stroke={OUTLINE} />
      <rect x="11" y="8" width="9" height="6" fill="#1e5fa8" />
      <path d="M12 18h16M12 22h16M12 26h12M12 30h16" stroke="#a3a198" />
      <path d="M12 12h6" stroke="#0a2a6f" strokeWidth="2" />
      <rect x="12" y="34" width="6" height="2" fill="#f2b83c" />
    </>
  );
}

function PhotoIcon() {
  return (
    <>
      <rect x="4" y="7" width="32" height="26" fill="#f6f4ec" stroke={OUTLINE} />
      <rect x="7" y="10" width="26" height="17" fill="#2d5f69" stroke={OUTLINE} />
      <path d="M7 27l7-8 5 4 4-6 10 10z" fill="#6f9e8a" />
      <circle cx="27" cy="15" r="3" fill="#f2b83c" />
      <path d="M7 20c5-2 9 2 14 0s7-3 12-1v8H7z" fill="#164b52" opacity="0.55" />
      <rect x="16" y="33" width="8" height="3" fill="#b5b3aa" stroke={OUTLINE} />
    </>
  );
}

function DbIcon() {
  return (
    <>
      <ellipse cx="20" cy="10" rx="13" ry="5" fill="#d9d7ce" stroke={OUTLINE} />
      <path d="M7 10v20c0 3 6 5 13 5s13-2 13-5V10" fill="#4c5f78" stroke={OUTLINE} />
      <ellipse cx="20" cy="10" rx="11" ry="3.2" fill="#8aa0b8" />
      <path d="M7 18c0 3 6 5 13 5s13-2 13-5" fill="none" stroke="#9fb2c6" />
      <path d="M7 26c0 3 6 5 13 5s13-2 13-5" fill="none" stroke="#9fb2c6" />
      <rect x="15" y="21" width="10" height="2" fill="#f2b83c" />
    </>
  );
}

function Node({ name }: { name: IconName }) {
  switch (name) {
    case "computer":
      return <ComputerIcon />;
    case "folder":
      return <FolderIcon />;
    case "projects":
      return <ProjectsIcon />;
    case "skills":
      return <SkillsIcon />;
    case "camera":
      return <CameraIcon />;
    case "resume":
      return <ResumeIcon />;
    case "doc":
      return <DocIcon />;
    case "mail":
      return <MailIcon />;
    case "bin":
      return <BinIcon />;
    case "terminal":
      return <TerminalIcon />;
    case "display":
      return <DisplayIcon />;
    case "notepad":
    case "text":
      return <NotepadIcon />;
    case "zip":
      return <ZipIcon />;
    case "exe":
      return <ExeIcon />;
    case "photo":
      return <PhotoIcon />;
    case "db":
      return <DbIcon />;
    case "user":
      return (
        <>
          <rect x="4" y="6" width="32" height="28" fill="#f6f4ec" stroke={OUTLINE} />
          <rect x="4" y="6" width="32" height="7" fill="#0a2a6f" />
          <rect x="7" y="8" width="10" height="3" fill="#7fd8c8" />
          <circle cx="14" cy="21" r="5" fill="#e3b06b" stroke={OUTLINE} />
          <path d="M6 33c1-6 4-9 8-9s7 3 8 9z" fill="#0b6e6b" stroke={OUTLINE} />
          <path d="M26 18h7M26 22h7M26 26h5" stroke="#a3a198" />
        </>
      );
    case "file":
    default:
      return <GenericFileIcon />;
  }
}

export function SystemIcon({ name, size = 32, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flex: "none" }}
    >
      <Node name={name} />
    </svg>
  );
}
