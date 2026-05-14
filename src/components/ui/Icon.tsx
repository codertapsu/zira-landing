import type { ReactElement, SVGProps } from "react";

type IconName =
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "arrow-right"
  | "arrow-up-right"
  | "apple"
  | "google-play"
  | "map-pin"
  | "shield"
  | "star"
  | "star-outline"
  | "wallet"
  | "route"
  | "phone"
  | "menu"
  | "play"
  | "mail"
  | "building"
  | "car"
  | "quote";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  title?: string;
}

const paths: Record<IconName, ReactElement> = {
  "chevron-down": (
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "chevron-left": (
    <path
      d="M15 6l-6 6 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "chevron-right": (
    <path
      d="M9 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-right": (
    <path
      d="M4 12h15m0 0l-6-6m6 6l-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  "arrow-up-right": (
    <path
      d="M7 17L17 7M9 7h8v8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  apple: (
    <path
      d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2.1-.9-3.4-.9-1.8 0-3.4 1-4.3 2.6-1.8 3.2-.5 7.9 1.3 10.4.9 1.3 2 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.2-2.6.7-1 1.1-2 1.3-2.4-.1 0-2.8-1.1-2.8-4.3zM14 5.4c.7-.9 1.2-2.1 1.1-3.4-1 .1-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.3 1.1.1 2.3-.6 3-1.5z"
      fill="currentColor"
    />
  ),
  "google-play": (
    <g fill="currentColor">
      <path d="M3.6 2.7a1.8 1.8 0 0 0-.6 1.4v15.8c0 .6.2 1.1.6 1.4l8.8-8.6L3.6 2.7z" />
      <path d="M16.4 9l-3.4 3.5 3.4 3.5 4.5-2.6c.9-.5.9-1.8 0-2.3L16.4 9z" opacity=".9" />
      <path d="M12.4 12.5L3.6 21.3c.4.3.9.3 1.4.1l10-5.8-2.6-3.1z" opacity=".8" />
      <path d="M5 2.5c-.5-.2-1-.2-1.4.1l8.8 8.7 2.6-3.1L5 2.5z" opacity=".7" />
    </g>
  ),
  "map-pin": (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </g>
  ),
  shield: (
    <path
      d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  star: (
    <path
      d="M12 3l2.7 6 6.3.6-4.8 4.3 1.5 6.1L12 17l-5.7 3 1.5-6.1L3 9.6 9.3 9 12 3z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  "star-outline": (
    <path
      d="M12 3l2.7 6 6.3.6-4.8 4.3 1.5 6.1L12 17l-5.7 3 1.5-6.1L3 9.6 9.3 9 12 3z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  wallet: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7a2 2 0 0 1 2-2h12v4H5a2 2 0 0 1-2-2z" />
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H5" />
      <circle cx="17" cy="14" r="1.3" fill="currentColor" />
    </g>
  ),
  route: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M6 8.5v3a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3V18" />
    </g>
  ),
  phone: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </g>
  ),
  menu: (
    <path
      d="M4 7h16M4 12h16M4 17h16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  play: (
    <path
      d="M8 5v14l11-7L8 5z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  ),
  mail: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </g>
  ),
  building: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2" />
      <path d="M10 21v-3h4v3" />
    </g>
  ),
  car: (
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5" />
      <path d="M3 13h18v4a1 1 0 0 1-1 1h-2v-2H6v2H4a1 1 0 0 1-1-1v-4z" />
      <circle cx="7.5" cy="16" r="1.2" fill="currentColor" />
      <circle cx="16.5" cy="16" r="1.2" fill="currentColor" />
    </g>
  ),
  quote: (
    <path
      d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"
      fill="currentColor"
    />
  ),
};

export function Icon({ name, title, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
